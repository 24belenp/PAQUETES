const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    code: String,
    product:String,
    quantity: Number,
    order:String,
    delivery_date: String
});

packageSchema.methods.cleanup = function() {
    return {

    code: this.code,
    product: this.product,
    quantity: this.quantity,
    order: this.order,
    delivery_date: this.delivery_date

    };

}
const Package = mongoose.model('Package', packageSchema);

module.exports = Package;