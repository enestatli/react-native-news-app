const {Utils} = require('../../utils')
const CommentModel = require('../../db/models/commentSchema');



class Comment {
    constructor(router){
        this.router = router;
        this.commentRoutes();
    }

    commentRoutes(){
        this.router.pos('/comment/add', protectWithApiKey, this.addComment.bind(this));
    }

    async addComment(req, res) {
        if(!req || !req.body || !req.body.userId || !req.body.url || !req.body.userName || !req.body.commentText){
            res.sendStatus(422) // unprocessable entity
            return;
        }

        try {
            const key = Utils.encodeUrl(req.body.url)
            if(!key) {
                res.sendStatus(500);
                return;
            };

            const model = await CommentModel.findOne({});
            const comment = {
                user_id: req.body.userId,
                user_name: req.body.userName,
                comment_text: req.body.commentText,
                //TODO: add Date
            };

            model.comments = {
                ...model.comments,
                [key]: model.comments[key] ? [...model.comments[key], comment] : [comment]
            };
            model.save()

            res.json(model)
        } catch (error) {
            res.sendStatus(500)
        }
    }
}

module.exports = {Comment}