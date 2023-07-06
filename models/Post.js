const { model, Schema } = require('mongoose');

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    category: { type: String, required: true },
    post: { type: String, required: true },
    likeUserIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

const Post = model('Post', postSchema);

module.exports = Post;
