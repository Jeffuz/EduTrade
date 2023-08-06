import React, { useEffect } from "react";
import SearchBarComponent from "../Components/SearchBarComponent";
import ItemDisplay from "../Components/ItemDisplay";
import CreateItemButton from "../Components/CreateItemButton";
import { UserAuth } from "../Context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { addItem, clearProductList } from "../Redux/Actions/Actions";

import { useLocation } from 'react-router-dom';

import { firestore, firestoreCollection, firestoreGetDocs, firestoreQuery, firestoreWhere } from '../Firebase';
import { sendSignInLinkToEmail } from "firebase/auth";

export default function Product_Listings_Page() {
    const location = useLocation();
    const { user } = UserAuth();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.ProductList);
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        console.log(searchParams.get('params'));

        dispatch(clearProductList());
        //getData();
        checkQuery();
    }, []);

    async function checkQuery() {
        let paramList = searchParams.get('params').split(" ");
        let location = searchParams.get('location');

        const productRef = firestoreCollection(firestore, "product_listings");
        const q = firestoreQuery(productRef, firestoreWhere("tags", "array-contains-any", paramList), firestoreWhere("location", "==", location));

        const querySnapShot = await firestoreGetDocs(q);
        querySnapShot.forEach((doc) => {
            
            let data = doc.data();
            console.log(doc.id);
            // if(data.uid == user.uid)
            //     return;

            let object = {
                images: data.images,
                name: data.name,
                price: data.price,
                uid: data.uid,
                location: data.location,
                description: data.description,
                documentID: doc.id
            }

            dispatch(addItem(object));
        })
    }

    return (
        <div className="bg-[#E9F7CA] text-center">
            <div>
                <CreateItemButton/>
            </div>
            <div className="flex">
                <div className="flex-1">
                    <SearchBarComponent/>
                </div>
                {/* <p className="m-auto flex-1">FILTERS</p> */}
            </div>
            
            {/* Display */}
            <div className=" flex flex-wrap bg-[#eeee] ml-[5vw] mr-[5vw] min-h-screen h-fit">
                {productList.map((item) => {
                    return(
                        <ItemDisplay image={item.images[0]}
                                    title={item.name}
                                    location={item.location}
                                    price={item.price}
                                    docID={item.documentID}
                                    />                        
                    )
                })}
            </div>
        </div>
    )
}