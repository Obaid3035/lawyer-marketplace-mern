import React from 'react'
import Dashboard from '../Dashboard/Dashboard';
import { adminSideBarItems } from './Routes'

const Navbar = () => {
    return <Dashboard sideBarItems={adminSideBarItems} />
}

export default Navbar;