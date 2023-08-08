import SearchItems from "./SearchItems";
import ImageList from "./ImageList";
import ProductListings from "./ProductListings";
import SelectedItem from "./SelectedItem";

import { combineReducers } from 'redux';

const AllReducers = combineReducers({
  searchInformation: SearchItems,
  ImageList: ImageList,
  ProductList: ProductListings,
  SelectedItem: SelectedItem,
})

export default AllReducers;