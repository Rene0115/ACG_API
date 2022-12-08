/* eslint-disable import/no-named-as-default */
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS
  }
});

export const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Nacoss Blog',
    link: process.env.APP_URL
  }
});

export const sendPasswordResetMail = async (user) => {
  const token = user.generateToken();
  const base = process.env.APP_URL;
  // send mail
  const response = {
    body: {
      name: `${user.firstName} ${user.lastName}`,
      intro: 'Password Reset Link',
      action: {
        instructions:
          'If you did not request for this mail, Please Ignore it. To reset your password, click on the link below:',
        button: {
          text: 'Reset password',
          link: `${base}/users/password-reset?token=${token}`
        }
      },
      outro: 'Do not share this link with anyone.'
    }
  };

  const mail = mailGenerator.generate(response);

  const message = {
    from: 'Across the Globe',
    to: user.email,
    subject: 'Reset your password',
    html: mail
  };

  await transporter.sendMail(message);
  // return true;
};

export default { transporter, mailGenerator };
