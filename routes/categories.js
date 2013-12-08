var Category = require('../models/category.js');

exports.list = function(req, res) {
  Category.find({}, function(err, results) {
    if (err) throw err;
    res.render("categoryList.jade", {cats: results});
  });
};