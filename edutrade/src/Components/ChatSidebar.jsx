import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore, firestoreCollection, firestoreQuery, firestoreWhere } from '../Firebase';
import { onSnapshot } from 'firebase/firestore';
import { UserAuth } from '../Context/AuthContext';

const ChatSidebar = () => {
    const { user } = UserAuth();
    const [chatRooms, setChatRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const q = firestoreQuery(
            firestoreCollection(firestore, 'chats'),
            firestoreWhere('users', 'array-contains', user.uid)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const chatRoomsData = [];
            querySnapshot.forEach((doc) => {
                chatRoomsData.push({ id: doc.id, ...doc.data() });
            });
            setChatRooms(chatRoomsData);
        });

        return () => unsubscribe();
    }, [user]);

    const filteredChatRooms = chatRooms.filter((chatRoom) =>
        chatRoom.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-blue-100 p-4 h-full overflow-y-auto" style={{ height: '79.6vh' }}>
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Chat Rooms</h2>
            <input
                type="text"
                placeholder="Search"
                className="block w-full mb-4 p-2 rounded-lg border border-gray-300 bg-blue-50 focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="space-y-2">
                {filteredChatRooms.map((chatRoom) => (
                    <li key={chatRoom.id}>
                        <Link
                            to={`/message/${chatRoom.chatRoomId}`}
                            className="flex items-center p-2 rounded-lg hover:bg-blue-300 transition duration-300"
                        >
                            <div className="w-10 h-10 bg-blue-500  text-white flex items-center justify-center rounded-full mr-3">
                                {chatRoom.username[0]}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-blue-700">{chatRoom.username}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default ChatSidebar;
