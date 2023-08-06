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
        <form onSubmit={SendMessage} className='flex items-center p-4'>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type='text'
                placeholder='Message'
                className="flex-grow px-4 py-2 mr-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
            >
            </input>
            <button
                type='submit'
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            >
                Send
            </button>
        </form>
    )
}

export default SendMessage