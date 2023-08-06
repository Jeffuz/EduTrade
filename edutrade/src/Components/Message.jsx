import React from 'react'

const Message = ({ message, currentUser }) => {
    const isSentByCurrentUser = message.uid === currentUser.uid;

    return (
        <div
            className={`flex flex-col mb-4 ${isSentByCurrentUser ? "items-end" : "items-start"
                }`}
        >
            {!isSentByCurrentUser && (
                <p className="text-sm font-bold mb-1">{message.name}</p>
            )}
            <div
                className={`${isSentByCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200"
                    } p-4 rounded-md shadow-md`}
            >
                <p>{message.text}</p>
            </div>
        </div>
    )
}

export default Message