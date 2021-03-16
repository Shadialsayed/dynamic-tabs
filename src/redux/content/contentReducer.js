import {UPDATE_SLIDER, ADD_NEW_TAB_CONTENT} from "./contentTypes";

const initialState = {
    contents: [
        { id: 0, sliderRange: [1, 8] },
    ]
}

const contentReducer = (state = initialState, action) => {
    switch (action.type) {

        case UPDATE_SLIDER:
            let item2 = state.contents[action.payload.index]; //pass index
            item2.sliderRange = action.payload.values;
            state.contents[action.payload.index] = item2;
            return {
                contents: state.contents
            }

        case ADD_NEW_TAB_CONTENT:
            state.contents.push({ id: state.length + 1, contentCounter: 0, sliderRange: [1, 8] })
            return {
                contents: state.contents
            }

        default: return state
    }
}

export default contentReducer