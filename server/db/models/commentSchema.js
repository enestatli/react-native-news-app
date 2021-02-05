const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
  comments:{type:Object, default:{}}
});

var Comment = mongoose.model('comment', CommentSchema);

Comment.findOne((error, doc) => {
  if (error) {
    console.log(error);
    return;
  }
  if (doc === null) {
    const comment = new Comment();
    comment.save((err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});

module.exports = Comment;