const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const optionsSchema = new Schema({
    fieldName: { type: String, required: false },
    fieldType: { type: String, required: true },
    newOptions: { type: Array, required: false }
})
const itemsSchema = new Schema({
    itemName: { type: String, required: true},
    priceAndUnits: { type: JSON, required: true},
    description: { type: String, required: true},
    mUnit: { type: String, required: true },
    options: [optionsSchema],
    imagesFileNames: { type: Array, required: true},
    order:  { type: Number, default: 0},
    carousel: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
}, {
    timestamps: true,
});

const Item = mongoose.model('Item', itemsSchema);

module.exports = Item