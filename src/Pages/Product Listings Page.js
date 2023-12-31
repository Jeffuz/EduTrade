import React, { useEffect } from "react";
import SearchBarComponent from "../Components/SearchBarComponent";
import ItemDisplay from "../Components/ItemDisplay";
import CreateItemButton from "../Components/CreateItemButton";
import { UserAuth } from "../Context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { addItem, clearProductList } from "../Redux/Actions/Actions";

import { useLocation } from 'react-router-dom';

import { firestore, firestoreCollection, firestoreGetDoc, firestoreGetDocs, firestoreQuery, firestoreWhere } from '../Firebase';
import { sendSignInLinkToEmail } from "firebase/auth";

export default function Product_Listings_Page() {
    const location = useLocation();
    const { user } = UserAuth();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.ProductList);
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        dispatch(clearProductList());

        checkQuery();
    }, []);

    async function checkQuery() {
        console.log(searchParams.get('params'));
        if (searchParams.get('params') === null || searchParams.get('location') === null) {
            searchAllQuery();
            return;
        }

        if (searchParams.get('params') === "null" && searchParams.get('location') !== "null") {
            // Perform all search
            defaultQueryAtLocation();
            return;
        }

        if (searchParams.get('params') !== "null" && searchParams.get('location') === "null") {
            defaultQueryAllLocations();
            return;
        }
        if (searchParams.get('params') === "null" && searchParams.get('location') === "null") {
            searchAllQuery();
            return;
        }

        let paramList = searchParams.get('params').split(" ");

        let location = searchParams.get('location');

        const productRef = firestoreCollection(firestore, "product_listings");
        const q = firestoreQuery(productRef, firestoreWhere("tags", "array-contains-any", paramList), firestoreWhere("location", "==", location));

        const querySnapShot = await firestoreGetDocs(q);

        querySnapShot.forEach((doc) => {

            let data = doc.data();

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
    async function defaultQueryAtLocation() {

        let location = searchParams.get('location');

        const productRef = firestoreCollection(firestore, "product_listings");
        const q = firestoreQuery(productRef, firestoreWhere("location", "==", location));
        const querySnapShot = await firestoreGetDocs(q);

        querySnapShot.forEach((doc) => {
            let data = doc.data();

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
    async function defaultQueryAllLocations() {
        let searchList = searchParams.get('params').split(" ");

        const productRef = firestoreCollection(firestore, "product_listings");
        const q = firestoreQuery(productRef, firestoreWhere("tags", "array-contains-any", searchList));
        const querySnapShot = await firestoreGetDocs(q);


        querySnapShot.forEach((doc) => {
            let data = doc.data();

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
    async function searchAllQuery() {
        const snap = await firestoreGetDocs(firestoreCollection(firestore, "product_listings"));

        snap.forEach((doc) => {
            let data = doc.data();

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
        <div className="bg-blue-100 text-center">
            <div>
                {!user?.email ? (null) : <CreateItemButton />}
            </div>
            <div className="flex justify-center">
                <div className=" ml-[5.4%] flex-1">
                    <SearchBarComponent />
                </div>

            </div>

            {/* Display */}
            <div className=" flex flex-wrap bg-blue-100 ml-[5vw] mr-[5vw] min-h-screen h-fit">
                {productList.map((item, index) => {
                    return (
                        <div key={index}>
                            <ItemDisplay image={item.images[0]}
                                title={item.name}
                                location={item.location}
                                price={item.price}
                                docID={item.documentID}
                            />
                        </div>

                    )
                })}
            </div>
        </div>
    )
}