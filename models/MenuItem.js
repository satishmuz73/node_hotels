const  mongoose = require('mongoose');

const menyItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    taster:{
        type: String,
        enums:['sweet', 'spicy', 'sour'],
        required: true,
    },
    is_drink:{
        type: Boolean,
        default: false,
    },
    ingredients:{
        type: [String],
        default: [],
    },
    num_salses:{
        type: Number,
        default: 0,
    }
})

const MenuItem = mongoose.model('MenuItem', menyItemSchema);
module.exports = MenuItem;