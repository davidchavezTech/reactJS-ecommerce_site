const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    itemName: { type: String, required: true},
    imgURL: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
}, {
    timestamps: true,
});

const Item = mongoose.model('Item', itemsSchema);

module.exports = Item