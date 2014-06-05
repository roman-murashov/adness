var sanitize = require('google-caja').sanitize;
var _ = require('lodash');
var config = require('./config');

module.exports = {
  isNumber: function(datetime) {
    // return true if this is a number
    return !isNaN(parseFloat(datetime)) && isFinite(datetime);
  },
  createAuction: function(start, end) {
    // ensure all three parameters are given
    if (start && end) {
      return this.updateAuction(start, end);
    }
    else { return false; }
  },
  updateAuction: function(start, end) {
    // validate all inputs are numbers
    // validate end time is after start time

    // check that start datetime is valid millisec
    if (start && !this.isNumber(start)) {
      return false;
    }

    // check that end datetime is a valid milli sec
    if (end && !this.isNumber(end)) {
      return false;
    }
    
    // check that end is after start
    if (start && end && end < start) {
      return false;
    }

    return true;
  },
  createBid: function(price, slots) {
    // ensure all parameters are given
    if (price && slots) {
      return this.updateBid(price, slots);
    }
    else { return false; }
  },
  updateBid: function(price, slots) {
    // validate all inputs are numbers
    // validate that slots can't be negative
    // validate end time is after start time

    // check that start datetime is valid millisec
    if (price && !this.isNumber(price)) {
      return false;
    }

    // check that end datetime is a valid milli sec
    if (slots && !this.isNumber(slots)) {
      return false;
    }

    if (price && price < 0) { return false; }
    if (slots && slots < 0) { return false; }

    return true;
  },
  html: function(html) {
    function urlX(url) { if(/^https?:\/\//.test(url)) { return url; }}
    return sanitize(html, urlX);
  },
  // TO BE DEPRECATED
  blacklistedCN: function(blacklist) {
    // check that the list is an array
    if (!_.isArray(blacklist)) { return ['US', 'CN']; }

    // check that each item in the list is a string
    var newList = [];
    blacklist.forEach(function(item) {
      if (_.isString(item)) { newList.push(item); }
    });

    return newList;
  },
  regions: function(regions) {
    // get all regions by name
    var configRegions = config.regions;
    var configRegionNames = _.pluck(configRegions, 'name');

    var valid = true;

    if (regions.length < 1) { valid = false; }

    regions.forEach(function(region) {
      // validate region name
      if (_.contains(configRegionNames, region.name) === false) {
        valid = false;
      }

      // validate slots is a number
      if (region.slots && !this.isNumber(region.slots)) { valid = false; }
      // validate slots is not negative
      if (valid && region.slots < 1) { valid = false; }
    });

    return valid;
  }
};
