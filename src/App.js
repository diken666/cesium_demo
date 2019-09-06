import React from 'react';
import axios from "axios";
import Cesium from "cesium/Cesium";
import 'cesium/Widgets/widgets.css'
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewer: {},
      entitiesID: []
    };
    this.leftClick = this.leftClick.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
  }
  componentDidMount() {
    const viewer = new Cesium.Viewer("cesiumContainer", {
      animation: false, // 是否创建动画小器件
      timeline: false,   // 是否显示时间控件
      fullscreenButton: false, // 是否显示全屏按钮
      geocoder: false, // 是否显示地名查找控件
      baseLayerPicker: false,  // 是否显示图层选择控件
      vrButton: false,
    });
    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(120.86231944451356, 30.041013055524868, 15000.0)
    });
    axios.get('/pos.json').then(res =>{
      let data = res.data;
      let tempEntitiesID = [];
      for(let i=0; i<data.length; i++){
         viewer.entities.add({
           position: Cesium.Cartesian3.fromDegrees(data[i].lon, data[i].lat),
           // point: {
           //   pixelSize: 10,
           //   color: Cesium.Color.YELLOW
           // },
           billboard : {
             image : '/image/location.png',
             width : 20,
             height : 20
           },
           label : {
             text : data[i].name,
             font : '14pt monospace',
             style: Cesium.LabelStyle.FILL_AND_OUTLINE,
             outlineWidth : 2,
             verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
             pixelOffset : new Cesium.Cartesian2(0, -9)
           },
         });
         tempEntitiesID.push(viewer.entities.values[i].id)
      }
      this.setState({
        viewer,
        entitiesID: tempEntitiesID
      })
    }).catch( (e)=>{
      throw Error(`对文件操作出现错误，错误描述为：${e.toString()}`);
    });

    viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(this.leftClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(this.mouseMove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    document.getElementById('btn-back').addEventListener('click', ()=>{
      document.getElementById('iframe').setAttribute('src', '');
      document.getElementById('iframe-container').classList.add('hide');
    });
  }

  leftClick(e){
    let pickFeature = this.state.viewer.scene.pick(e.position);
    if(Cesium.defined(pickFeature)){
      let iframeContainer = document.getElementById('iframe-container');
      if(iframeContainer.classList.contains('hide')){
        let index = this.state.entitiesID.indexOf(pickFeature.id.id);
        if ( index >= 0 ){
          document.getElementById('iframe').setAttribute('src', `/tour.html#${index}`);
          iframeContainer.classList.remove('hide');
        }
      }
    }
  }
  mouseMove(e){
    let startPickFeature = this.state.viewer.scene.pick(e.startPosition);
    let endPickFeature = this.state.viewer.scene.pick(e.endPosition);
    if(Cesium.defined(startPickFeature) && Cesium.defined(endPickFeature)){
      if(startPickFeature.id._id === endPickFeature.id._id){
        endPickFeature.id.label.scale = 1.5;
        endPickFeature.id.billboard.scale = 1.5;
      }else{
        startPickFeature.id.label.scale = 1;
        startPickFeature.id.billboard.scale = 1;
        endPickFeature.id.label.scale = 1.5;
        endPickFeature.id.billboard.scale = 1.5;
      }
      return
    }
    if(Cesium.defined(startPickFeature)){
      startPickFeature.id.label.scale = 1;
      startPickFeature.id.billboard.scale = 1;
    }
    if(Cesium.defined(endPickFeature)){
      endPickFeature.id.label.scale = 1.5;
      endPickFeature.id.billboard.scale = 1.5;
    }
  }
  render(){
    return (
        <div>
          <div id='iframe-container' className='hide'>
            <button id='btn-back'>返回</button>
            <iframe src="" frameBorder="0" id='iframe'></iframe>
          </div>
          <div id='cesiumContainer'>
            <div className='title'>
              <p>峰山村实景三维地图展示系统</p>
            </div>
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
            <div className='camera-map'>
              <img src="./image/earth.png" alt="影像地图"/>
              <p>影像地图</p>
            </div>
            <div className='copyright'>
              <p>Copyright © 2019宝略科技 All Rights Reserved .</p>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
