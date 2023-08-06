import React, { useState } from 'react'
import { auth, firestore, firestoreAddDoc, firestoreCollection, firestoreServerTimestamp } from '../Firebase'

const SendMessage = ({ scroll }) => {
    const [input, setInput] = useState('')
    const SendMessage = async (e) => {
        e.preventDefault()
        if (input === '') {
            alert('Please enter a valid message')
            return
        }
        const { uid, displayName } = auth.currentUser
        await firestoreAddDoc(firestoreCollection(firestore, 'messages'), {
            text: input,
            name: displayName,
            uid,
            timestamp: firestoreServerTimestamp()
        })
        setInput('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <form onSubmit={SendMessage}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type='text'
                placeholder='Message'
            >
            </input>
            <button
                type='submit'
            >
                Send
            </button>
        </form>
    )
}

export default SendMessage