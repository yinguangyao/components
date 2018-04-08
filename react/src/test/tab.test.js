import { shallow } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import TabPane from '../components/TabPane'
import Tabs from '../components/Tabs'

describe("tabs", () => {
    it("tabPane", () => {
        let tabPane = shallow(<TabPane currentKey={1} activeKey = {1}>hello world</TabPane>)
        expect(tabPane.find("div").attr("class").to.equal("tab-pane"));
        expect(tabPane.find("div").text().to.equal("hello world"))
    })
})