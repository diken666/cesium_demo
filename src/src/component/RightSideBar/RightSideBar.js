import React from 'react';
import './RightSideBar.css'

class RightSideBar extends React.Component{
    render(){
        return(
            <div>
                <div className='item-circle pos-t120-right35'>
                    <div className='item-circle-con'>
                        <img src='./image/compass.png' alt="指南针"/>
                    </div>
                </div>
                <ul className='item-con'>
                    <li className='block'>
                        <div className='item-circle'>
                            <div className='item-circle-con'>
                                <img src='./image/location2.png' alt="地标显示"/>
                            </div>
                            <div className='item-circle-left'>

                            </div>
                            <p className='item-circle-p'>地标显示</p>
                        </div>
                    </li>
                    <li className='block'>
                        <div className='item-circle'>
                            <div className='item-circle-con'>
                                <img src='./image/place.png' alt="地面全景"/>
                            </div>
                            <div className='item-circle-left'>

                            </div>
                            <p className='item-circle-p'>地面全景</p>
                        </div>
                    </li>
                    <li className='block'>
                        <div className='item-circle'>
                            <div className='item-circle-con'>
                                <img src='./image/plane.png' alt="空中全景"/>
                            </div>
                            <div className='item-circle-left'>

                            </div>
                            <p className='item-circle-p'>空中全景</p>
                        </div>
                    </li>
                    <li className='block'>
                        <div className='item-circle'>
                            <div className='item-circle-con'>
                                <img src='./image/zoom.png' alt="空间分析"/>
                            </div>
                            <div className='item-circle-left'>

                            </div>
                            <p className='item-circle-p'>空间分析</p>
                        </div>
                    </li>
                </ul>
                <div className='item-select'>
                    <ul className='item-list'>
                        <li className='item-list-li'>
                            <div className='item-list-con'>
                                <img src="./image/area.png" alt="area"/>
                            </div>
                        </li>
                        <li className='item-list-li'>
                            <div className='item-list-con'>
                                <img src="./image/ruler.png" alt="ruler"/>
                            </div>
                        </li>
                    </ul>
                    <div className='item-home'>
                        <img src="./image/home.png" alt="home"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default RightSideBar;