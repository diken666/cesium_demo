import React from 'react';
import './Header.css';

class Header extends React.Component{
    render(){
        return(
            <div className='title'>
                <p>{this.props.title}</p>
            </div>
        )
    }
}

export default Header;