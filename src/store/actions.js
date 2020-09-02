import {SET_COUNTER, SET_NAME, SET_SETTING, SET_THEME} from "./actionNames"

export const setName = (name) => {
    return {
        type: SET_NAME,
        name
    }
}

export const setTheme = (theme) => {
    return {
        type: SET_THEME,
        theme
    }
}

export const setOpenSetting = (openSetting) => {
    return {
        type: SET_SETTING,
        openSetting
    }
}

export const setUpdateCount = (counter=0) => {
    return {
        type: SET_COUNTER,
        counter
    }
}
