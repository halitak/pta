import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar--link">
        Home
      </Link>
      <Link to="/role" className="navbar--link">
        Add Role
      </Link>
      <Link to="/member" className="navbar--link">
        Add Member
      </Link>
      <Link to="/team" className="navbar--link">
        Create Team
      </Link>
    </nav>
  )
}

export default Navbar
