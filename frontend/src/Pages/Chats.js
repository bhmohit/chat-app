import React, { useEffect } from "react"
import { useState } from "react"
import axios from "axios"

export default function Chat() {
    const [chat, setChat] = useState([]);
    
    const fetchChat = async () => {
        const {data} = await axios.get("/api/chat");

        setChat(data);
    }

    useEffect(() => {
        fetchChat();
    }, [])

    return (
        <div>
            {chat.map((eachChat) => (<div key={eachChat._id}>{eachChat.chatName}</div>))}
        </div>
    )
}