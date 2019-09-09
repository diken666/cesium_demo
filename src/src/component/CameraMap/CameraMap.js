import React from 'react';
import './CameraMap.css';

class CameraMap extends React.Component{
    render(){
        return(
            <div className='camera-map'>
                <img src="./image/earth.png" alt="影像地图"/>
                <p>影像地图</p>
            </div>
        )
    }
}
export default CameraMap;