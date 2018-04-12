import { 
    Router, 
    Route, 
    Link,
    hashHistory
} from 'react-router'
// import {
//     Home,
//     TabPage,
//     SliderPage,
//     NoMatch
// } from '../pages'
import Home from '../pages/Home'
import NoMatch from '../pages/NoMatch'
import SliderPage from '../pages/SliderPage'
import TabPage from '../pages/TabPage'
import React from 'react'
const RootRouter = () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={Home} />
            <Route path="/Tab" component={TabPage} />
            <Route path="/Slider" component={SliderPage} />
            <Route path="*" component={NoMatch} />
        </Router>
    )
}
export default RootRouter