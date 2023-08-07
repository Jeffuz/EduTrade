import React, { useEffect } from "react";
import { UserAuth } from "../Context/AuthContext";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { firestore, firestoreGetDoc, firestoreDoc, firestoreCollection, firestoreAddDoc, firestoreServerTimestamp, firestoreQuery, firestoreWhere, firestoreGetDocs} from '../Firebase';
import { setSelected } from "../Redux/Actions/Actions";

import ImageDisplay from "../Components/ImageDisplay";

export default function Product_Details_Page() {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const dispatch = useDispatch();
    const selectedItem = useSelector(state => state.SelectedItem);

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    useEffect(()=> {
        let id = params.get('listingID');

        async function getListing() {
            try{
                let productRef = await firestoreGetDoc(firestoreDoc(firestore, "product_listings", id));      
                dispatch(setSelected(productRef.data()));

            } catch(e){
                console.error("Listing not found", e);
            }

        }
        getListing();
    }, []);

    const handleClick = async () => {
        try {
            const currentUser = user;
            const seller = selectedItem;
    
            const chatRoomId = `${currentUser.uid}_${seller.uid}`;
    
            const chatRoomDoc = await firestoreGetDoc(firestoreDoc(firestore, 'chats', chatRoomId));
    
            if (!chatRoomDoc.exists()) {
                await firestoreAddDoc(firestoreCollection(firestore, 'chats'), {
                    chatRoomId,
                    users: [currentUser.uid, seller.uid],
                    createdAt: firestoreServerTimestamp(),
                });
            }
        } catch (error) {
            console.error('Error creating chat room', error);
        }
    };
    
    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="ml-[20%] mr-[20%]">
            <button className="bg-red-50 p-10" onClick={goBack}>Back</button>
            {selectedItem != null? 
            <div className="text-left m-auto">

                <ImageDisplay imageList={selectedItem.images}/>
                <div className="flex flex-wrap justify-center">
                    <h3 className="text-3xl mr-5">${selectedItem.price}</h3>
                    <h3 className="text-3xl text-ellipsis">{selectedItem.name}</h3>                    
                </div>

                <p className="text-lg text-center text-slate-600">{selectedItem.location}</p>
                <div className="m-5">
                    <p className="text-2xl">{selectedItem.description}</p>
                </div>

            </div>
            : null}

            <button className="bg-red-50 p-10" onClick={handleClick}>Message</button>
        </div>
    )
}