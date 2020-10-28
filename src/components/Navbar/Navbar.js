import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

const NAV_MENUS = [
  {
    path: '/',
    title: 'Home'
  },
  {
    path: '/role',
    title: 'Role'
  },
  {
    path: '/member',
    title: 'Member'
  },
  {
    path: '/team',
    title: 'Team'
  }
]

const Navbar = () => {
  return (
    <nav className="navbar">
      {NAV_MENUS.map((menu) => {
        return (
          <Link
            to={menu.path}
            key={menu.title.toLowerCase()}
            className="navbar--link"
          >
            {menu.title}
          </Link>
        )
      })}
    </nav>
  )
}

export default Navbar
