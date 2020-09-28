import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Router from 'router'
import store from 'store'

import './App.css'

function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
