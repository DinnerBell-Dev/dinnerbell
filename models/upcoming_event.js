var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UpcomingEvent = new Schema({
  company_id: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  photo_url: {
    type: String
  },
  event_date: {
    type: Date
  }
});

module.exports = mongoose.model('UpcomingEvent', UpcomingEvent, 'upcoming_events');
