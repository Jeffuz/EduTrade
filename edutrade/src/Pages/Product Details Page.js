import React, { useEffect } from "react";
import { UserAuth } from "../Context/AuthContext";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { firestore, firestoreGetDoc, firestoreDoc, firestoreCollection, firestoreAddDoc, firestoreQuery, firestoreWhere, firestoreGetDocs} from '../Firebase';
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

    const handleClick = async() => {
        try {
            let isExists = false;

            const userRef = firestoreCollection(firestore, "chat_users");
            const q = firestoreQuery(userRef, firestoreWhere("uid", "==", selectedItem.uid));

            const querySnap = await firestoreGetDocs(q);
            
            // Check if display name already exists
            querySnap.forEach((item) => {
                isExists = true;         
            })

            if(!isExists){ 
                await firestoreAddDoc(userRef, { 
                    displayName: user.displayName,
                    uid: selectedItem.uid });
            }           
        } catch (error) {
            console.error("Error Adding Listing", error);
        }
    }
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