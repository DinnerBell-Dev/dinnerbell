var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Menu = new Schema({
  company_id: {
    type: Schema.Types.ObjectId
  },
  ingredients: [
    { type: Schema.Types.ObjectId, ref: 'Ingredient'}
  ],
  custom_options: {
  },
  questions: [{
    _id:false,
    question: String,
    answer: String
  }],
  details: {
    title: {
      type: String
    },
    description: {
      type: String
    },
    label: {
      type: Schema.Types.ObjectId, 
      ref: 'FoodLabel'
    },
    price: Number,
    photo_urls: [String]
  },
  categories: [{
    _id:false,
    mainmenu: {
      type: Schema.Types.ObjectId, 
      ref: 'MainMenu'
    },
    submenu: {
      type: Schema.Types.ObjectId, 
      ref: 'SubMenu'
    },
  }]
});

module.exports = mongoose.model('Menu', Menu, 'menus');
