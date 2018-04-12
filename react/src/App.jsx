import React from 'react'
import { render } from 'react-dom'
import RootRouter from './router/Router'
import './App.scss'
render(
    <RootRouter />,
    document.getElementById("app")
)