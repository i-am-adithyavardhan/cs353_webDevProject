import React from 'react'
import logo from "../Images/blogger.png"
import {Link} from 'react-router-dom'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
    const navigate = useNavigate();
    const gotoLogin = ()=>{
       navigate("/login");

  }

  return (
    <div className="nav-container">
                    <ul >
                <li >
                    <img src={logo} height="30px" width="30px" alt="logo"/>
                </li>
                <li className="nav-links">
                   {/* <a href='/'>Home</a>*/}
                   <Link to='/'>Home</Link>
                </li>
                <li className="nav-links">
                    {/* <a href='/Blogs'>Blogs</a> */}
                    <Link to='/Blogs'>Blogs</Link>
                </li>
                <li className="nav-links">
                    {/* <a href='/userprofile'>Profile</a> */}
                    <Link to='/userprofile'>Profile</Link>
                </li>
                <li className="nav-links">
                    {/* <a href='/signup'>signup</a> */}
                    <Link to='/signup'>Signup</Link>

                </li>
                <li className="nav-links">
                     <button className='cpost' >New Post</button>

                </li>
                <li className="nav-links">
                    <button className='login' onClick={gotoLogin} >login</button>
                </li>
            </ul>

    </div>
  )
}

export default Navbar