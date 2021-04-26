import { React, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton, TextField, Grid } from "@material-ui/core";
import {
  Mic as MicIcon,
  Send as SendIcon,
  SearchOutlined as SearchOutlinedIcon,
  AttachFile as AttachFileIcon,
  MoreVert as MoreVertIcon,
  InsertEmoticon as InsertEmoticonIcon,
} from "@material-ui/icons";
import axios from '../../axios';

function Chat({messages}) {
  const [input, setInput] = useState("Message");
  const sendMessage = async (event) => {
    event.preventDefault();
    await axios.post('messages/new',{
      message: input,
      name:"Test User",
      timeStamp: `${new Date().getHours()}:${new Date().getMinutes()}`,
      received:true,
    });
    setInput("");
  }
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_header_info">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat_header_right">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message)=>{
          return(
           <p className={`chat_message ${message.received && "chat_reciever"}`}>
           <span className="chat_name">{message.name}</span>
           {message.message}
           <span className="chat_time_stamp">{message.timeStamp}</span>
         </p>
          );
        })}
      </div>
      <div className="chat_footer">
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-around"
          spacing={1}
        >
          <Grid item xs={1}>
            <InsertEmoticonIcon />
          </Grid>
          <Grid item xs={9}>
            <TextField
              size="small"
              placeholder="Type a message"
              variant="outlined"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={sendMessage}>
              <SendIcon  />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton>
              <MicIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Chat;
