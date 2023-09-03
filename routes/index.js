var express = require('express');
var router = express.Router();

/* GET redirected to home page. */
router.get('/', function(req, res, next) {
  res.redirect("/chatroom");
});

module.exports = router;
