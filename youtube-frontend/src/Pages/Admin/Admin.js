import React from 'react';
import './Admin.css';
import SideNavbar from '../../Component/SideNavbar/SideNavbar';
import AdminPage from '../../Component/AdminPage/AdminPage';
const Admin = ({sideNavbar})=> {
    return(
        <div className='admin'>
            <SideNavbar sideNavbar={sideNavbar}/>
            <AdminPage sideNavbar={sideNavbar}/>
        </div>
    )
}
export default Admin;