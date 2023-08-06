import React, { useState, useEffect, useRef } from 'react'
import Message from './Message';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestore } from '../Firebase';
import SendMessage from './SendMessage';
import { UserAuth } from "../Context/AuthContext";

const Messaging = () => {
    const { user } = UserAuth();
    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    useEffect(() => {
        const q = query(collection(firestore, "messages"), orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        scroll.current.scrollTop = scroll.current.scrollHeight;
    }, [messages]);

    return (
        <div className="p-6">
            <div className="h-[39.3rem] overflow-y-auto mb-4" ref={scroll}>
                {messages.map((message) => (
                    <Message key={message.id} message={message} currentUser={user} />
                ))}
            </div>
            <SendMessage scroll={scroll} />
        </div>
    )
}

export default Messaging;
