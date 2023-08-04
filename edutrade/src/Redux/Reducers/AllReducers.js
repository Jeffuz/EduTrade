import SearchItems from "./SearchItems";
import ImageList from "./ImageList";

import { combineReducers } from 'redux';

const AllReducers = combineReducers({
  searchInformation: SearchItems,
  ImageList: ImageList,
})

export default AllReducers;