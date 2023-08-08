import React, { useEffect } from "react";
import { UserAuth } from "../Context/AuthContext";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { firestore, firestoreGetDoc, firestoreDoc, firestoreCollection, firestoreAddDoc, firestoreServerTimestamp, firestoreQuery, firestoreWhere, firestoreGetDocs } from '../Firebase';
import { setSelected } from "../Redux/Actions/Actions";


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

            </div>

            {selectedItem != null? 
            <div className="flex">
                <div className="">
                    <button className="bg-red-50 p-10" onClick={goBack}>Back</button>
                </div>
                <div className="flex-[2_1_0%]">
                    <ImageDisplay imageList={selectedItem.images}/>
                </div>

                <div className="flex-1 bg-slate-50 rounded-md">
                    

                    <h3 className="text-4xl text-ellipsis p-10 pb-1 font-bold">{selectedItem.name}</h3>                    
                    <h3 className="text-3xl mr-5 p-10 pt-2 pb-1">${selectedItem.price}</h3>
                    <p className="text-lg pl-10 text-slate-600">{selectedItem.location}</p>
                    
                    <div className="m-5 max-h-[10vh] min-h-[25vh]">
                        <p className="text-2xl">{selectedItem.description}</p>
                    </div>

                    <div className="bottom-0 flex justify-center">
                        <button className="bg-red-50 text-2xl font-bold pl-5 pr-5 pt-2 pb-2 rounded-xl" onClick={handleClick}>Message</button>                
                    </div>
                </div>
                
            </div>
            : null}

            
        </div>
    )
}