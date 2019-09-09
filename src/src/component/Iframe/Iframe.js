import React from 'react';
import './Iframe.css'

class Iframe extends React.Component{
    componentDidMount(){
        document.getElementById('btn-back').addEventListener('click', ()=>{
            document.getElementById('iframe').setAttribute('src', '');
            document.getElementById('iframe-container').classList.add('hide');
        });
    }
    render(){
        return (
            <div id='iframe-container' className='hide'>
                <button id='btn-back'>返回</button>
                <iframe src={this.props.iframeSrc} frameBorder="0" id='iframe'></iframe>
            </div>
        )
    }
}

export default Iframe;