const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({


    code: { 
        type: String,
        required: [true, "Package code required"], 
        //unique: true,
        minlength: [1, "Minimun code length 1 characters"],
        maxlength: [7, "Maximum code length 1 characters"]
        // minlength: [25, "Minimun code length 25 characters"],
    },
     
    quantity: {
         type: Number,
        required: [true, "quantity required"],
         min: [1, "Minimun quantity is one"],
    },

    delivery_date: {
        type: String,
       // default: Date.now
   },


   statuss: {
        type: String,
        required: [true, "Status required"],
       // enum:['delivered','undelivered']
    },

});

packageSchema.methods.cleanup = function() {
    return {

    code: this.code,
    quantity: this.quantity,
    statuss: this.statuss,
    delivery_date: this.delivery_date

    };

}
const Package = mongoose.model('Package', packageSchema);

module.exports = Package;