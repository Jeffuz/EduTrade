import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { firestore } from '../Firebase';
import SendMessage from './SendMessage';
import { UserAuth } from "../Context/AuthContext";
import { useParams } from 'react-router-dom';
import ChatSidebar from './ChatSidebar';

const Messaging = () => {
    const { chatRoomId } = useParams();
    const { user } = UserAuth();
    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    useEffect(() => {
        console.log('Fetching messages for chat room:', chatRoomId);

        const q = query(
            collection(firestore, 'messages'),
            where('chatRoomId', '==', chatRoomId),
            orderBy('timestamp')
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });

            console.log('Retrieved messages:', messages);

            setMessages(messages);
        });

        return () => unsubscribe();
    }, [chatRoomId]);

    useEffect(() => {
        const handleImageLoad = () => {
            scroll.current.scrollTop = scroll.current.scrollHeight;
        };

        const images = scroll.current.querySelectorAll('img');
        images.forEach((image) => {
            if (!image.complete) {
                image.onload = handleImageLoad;
            }
        });
    }, [messages]);

    return (
        <div className='flex'>
            <ChatSidebar />
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="h-[39.3rem] overflow-y-auto mb-4" ref={scroll}>
                    {messages.map((message) => (
                        <Message key={message.id} message={message} currentUser={user} />
                    ))}
                </div>
                <SendMessage scroll={scroll} chatRoomId={chatRoomId} />
            </div>
        </div>
    );
};

export default Messaging;
