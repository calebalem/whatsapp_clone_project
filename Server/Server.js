import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotevn from 'dotenv';
import users from './routes/Users.js';
import message from './routes/Message.js';
import Pusher from 'pusher';
//import message from './routes/Message.js';

dotevn.config();
const app = express();
app.use(express.json());
app.use(cors());


const pusher = new Pusher({
    appId: "1182721",
    key: "994c074305c3d6b5e741",
    secret: "82fdc89ed3c89b6f17a5",
    cluster: "eu",
    useTLS: true
  });
const Port = process.env.PORT || 9000;
const connectionUrl = process.env.CONNECTION_URL;
mongoose.connect(connectionUrl, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('connected',()=>{
    app.listen(Port,()=>{
        console.log(`Server listening on port ${Port}`);
    });
});
db.on('error', ()=>{
    console.log("Connection error");
});
db.once('open', ()=>{
    const msgCollection = db.collection("messages");
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=>{
        console.log(change);
        if(change.operationType === "insert"){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name:messageDetails.name,
                message:messageDetails.message,
                timeStamp:messageDetails.timeStamp,
                received:messageDetails.received,
              }).catch((reason)=>{
                  console.log(reason);
              });
        }else{
            console.log('Error triggering pusher');
        }
    });
});
app.use("/users", users);
app.use("/messages/",message);
app.use("/messages/sync",message);
//app.use("/Message",message);

