var Category = require('../models/category.js');


exports.list = function(req, res) {
    var query = Category.find({}, function(err, results) {
        if (err) throw err;
        console.log(results)
        res.render("categoryList.jade", {cats: results});
    });
}