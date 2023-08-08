import React, { useState } from 'react';
import { auth, firestore, firestoreAddDoc, firestoreCollection, firestoreServerTimestamp, storage } from '../Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Icon } from '@iconify/react';
import { BiImageAdd } from 'react-icons/bi';

const SendMessage = ({ scroll, chatRoomId }) => {
    const [input, setInput] = useState('');
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!input.trim() && !file) {
            alert('Please enter a message or select a file.');
            return;
        }

        const { uid, displayName } = auth.currentUser;

        if (file) {
            const folderPath = 'chat_images/';
            const storageRef = ref(storage, folderPath + file.name);
            await uploadBytes(storageRef, file);
            const fileUrl = await getDownloadURL(storageRef);
            await firestoreAddDoc(firestoreCollection(firestore, 'messages'), {
                text: input,
                name: displayName,
                uid,
                imageUrl: fileUrl,
                timestamp: firestoreServerTimestamp(),
                chatRoomId: chatRoomId,
            });
        } else {
            await firestoreAddDoc(firestoreCollection(firestore, 'messages'), {
                text: input,
                name: displayName,
                uid,
                timestamp: firestoreServerTimestamp(),
                chatRoomId: chatRoomId,
            });
        }

        setInput('');
        setFile(null);
        setFilePreview(null);
        scroll.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setFile(null);
            setFilePreview(null);
        }
    };

    return (
        <form onSubmit={sendMessage} className="flex items-center p-4 space-x-4">
            <div className="relative flex-grow">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    placeholder="Message"
                    className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
                />
                <label
                    htmlFor="image-upload"
                    className="absolute right-0 top-0 bottom-0 flex items-center pr-4 cursor-pointer"
                >
                    <BiImageAdd size={24} />
                </label>
            </div>
            {filePreview && (
                <div className="w-12 h-12 bg-gray-200 rounded-full">
                    <img src={filePreview} alt="File Preview" className="w-full h-full object-cover rounded-full" />
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                id="image-upload"
                className="hidden"
                onChange={handleFileChange}
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            >
                <Icon icon="iconamoon:send" width="24" height="24" />
            </button>
        </form>
    );
};

export default SendMessage;
