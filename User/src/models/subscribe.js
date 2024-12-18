const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscriberSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ 
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
