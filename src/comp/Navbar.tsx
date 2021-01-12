import React from 'react';
import '../App.global.scss';
import { PlusCircleFill, Journal } from 'react-bootstrap-icons';

class Navbar extends React.Component
{
    render()
    {
        return (
            <div id="navbar">
                <div id="kounter-container">
                    <p>TESTING</p>
                </div>

                <div id="icon-container">
                    <PlusCircleFill size={50}/>
                    <Journal size={50}/>
                </div> 
            </div>
        );
    }
}

export default Navbar;