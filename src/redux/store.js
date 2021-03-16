import { createStore } from 'redux'
import contentReducer from "./content/contentReducer";

const store = createStore(contentReducer)

export default store