import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    message: String,
    name: String,
    timeStamp: String,
    received: Boolean,
});

export default mongoose.model('Message', MessageSchema);