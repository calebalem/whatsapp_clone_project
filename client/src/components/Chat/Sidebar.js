import React from "react";
import "./Sidebar.css";
import SidebarChat from './SidebarChat';
import {DonutLarge as DonutLargeIcon, MoreVert as MoreVertIcon, Chat as ChatIcon, SearchOutlined as SearchOutlinedIcon} from "@material-ui/icons";
import { Avatar, IconButton, TextField, InputAdornment } from "@material-ui/core";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
          <Avatar src="data:image/jpeg;base64,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"/>
        
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                   <TextField variant="outlined" placeholder="Search" size="small" fullWidth
                   InputProps={{
                       startAdornment:(
                           <InputAdornment position="start">
                               <SearchOutlinedIcon/>
                           </InputAdornment>
                       ),
                   }}></TextField>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat/>
                <SidebarChat/>
            </div>
    </div>
  );
}

export default Sidebar;
