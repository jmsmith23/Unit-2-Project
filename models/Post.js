const { model, Schema } = require('mongoose');

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    category: { type: String, required: true },
    post: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Post = model('Post', postSchema);

module.exports = Post;
