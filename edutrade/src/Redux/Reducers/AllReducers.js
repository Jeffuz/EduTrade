import SearchItems from "./SearchItems";
import ImageList from "./ImageList";
import ProductListings from "./ProductListings";

import { combineReducers } from 'redux';

const AllReducers = combineReducers({
  searchInformation: SearchItems,
  ImageList: ImageList,
  ProductList: ProductListings,
})

export default AllReducers;