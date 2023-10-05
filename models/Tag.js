const { model, Schema } = require('mongoose');

const tagSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Tag = model('Tag', tagSchema);

module.exports = Tag;
