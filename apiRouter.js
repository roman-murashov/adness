module.exports = {
  auction: function(req, res) {
    req.model.load('auction', req);
    req.model.end(function(err, models) {
      if (err) console.log(err);
      console.log(JSON.stringify(models));
      res.json({ auction: models.auction });
    });

  },
  auctions: function(req, res) {
    req.model.load('auctions', req);
    req.model.end(function(err, models) {
      if (err) console.log(err);
      res.json({ auctions: models.auctions });
    });
  }
};
