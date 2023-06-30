const { model, Schema } = require('mongoose');

const commentSchema = new Schema(
  {
    commenter: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
