import db from "../models/index";

const paginationController = {
    getAllNews: (req, res) => {
        let limit = 3;   // number of records per page
        let offset = 0;
        db.New.findAndCountAll()
        .then((data) => {
          let page = req.params.page;      // page number
          let pages = Math.ceil(data.count / limit);
              offset = limit * (page - 1);
          db.New.findAll({
            attributes: ['id', 'name', 'image', 'description', 'content', 'productId', 'category_id', 'author_id', 'date', 'status', 'view', 'hot', 'cloudinary_id'],
            limit: limit,
            offset: offset,
            $sort: { id: 1 }
          })
          .then((users) => {
            res.status(200).json({
                errCode: 0,
                'result': users, 
                'count': data.count, 
                'pages': pages});
          });
        })
        .catch(function (error) {
              res.status(500).send('Internal Server Error');
        });
    }
}
module.exports = paginationController