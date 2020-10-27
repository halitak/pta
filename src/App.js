import React from 'react'
import Routes from './routes'
import Navbar from './components/Navbar'

import './App.css'

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes />
      </main>
    </div>
  )
}

export default App
