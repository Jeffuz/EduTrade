import React from 'react'

const Message = ({ message }) => {
    return (
        <div>
            <div className=''>
                <p className='text-sm m-1'>{message.name}</p>

                <p className='p-4 border rounded-md shadow-md'>{message.text}</p>
            </div>
        </div>
    )
}

export default Message