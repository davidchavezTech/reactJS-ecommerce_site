const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    itemName: { type: String, required: true},
    priceAndUnits: { type: Object, required: true},
    description: { type: String, required: true},
    options: { type: Array, default: null },
    // imgsURL: { type: String, required: true},
    order:  { type: Number, default: 0},
    carousel: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
}, {
    timestamps: true,
});

const Item = mongoose.model('Item', itemsSchema);

module.exports = Item