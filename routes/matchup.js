var express = require('express');
var router = express.Router();
var Firebase = require("firebase");
var matchupsRef = new Firebase('https://auto-rivalry.firebaseio.com/matchups');

/* GET matchups listing. */
router.get('/:id', function(req, res) {

  // get the matchup from the server
  var matchupRef = matchupsRef.child(req.params.id);
  matchupRef.once('value', function (snapshot) {
    if (snapshot.exists()) {
      res.render('jordan', snapshot.val());
    } else {
      res.status(404).render('404');
    }
  });

});

module.exports = router;
