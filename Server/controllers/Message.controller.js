import Message from '../models/Message.Model.js';

export const createMessage = async(req,res)=>{
    const dbMessage = req.body;
    Message.create(dbMessage, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send("new message created.");
        }
    })
}

export const syncMessage = async(req,res)=>{
    Message.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
}