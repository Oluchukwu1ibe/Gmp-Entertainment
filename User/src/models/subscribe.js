import mongoose, { Schema } from "mongoose";

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

export default mongoose.model("Subscriber", subscriberSchema);
