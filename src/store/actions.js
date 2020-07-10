import { SET_MENU, SET_SCREEN, SET_LOADER, SET_ORDER, SET_USER, SET_SALE, SET_ORDERS } from "./actionNames"

export const SetMenu = (menu: boolean) => {
    return {
        type: SET_MENU,
        menu: menu
    }
}

export const SetScreen = (screen: string) => {
    return {
        type: SET_SCREEN,
        screen: screen
    }
}

export const SetLoader = (show: boolean) => {
    return {
        type: SET_LOADER,
        loader: show
    }
}

export const SetOrder = (order: object) => {
    return {
        type: SET_ORDER,
        order: order
    }
}

export const SetUser = (user: object) => {
    return {
        type: SET_USER,
        user: user
    }
}

export const SetSale = (sale: number) => {
    return {
        type: SET_SALE,
        sale: sale
    }
}

export const SetOrders = (orders: any) => {
    return {
        type: SET_ORDERS,
        orders: orders
    }
}