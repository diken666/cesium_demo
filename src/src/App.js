import React from 'react';
import axios from "axios";
import Cesium from "cesium/Cesium";
import 'cesium/Widgets/widgets.css'
import './App.css';
import Iframe from './component/Iframe/Iframe'
import Header from './component/Header/Header'
import RightSideBar from './component/RightSideBar/RightSideBar'
import CameraMap from './component/CameraMap/CameraMap'
import Copyright from './component/Copyright/Copyright'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewer: {},
      entitiesID: [],
      iframeSrc: '',
      title: '峰山村实景三维地图展示系统'
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
  }

  leftClick(e){
    let pickFeature = this.state.viewer.scene.pick(e.position);
    if(Cesium.defined(pickFeature)){
      let iframeContainer = document.getElementById('iframe-container');
      if(iframeContainer.classList.contains('hide')){
        let index = this.state.entitiesID.indexOf(pickFeature.id.id);
        if ( index >= 0 ){
          this.setState({
            iframeSrc: `/tour.html#${index}`
          }, ()=>{
            iframeContainer.classList.remove('hide');
          });
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
          {/*iframe组件 */}
          <Iframe iframeSrc={this.state.iframeSrc}/>
          <div id='cesiumContainer'>
            {/*Header组件*/}
            <Header title={this.state.title}/>
            {/*右侧功能栏组件*/}
            <RightSideBar/>
            {/*左侧影像地图组件*/}
            <CameraMap/>
            {/*Copyright信息*/}
            <Copyright/>
          </div>
        </div>
    );
  }
}

export default App;
