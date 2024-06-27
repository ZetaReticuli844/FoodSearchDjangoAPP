import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Search from './pages/Search'


const App = () => {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Search} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
