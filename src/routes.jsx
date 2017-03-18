import React                                                from 'react'
import { IndexRoute, Route, Link, IndexRedirect, Redirect } from 'react-router'

/* containers */
import App from './containers/app'
import HomePage from './containers/home'
import AboutPage from './containers/about'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="/" component={HomePage}/>
    {/* <Redirect from='*' to='/404'/> */}
    <Route path="/about" component={AboutPage}/>
  </Route>
)

export default routes
