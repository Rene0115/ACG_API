import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: {
    type: String

  },

  likes: {
    default: 0,
    type: Number
  },
  body: {
    type: String
  },
  userId: {
    required: true,
    type: String,
    ref: 'User'
  },
  image: {
    type: String
  },
  isPublished: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const postModel = mongoose.model('Post', postSchema);
export default postModel;
