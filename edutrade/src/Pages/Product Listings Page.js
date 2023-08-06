import React, { useEffect } from "react";
import SearchBarComponent from "../Components/SearchBarComponent";
import ItemDisplay from "../Components/ItemDisplay";
import CreateItemButton from "../Components/CreateItemButton";
import { UserAuth } from "../Context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { addItem, clearProductList } from "../Redux/Actions/Actions";

import { firestore, firestoreCollection, firestoreGetDocs, firestoreQuery, firestoreWhere } from '../Firebase';
export default function Product_Listings_Page() {
    const { user } = UserAuth();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.ProductList);

    useEffect(() => {
        async function checkQuery() {
            const productRef = firestoreCollection(firestore, "product_listings");
            const q = firestoreQuery(productRef, firestoreWhere("tags", "array-contains-any", ["pills"]));

            const querySnapShot = await firestoreGetDocs(q);
            querySnapShot.forEach((doc) => {
                
                let data = doc.data();
                console.log(data.uid + " => " + user.uid);
                if(data.uid == user.uid)
                    return;

                let object = {
                    images: data.images,
                    name: data.name,
                    price: data.price,
                    uid: data.uid,
                    description: data.description,
                }

                dispatch(addItem(object));
            })
        }

        async function getData() {

            const q = await firestoreGetDocs(firestoreCollection(firestore, "product_listings"));
            q.forEach((doc) => {
                let data = doc.data();
                let object = {
                    images: data.images,
                    name: data.name,
                    price: data.price,
                    uid: data.uid,
                    description: data.description,
                }
                dispatch(addItem(object));
            });

            //const q = firestoreQuery(productRef, firestoreWhere(""));
        }
        dispatch(clearProductList());
        //getData();
        checkQuery();
        console.log(productList);
    }, []);
    return (
        <div className="bg-[#E9F7CA] text-center">
            <div>
                <CreateItemButton/>
            </div>
            <div className="flex">
                <div className="flex-1">
                    <SearchBarComponent/>
                </div>
                <p className="m-auto flex-1">FILTERS</p>
            </div>
            
            {/* Display */}
            <div className=" flex flex-wrap bg-[#eeee] ml-[5vw] mr-[5vw] min-h-screen h-fit">
                {productList.map((item) => {
                    return(
                        <ItemDisplay image={item.images[0]}
                                    title={item.name}
                                    location="Place"
                                    price={item.price}
                                    />                        
                    )
                })}
            </div>
        </div>
    )
}