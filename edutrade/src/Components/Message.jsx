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
                className={`${isSentByCurrentUser
                    ? "bg-blue-500 text-white rounded-tr-none"
                    : "bg-gray-200 text-black rounded-tl-none"
                    } p-4 rounded-2xl shadow-md`}
            >
                <p>{message.text}</p>
            </div>
        </div>
    )
}

export default Message