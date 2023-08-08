import React, { useEffect } from "react";
import { UserAuth } from "../Context/AuthContext";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { firestore, firestoreGetDoc, firestoreDoc, firestoreCollection, firestoreAddDoc, firestoreServerTimestamp, firestoreQuery, firestoreWhere, firestoreGetDocs } from '../Firebase';
import { setSelected } from "../Redux/Actions/Actions";
import { TfiBackLeft } from "react-icons/tfi"


import ImageDisplay from "../Components/ImageDisplay";

export default function Product_Details_Page() {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const dispatch = useDispatch();
    const selectedItem = useSelector(state => state.SelectedItem);

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    useEffect(() => {
        let id = params.get('listingID');

        async function getListing() {
            try {
                let productRef = await firestoreGetDoc(firestoreDoc(firestore, "product_listings", id));
                dispatch(setSelected(productRef.data()));

            } catch (e) {
                console.error("Listing not found", e);
            }

        }
        getListing();
    }, []);

    const handleClick = async () => {
        try {
            const currentUser = user;
            const seller = selectedItem;

            const chatRoomId = [currentUser.uid, seller.uid].sort().join('_');

            const q = firestoreQuery(
                firestoreCollection(firestore, 'chats'),
                firestoreWhere('users', '==', [currentUser.uid, seller.uid])
            );

            const querySnapshot = await firestoreGetDocs(q);

            if (querySnapshot.size > 0) {
                const existingChatRoom = querySnapshot.docs[0];
                navigate(`/message/${existingChatRoom.data().chatRoomId}`);
            } else {
                await firestoreAddDoc(firestoreCollection(firestore, 'chats'), {
                    chatRoomId,
                    users: [currentUser.uid, seller.uid],
                    createdAt: firestoreServerTimestamp(),
                    username: seller.displayName,
                });
                navigate(`/message/${chatRoomId}`);
            }
        } catch (error) {
            console.error('Error creating/chatRoom document', error);
        }
    };

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="ml-[5%] mr-[5%] m-10">
            <div className="flex justify-between">
                {/* ... (if needed) */}
            </div>

            {selectedItem != null ? (
                <div className="flex flex-col md:flex-row md:space-x-6">
                    <div>
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-lg text-white font-bold ml-4 px-6 py-2 rounded-xl mt-2 md:mt-0"
                            onClick={goBack}
                        >
                            <TfiBackLeft size={30} />
                        </button>
                    </div>
                    <div className="md:w-1/2">
                        <ImageDisplay imageList={selectedItem.images} />
                    </div>

                    <div className="md:w-1/2 mt-6 md:mt-0">
                        <h1 className="text-3xl font-semibold mb-4">{selectedItem.name}</h1>
                        <p className="text-lg text-gray-600 mb-4">${selectedItem.price}</p>
                        <p className="text-md text-gray-600 mb-6">{selectedItem.location}</p>
                        <div className="mb-6">
                            <p className="text-xl">{selectedItem.description}</p>
                        </div>
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-lg text-white font-semibold px-6 py-2 rounded-xl"
                            onClick={handleClick}
                        >
                            Send a Message 💬
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}