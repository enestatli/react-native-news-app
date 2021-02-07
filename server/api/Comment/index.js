const { Utils } = require('../../utils');
const CommentModel = require('../../db/models/commentSchema');
const { protectWithApiKey } = require('../../middleware/protectWithApiKey');

class Comment {
  constructor(router) {
    this.router = router;
    this.commentRoutes();
  }

  commentRoutes() {
    this.router.post(
      '/comment/add',
      protectWithApiKey,
      this.addComment.bind(this),
    );
    this.router.get(
      '/comments/:url',
      protectWithApiKey,
      this.getComments.bind(this),
    );
  }

  async getComments(req, res) {
    if (!req || !req.params || !req.params.url) {
      res.sendStatus(422); // unprocessable entity
      return;
    }
    const model = await CommentModel.findOne({});
    const arr = model.comments[req.params.url];
    const totalSkip =
      parseInt(req.query.skip, 10) * parseInt(req.query.limit, 10);

    res.json(arr.slice(totalSkip, totalSkip + parseInt(req.query.limit, 10)));
  }

  async addComment(req, res) {
    if (
      !req ||
      !req.body ||
      !req.body.userId ||
      !req.body.url ||
      !req.body.userName ||
      !req.body.commentText
    ) {
      res.sendStatus(422); // unprocessable entity
      return;
    }

    try {
      const key = Utils.encodeUrl(req.body.url);
      if (!key) {
        res.sendStatus(500);
        return;
      }

      const model = await CommentModel.findOne({});
      const comment = {
        user_id: req.body.userId,
        user_name: req.body.userName,
        comment_text: req.body.commentText,
        //TODO: add Date
      };

      model.comments = {
        ...model.comments,
        [key]: model.comments[key]
          ? [...model.comments[key], comment]
          : [comment],
      };
      model.save();

      res.json(model);
    } catch (error) {
      res.sendStatus(500);
    }
  }
}

module.exports = { Comment };
