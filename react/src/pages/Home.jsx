import React from 'react'
import { Link } from 'react-router'
import './Home.scss'
const Home = props => {
    return (
        <div id="main">
            <h1 className="title">组件demos</h1>
            <ul>
                <li><Link to="/Tab">tab</Link></li>
                <li><Link to="/Slider">slider</Link></li>
            </ul>
        </div>
    )
}
export default Home