const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: String,
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

commentSchema.index({ author: 1 });
commentSchema.index({ CreatedAt: -1 });

module.exports = mongoose.model("Comment", commentSchema);
