const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerPhone: {
        type: String,
        required: true,
        trim: true
    },
    customerAddress: {
        type: String,
        required: true,
        trim: true
    },
    customerLocation: {
        type: String,
        trim: true,
        default: ''
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    total: {
        type: Number,
        required: true,
        min: 0
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cash', 'electronic']
    },
    paymentProof: {
        type: String,
        required: function() {
            return this.paymentMethod === 'electronic';
        }
    },
    status: {
        type: String,
        enum: ['pending', 'Pending', 'processing', 'completed', 'cancelled'], // أضف "Pending"
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);