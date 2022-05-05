import React from "react";
import {  NavLink } from "react-router-dom";


const  Header =() =>{
    return (
        <header>
            <nav>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink activeClassName='active'  to="/addpatient" className='nav-link'>AddPatient</NavLink>
                    
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='active' to="/addvaccination" className='nav-link'>Add Vaccination</NavLink>
                    </li>

                    <li>
                    <NavLink activeClassName='active' to="/vaccinecard" className='nav-link'>Vaccine card</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
