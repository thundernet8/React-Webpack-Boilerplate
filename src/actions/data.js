import * as CONSTANTS                from '../constants'

const data = {
    key: 'react',
    name: 'boilerplate'
}

export const getData = () => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: CONSTANTS.GET_DATA,
                payload: data
            })
        }, 3000)
    }
}
