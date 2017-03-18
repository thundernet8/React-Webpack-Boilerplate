import { connect }                  from 'react-redux'
import App                          from '../components/app'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(App)
