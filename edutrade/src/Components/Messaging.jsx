import React, { useState, useEffect, useRef } from 'react'
import Message from './Message';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestore } from '../Firebase';
import SendMessage from './SendMessage';

const Messaging = () => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    useEffect(() => {
        const q = query(collection(firestore, 'messages'), orderBy('timestamp'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messages = []
            querySnapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            })
            setMessages(messages)
        })
        return () => unsubscribe()
    }, [])

    return (
        <>
            <div className='p-6'>
                {messages && messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
            <SendMessage scroll={scroll}/>
            <span ref={scroll}></span>
        </>
    )
}

export default Messaging