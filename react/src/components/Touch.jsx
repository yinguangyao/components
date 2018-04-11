import React from 'react'
const Hoc = (WrappedComponent) => {
    return class Touch extends React.Component {
        constructor(props) {
            super(props)
        }
        touchStart = (event) => {
            const touches = event.touches[0]
            this.start = {
                x: touches.pageX,
                y: touches.pageY
            }
        }
        touchMove = (event) => {
            const touches = event.touches[0]
            if (event.touches.length > 1 || (event.scale && event.scale !== 1))
                return
            this.delta = {
                x: touches.pageX - this.start.x,
                y: touches.pageY - this.start.y
            }
        }
        touchEnd = (e) => {
            console.log(e.target)
        }
        render() {
            const props = {
                ...this.props,
                touchStart: this.touchStart,
                touchMove: this.touchMove,
                touchEnd: this.touchEnd
            }
            return <WrappedComponent {...this.props} />
        }
    }
}
export default Hoc