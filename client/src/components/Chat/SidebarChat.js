import React from 'react';
import './sidebarchat.css';
import {Avatar} from '@material-ui/core';
function SidebarChat() {
    return (
        <div className="sidebar_chat">
             <Avatar/>
            <div className="sidebar_chat_info">
                <h3>Room name</h3>
                <p>This is the last message</p>
            </div>
        </div>
    );
}

export default SidebarChat
