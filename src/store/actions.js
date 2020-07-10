import {  SET_SCREEN} from "./actionNames"

export const setScreen = (screen) => {
    return {
        type: SET_SCREEN,
        screen: screen
    }
}
