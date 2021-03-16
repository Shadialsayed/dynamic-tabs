import {UPDATE_SLIDER, ADD_NEW_TAB_CONTENT } from "./contentTypes";

export const updateSlider = (index = 0, value) => {
    return {
        type: UPDATE_SLIDER,
        payload: {index: index, values: value}
    }
}

export const addNewTabContent = () => {
    return {
        type : ADD_NEW_TAB_CONTENT
    }
}
