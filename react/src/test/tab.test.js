import { shallow } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import TabPane from '../components/TabPane.jsx'
import Tabs from '../components/Tabs.jsx'

describe("tabs", () => {
    it("test tabPane", () => {
        let tabPane = shallow(<TabPane currentKey={1} activeKey = {1}>hello world</TabPane>)
        expect(tabPane.text()).to.equal("hello world")
    })
})