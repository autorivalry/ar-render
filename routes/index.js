var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Auto Rivalry', site: 'The Auto Rivalry Render Engine', url: 'http://www.autorivalry.com', link: 'the homepage', glyph: 'glyphicon glyphicon-dashboard' });
});

module.exports = router;
