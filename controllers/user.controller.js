/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { transporter, mailGenerator } from '../config/mailer.config.js';
import userService from '../services/user.services.js';

class UserController {
  async createUser(req, res) {
    const user = await userService.findByEmail(req.body);
    if (!_.isEmpty(user)) {
      return res.status(400).send({
        success: false,
        message: 'User already exists'
      });
    }
    const data = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      username: req.body.username
    };
    const newUser = await userService.create(data);

    const verificationToken = newUser.generateToken();
    const url = `${process.env.APP_URL}users/verify/${verificationToken}`;

    const response = {
      body: {
        name: `${req.body.username}`,
        intro: 'Email Verification Link',
        action: {
          instructions:
              'If you did not request for this mail, Please Ignore it. To Verify your Email password, click on the link below:',
          button: {
            text: 'Verify Email',
            link: url
          }
        },
        outro: 'Do not share this link with anyone.'
      }
    };

    const mail = mailGenerator.generate(response);

    const message = {
      from: 'Across the Globe <enere0115@gmail.com>',
      to: req.body.email,
      subject: 'Verify Your Email',
      html: mail
    };

    await transporter.sendMail(message);

    return res.status(201).send({
      message: `Sent a verification email to ${req.body.email}`
    });
  }

  async loginUser(req, res) {
    const user = await userService.findByEmail(req.body);
    if (_.isEmpty(user)) {
      return res.status(404).send({
        success: false,
        message: 'user does not exist, create a user before attempting to login'
      });
    }
    const verifyPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!verifyPassword) {
      return res.status(404).send({
        success: false,
        message: 'email or password is invalid'
      });
    }
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '20h', algorithm: 'HS512' });
    return res.status(200).send({
      success: true,
      body: {
        message: 'user logged in successfully',
        token,
        data: user
      }
    });
  }

  async verify(req, res) {
    const { token } = req.params;
    // Check we have an id
    if (!token) {
      return res.status(422).send({
        message: 'Missing Token'
      });
    }
    // Step 1 -  Verify the token from the URL
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET
    );
    const user = await userService.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(404).send({
        message: 'User does not  exists'
      });
    }
    // Step 3 - Update user verification status to true
    user.verified = true;
    await user.save();

    return res.status(200).send({
      message: 'Account Verified'
    });
  }
}

export default new UserController();
