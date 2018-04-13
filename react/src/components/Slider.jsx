import React from 'react'
import PropTypes from 'prop-types'
import Touch from './Touch'
import './Slider.scss'

class Slider extends React.PureComponent{
    constructor(props) {
        super(props);
    }
    render() {
        const {
            activeIndex = 1,
            onSelect = noop,
            children,
            width,
            isCirculate,
            getRef = noop,
            handleChildren = noop,
            touchStart = noop,
            touchMove = noop,
            touchEnd = noop
        } = this.props
        return (
            <div 
                id="slider" 
                className="slider"
            >
                {handleChildren()}
            </div>
        )
    }
}
Slider.propTypes = {
    speed: PropTypes.number,
    isCirculate: PropTypes.bool
}
export default Slider