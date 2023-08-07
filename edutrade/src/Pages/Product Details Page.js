import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { firestore, firestoreGetDoc, firestoreDoc} from '../Firebase';
import { setSelected } from "../Redux/Actions/Actions";

import ImageDisplay from "../Components/ImageDisplay";

export default function Product_Details_Page() {
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

    return (
        <div className="ml-[20%] mr-[20%]">
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


        </div>
    )
}