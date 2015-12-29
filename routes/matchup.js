var express = require('express');
var router = express.Router();

/* GET matchups listing. */
router.get('/:id', function(req, res) {
  res.render('index', {title: 'Matchup - ' + req.params.id });
  // res.send('respond with a resource/view id: ' + req.params.id);
});

module.exports = router;
