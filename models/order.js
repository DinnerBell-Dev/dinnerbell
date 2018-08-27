var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order = new Schema({
  company_id: {
    type: Schema.Types.ObjectId
  },
  server_id: {
    type: Schema.Types.ObjectId
  },
  table_number: String,
  customer_info: {
    name: String,
    email: String,
  },
  order_details: {
    menus: [{
      menu: {},
      price: String,
      count: String
    }],
    total_price: String
  },
  order_date: String,
  order_status: String,
  checkout_date: String
});

module.exports = mongoose.model('Order', Order, 'orders');
