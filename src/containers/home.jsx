import { connect }                  from 'react-redux'
import HomePage                     from '../components/home'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetData: () => {
      return dispatch(Actions.getData())
    }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
