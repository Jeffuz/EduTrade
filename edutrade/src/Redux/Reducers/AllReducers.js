import SearchItems from "./SearchItems";

import { combineReducers } from 'redux';

const AllReducers = combineReducers({
  searchInformation: SearchItems,
})

export default AllReducers;