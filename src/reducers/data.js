import * as CONSTANTS     from '../constants'

const initialData = {
    key: '',
    name: ''
}

export const dataReducer = (state = initialData, action) => {
    switch (action.type) {
        case CONSTANTS.GET_DATA:
            return action.payload
        default:
            return state
    }
}
