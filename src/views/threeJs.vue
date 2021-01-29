<template>
    <div>
        <div id="container"></div>
        <div id="label"></div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import * as THREE from "three";
    import Stats from "three/examples/jsm/libs/stats.module.js";
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
    import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
    import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
    import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
    import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
    /*import { OBJLoader,  MTLLoader} from 'three-obj-mtl-loader';*/
   /* import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
    import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'*/
    import { OBJLoader, MTLLoader } from "three-obj-mtl-loader";
/*    import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'*/

    import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass';
    import { CSS3DRenderer,CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
    export default {
            data() {
                return {
                    scene:null,
                    camera:null,
                    renderer:null,
                    stats:null,
                    composer:null,
                    outlinePass:null,
                    objects:[],//场景中所有对象的集合
                    publicPath: process.env.BASE_URL, // public地址
                    posx:require('@/assets/img/sky/px.jpg'),
                    negx:require('@/assets/img/sky/nx.jpg'),
                    posy:require('@/assets/img/sky/py.jpg'),
                    negy:require('@/assets/img/sky/ny.jpg'),
                    posz:require('@/assets/img/sky/pz.jpg'),
                    negz:require('@/assets/img/sky/nz.jpg'),
                    clickstate:false,
                };
            },
            mounted() {
               /* this.scene
                this.camera
                this.renderer
                this.stats
                this.composer
                this.outlinePass
                this.objects = []//场景中所有对象的集合*/
                this.initMain()
                this.animate();

            },
            methods: {
                initMain(){
                    this.initScene();
                    this.initCamera();
                    this.initRenderer();
                    //this.initGeometry();//场景中的盒子
                    this.initBuilding();//墙体
                    this.initTile();//灵动标签标题
                    this.initAgvCar();//小车
                    this.initOrbitControl();
                    //this.initStats();
                    this.initLight();
                    this.initAxisHelper();
                    this.initoutLine();
                    this.initComposer();
                   // this.addSkybox();
                    this.initObjectSelect();
                   /* this.initoutLine();
                    this.initComposer();*/
                  /*  this.initLight();*/
                    /*
                   this.initOrbitControl();


                   this.changeStats();*/

                },

                getData(){
                    // 循环获取数据
                    setInterval(()=>{
                        this.enterPressure = 70
                        console.log(this.enterPressure)
                    },1000)
                },

                /**
                 初始化场景，仅仅需要有句话就可以生命一个场景，非常简单
                 **/
                initScene(){
                    let that=this
                    this.scene = new THREE.Scene();
                    // 默认您已经创建了相机和渲染器，就直接在场景上加入背景就行
                    that.scene.background = new THREE.CubeTextureLoader()
                        .load( [ that.posx, that.negx, that.posy, that.negy, that.posz, that.negz ] );//添加天空盒子背景图
                },

                /**
                 初始化透视相机
                 **/
                initCamera() {
                    this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 10000);
                    /*  this.camera.position.x = 0;
                      this.camera.position.y = 1600;
                      this.camera.position.z = 1000;*/
                    this.camera.position.set(0, 1600, 1000)
                    //相机的朝向
                    this.camera.lookAt(0, 0, 0)
                    //将相机放到场景中
                    this.scene.add(this.camera)
                },

                /**
                 声名渲染器
                 **/
                initRenderer () {
                    this.renderer = new THREE.WebGLRenderer(
                        {
                            antialias: true,//是否开启反锯齿，设置为true开启反锯齿。
                            alpha: true,//是否可以设置背景色透明。
                            logarithmicDepthBuffer: true//模型的重叠部位便不停的闪烁起来。这便是Z-Fighting问题，为解决这个问题，我们可以采用该种方法
                        }
                    );
                    this.renderer.setSize(window.innerWidth, window.innerHeight);//渲染器的尺寸与windows的尺寸相同
                    this.renderer.setClearColor('rgb(3,37,90)', 1);//设置渲染的背景颜色
                    this.renderer.setPixelRatio(window.devicePixelRatio);//设置渲染器的分辨率与浏览器电脑本身的分辨率相同
                    //将渲染器添加到我们的网页中，可以将渲染的内容在网页中显示出来
                    let container = document.getElementById("container");
                    container.appendChild(this.renderer.domElement);
                },

                /**
                 * 向场景中添加盒子
                 */
                initGeometry () {
                    const geometry = new THREE.BoxGeometry( 100, 100, 100);
                    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
                    const cube = new THREE.Mesh( geometry, material );
                    this.addObject( cube );
                   /* this.camera.position.z = 5;*/
                },
                /**
                 * 向场景中添加小车
                 */
                initAgvCar(){
                    let that=this
                    var OBJLoader1 = new OBJLoader();//obj加载器
                    var MTLLoader1 = new MTLLoader();//材质文件加载器
                    MTLLoader1.load(`/models/test.mtl`, function(materials) {
                        // 返回一个包含材质的对象MaterialCreator
                        console.log(materials); //obj的模型会和MaterialCreator包含的材质对应起来
                        OBJLoader1.setMaterials(materials);
                        OBJLoader1.load(`/models/test.obj`, function(obj) {
                            console.log(obj);
                            let mesh = obj;
                            mesh.position.x= 800,
                            mesh.position.y= 300,
                            mesh.position.z= 200,
                          /*  mesh.rotation.y+=90
                            mesh.rotation.x+=45*/
                            mesh.scale.set(0.5, 0.5, 0.5); //放大obj组对象
                            that.addObject(obj);//返回的组对象插入场景中
                        })
                    })
                },
              /*  initAgvCar(){
                    let that=this
                    var loader = new THREE.FBXLoader();//创建一个FBX加载器
                    loader.load("/models/jp.fbx", function(obj) {
                        // console.log(obj);//查看加载后返回的模型对象
                    that.addObject(obj) // 适当平移fbx模型位置
                      /!*   obj.translateY(-80); })*!/
                    })
                },*/



                /**
                 * 向场景中添加墙体
                 */
                initBuilding () {
                    let that=this
                    let buildingObjects = {
                        objects: [
                            {
                                objectName: '地面',
                                objectType: 'floor',
                                property: "floor",
                                length: 3400,
                                width: 1200,
                                height: 1,
                                position: {
                                    x: 0,
                                    y: 0,
                                    z: 0
                                },
                                style:{
                                    color: 0x96ABC8, //墙体颜色
                                }
                            },
                            {
                                objectName: 'level-01',
                                objectType: 'level',
                                length:500,
                                width:400,
                                height: 150,
                                position: {
                                        x: -500,
                                        y: 75,
                                        z: 100
                                },
                                style: {
                                    color: 0x96ABC8,
                                },
                            },
                            {
                                objectName: 'level-02',
                                objectType: 'level',
                                length:500,
                                width:400,
                                height: 150,
                                position: {
                                    x: -500,
                                    y: 225,
                                    z: 100
                                },
                                style: {
                                    color: 'rgb(250,155,10)',
                                },
                            },
                            {
                                objectName: 'level-03',
                                objectType: 'level',
                                length:500,
                                width:400,
                                height: 150,
                                position: {
                                    x: -500,
                                    y: 375,
                                    z: 100
                                },
                                style: {
                                    color: 'rgb(10,170,250)',
                                },
                            },
                            {
                                objectName: 'house',
                                objectType: 'level',
                                length:500,
                                width:400,
                                height: 700,
                                position: {
                                    x: 50,
                                    y: 350,
                                    z: 40
                                },
                                style: {
                                    color: 'rgb(170,202,243)',
                                },
                            },

                        ]
                    }
                    buildingObjects.objects.forEach(function (item,index) {
                        if(item.objectType == 'floor'){
                            let floor =  that.floor(item);
                            that.addObject(floor);
                        }else if(item.objectType == 'level'){
                            let level =  that.level(item);
                            that.addObject(level);

                        }
                    })
                },

                /**
                 * 初始化精灵图标题
                 */
                initTile(){
                 /*   var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    context.fillText("Hello World!",10,50);
                    context.font="50px Verdana";
                     var texture = new THREE.Texture(canvas);
                    texture.needsUpdate = true;
                    var spriteMaterial = new THREE.SpriteMaterial({ map: texture } );
                    var sprite = new THREE.Sprite( spriteMaterial );
                    sprite.center = new THREE.Vector2(0, 0);*/
                   /* sprite.scale.set(500, 500, 1)
                    this.addObject(sprite);
                    sprite.position.set(800, 300, 750);*/

                    let that=this
                    let tileObjects = {
                        objects: [
                            {
                                objectName: '办公楼',
                                objectType: 'sprite',
                                title: "办公楼",
                                position: {
                                    x: 50,
                                    y: 730,
                                    z: 100
                                },
                                style:{
                                    fontsize: 50,
                                    borderColor: {r:255, g:0, b:0, a:0},
                                    backgroundColor: {r:0, g:38, b:90, a:0}
                                   /* borderColor: {r:255, g:0, b:0, a:0.4},/!* 边框黑色 *!/
                                    backgroundColor: {r:255, g:0, b:5, a:1}/!* 背景颜色 *!/*/
                                }
                            },
                            {
                                objectName: '宿舍',
                                objectType: 'sprite',
                                title: "宿舍",
                                position: {
                                    x: -600,
                                    y: 500,
                                    z: 100
                                },
                                style:{
                                fontsize: 50,
                                    borderColor: {r:255, g:0, b:0, a:0},
                                    backgroundColor: {r:0, g:38, b:90, a:0}
                              /*  borderColor: {r:255, g:0, b:0, a:0.4},/!* 边框黑色 *!/
                                backgroundColor: {r:255, g:0, b:5, a:0.9}/!* 背景颜色 *!/*/
                                }
                            },
                        ]
                    }
                    tileObjects.objects.forEach(function (item, index) {
                        let spriteOrigin = that.title( item.title, item ,that);
                        spriteOrigin.center = new THREE.Vector2(0, 0);
                        that.addObject( spriteOrigin );
                        spriteOrigin.position.set(item.position.x, item.position.y, item.position.z);

                    });
                },

                /**
                 * 渲染灵动标签
                 */
                /* 创建字体精灵 */
                title(message, parameters,that) {
                    if ( parameters === undefined ) parameters = {};

                    var fontface = parameters.style.fontface ?
                        parameters.style.fontface : "Arial";

                    /* 字体大小 */
                    var fontsize = parameters.style.fontsize ?
                        parameters.style.fontsize : 18;


                    /* 边框厚度 */
                    var borderThickness =  parameters.style.borderThickness ?
                        parameters.style.borderThickness : 4;

                    /* 边框颜色 */
                    var borderColor = parameters.style.borderColor?
                        parameters.style.borderColor: { r:0, g:0, b:0, a:1.0 };

                    /* 背景颜色 */
                    var backgroundColor = parameters.style.backgroundColor?
                        parameters.style.backgroundColor: { r:255, g:255, b:255, a:1.0 };

                    /* 创建画布 */
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');

                    /* 字体加粗 */
                    context.font =  fontsize + "px " + fontface;

                    /* 获取文字的大小数据，高度取决于文字的大小 */
                    var metrics = context.measureText( message );
                    var textWidth = metrics.width;

                    /* 背景颜色 */
                    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                        + backgroundColor.b + "," + backgroundColor.a + ")";

                    /* 边框的颜色 */
                    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                        + borderColor.b + "," + borderColor.a + ")";
                    context.lineWidth = borderThickness;

                    /* 绘制圆角矩形 */
                    that.roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);

                    /* 字体颜色 */
                    context.fillStyle = "rgb(0,255,255)";
                    context.fillText( message, borderThickness, fontsize + borderThickness);

                    /* 画布内容用于纹理贴图 */
                    /*const texture = new THREE.TextureLoader().load( "spit.jpg" );*/
                    /* const texture = new THREE.TextureLoader().load( "11.jpg" );*/

                    var texture = new THREE.Texture(canvas);
                    texture.needsUpdate = true;

                    var spriteMaterial = new THREE.SpriteMaterial({ map: texture } );
                    var sprite = new THREE.Sprite( spriteMaterial );


                    /* 缩放比例 */
                    sprite.scale.set(300,200,1);

                    return sprite;
                },

                /* 绘制圆角矩形 */
               roundRect(ctx, x, y, w, h, r) {
                   ctx.beginPath();
                   ctx.moveTo(x+r, y);
                   ctx.lineTo(x+w-r, y);
                   ctx.quadraticCurveTo(x+w, y, x+w, y+r);
                   ctx.lineTo(x+w, y+h-r);
                   ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
                   ctx.lineTo(x+r, y+h);
                   ctx.quadraticCurveTo(x, y+h, x, y+h-r);
                   ctx.lineTo(x, y+r);
                   ctx.quadraticCurveTo(x, y, x+r, y);
                   ctx.closePath();
                   ctx.fill();
                   ctx.stroke();
               },


                /**
                 * 渲染地面
                 */
                floor(option){
                    let length = option.length || 1;
                    let width = option.width || 1;
                    let height = option.height || 1;

                    let Name = option.objectName;
                    let objectType = option.objectType;

                    let positionX = option.position.x || 0;
                    let positionY = option.position.y || 0;
                    let positionZ = option.position.z || 0;

                    let style=option.style.color||{color:0xFF0000};
                    /* let curmaterial=CommonFunction.createMaterial(this.width,this.height,this.style);*/
                 /*   var curmaterial = new THREE.MeshLambertMaterial({color:this.style.color});*/
                  /*  let cubeGeometry = new THREE.BoxGeometry(this.length, this.height, this.width);*/
                    /*let cube = new THREE.Mesh( cubeGeometry, curmaterial );*/
                    //物体
                    let cubeGeometry = new THREE.BoxGeometry(length, height, width);
                    //材质
                    let floorMat = new THREE.MeshStandardMaterial( {
                        roughness: 0.8,
                        color: style,
                        bumpScale: 0.0005
                    } );
                    const textureLoader = new THREE.TextureLoader();
                    textureLoader.load( "../assets/img/hardwood2_diffuse.jpg", function ( map ) {
                        map.wrapS = THREE.RepeatWrapping;
                        map.wrapT = THREE.RepeatWrapping;
                        map.anisotropy = 4;
                        map.repeat.set( 10, 24 );
                        map.encoding = THREE.sRGBEncoding;
                        floorMat.map = map;
                        floorMat.needsUpdate = true;
                    } );

                    const cube = new THREE.Mesh( cubeGeometry, floorMat );
                    cube.name=Name;
                    cube.objectType = objectType;
                    cube.position.x=positionX;
                    cube.position.y=positionY;
                    cube.position.z=positionZ;
                    return cube;
                },
                /**
                 * 渲染楼层
                 */
                level(option){
                    let length = option.length || 1;
                    let width = option.width || 1;
                    let height = option.height || 1;
                    let Name = option.objectName;
                    let objectType = option.objectType;
                    let positionX = option.position.x || 0;
                    let positionY = option.position.y || 0;
                    let positionZ = option.position.z || 0;

                    let style=option.style.color||{color:0xFF0000};
                    let cubeGeometry = new THREE.BoxGeometry( length, height, width );
                    let curmaterial = new THREE.MeshBasicMaterial( {color:style} );

                    let level = new THREE.Mesh( cubeGeometry, curmaterial );

                    level.name=Name;
                    level.objectType=objectType;
                    level.position.x=positionX;
                    level.position.y=positionY;
                    level.position.z=positionZ;
                        return level;

                },

                /**
                 * 添加天空盒
                 */
                addSkybox () {
                    let that=this
                    let urls = [that.posx, that.negx, that.posy, that.negy, that.posz, that.negz];
                    let skyboxCubemap = new THREE.CubeTextureLoader().load(urls);
                    skyboxCubemap.format = THREE.RGBFormat;

                    let skyboxShader = THREE.ShaderLib['cube'];
                    /*skyboxShader.uniforms['tCube'].value = skyboxCubemap;*/
                    let skyBox = new THREE.Mesh(
                        new THREE.BoxGeometry(10000, 10000, 10000),
                        new THREE.ShaderMaterial({
                            fragmentShader: skyboxShader.fragmentShader,
                            vertexShader: skyboxShader.vertexShader,
                            uniforms: skyboxShader.uniforms,
                            depthWrite: false,
                            side: THREE.BackSide
                        })
                    );
                    skyBox.name = 'StarSky';
                    this.addObject(skyBox);
                },

                /**
                 * 向场景中添加物体，并记录到
                 */
                addObject (object) {
                    if(this.scene){
                        this.scene.add(object);
                    }
                    this.objects.push(object);
                },

                /**
                 * 初始化灯光
                 */
                initLight (){
                    //首先添加个环境光
                    let ambient = new THREE.AmbientLight(0xffffff, 1); //AmbientLight,影响整个场景的光源
                    ambient.position.set(0, 0, 0);
                    this.addObject(ambient);
                    //添加平行光,平行光类似于太阳光
                    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);//模拟远处类似太阳的光源
                    directionalLight.position.set(0, 200, 0);
                    this.addObject(directionalLight);
                    //点光源
                /*    var pointLight1 = new THREE.PointLight(0x0033ff, 1000, 200);
                    pointLight1.position.set( -1500,50,300 );
                    pointLight1.castShadow = true;
                    /!*  pointLight1.target = target;*!/
                    this.addObject(pointLight1);
                    this.addObject(new THREE.PointLightHelper(pointLight1, 20, 0x33ff00));*/
                },

                /**
                 初始化相机控件OrbitControl
                 */
                initOrbitControl (){
                    this.orbitControl=new OrbitControls(this.camera,this.renderer.domElement);
                    this.orbitControl.enableDamping=true;
                    this.orbitControl.dampingFactor = 0.5;
                    // 视角最小距离
                    this.orbitControl.minDistance = 0;
                    // 视角最远距离
                    this.orbitControl.maxDistance = 2000;
                    // 最大角度
                    this.orbitControl.maxPolarAngle = Math.PI / 2.2;
                },

                /**
                 * 初始化性能控件Stats
                 */
                initStats () {
                    this.stats = new Stats();
                    this.stats.domElement.style.position = 'absolute';
                    this.stats.domElement.style.left = '0px';
                    this.stats.domElement.style.up = '0px';

                    document.body.appendChild(this.stats.domElement);
                },

                /**
                 * 初始化坐标系辅助控件
                 */
                initAxisHelper (){
                    let axes = new THREE.AxisHelper(1000);
                    this.addObject(axes);
                },

                /**
                 * 效果组合器Composer
                 */
                initComposer () {
                    let renderPass = new RenderPass(this.scene, this.camera);
                    this.composer = new EffectComposer(this.renderer);
                    this.composer.addPass(renderPass);
                    this.composer.addPass(this.outlinePass);
                },
                /**
                 * 显示或者隐藏性能控件
                 */
                changeStats () {
                    if (this.stats.domElement.style.display == 'none')
                        this.stats.domElement.style.display = 'block';
                    else
                        this.stats.domElement.style.display = 'none';
                },

                /**
                 * 初始化OutLinePass
                 */
                initoutLine () {
                    this.outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), this.scene, this.camera);
                    this.outlinePass.edgeStrength = 10;//包围线浓度
                    this.outlinePass.edgeGlow = 0.2;//边缘线范围
                    this.outlinePass.edgeThickness = 1;//边缘线浓度
                    this.outlinePass.pulsePeriod = 3;//包围线闪烁评率
                    this.outlinePass.visibleEdgeColor.set('#B31985');//包围线颜色
                    this.outlinePass.hiddenEdgeColor.set('#190a05');//被遮挡的边界线颜色
                },

                /**
                 * 初始化物体选中控件
                 */
                initObjectSelect () {
                    this.ObjectSelect(this.scene, this.camera,this.outlinePass);
                },

                /**
                 * 选中物体方法处理
                 */
                ObjectSelect(_scene, _camera,outlinePass) {
                    let that=this
                    let raycaster = new THREE.Raycaster();
                    let mouse = new THREE.Vector2();
                    let selectedObjects = [];
                    /****************************************************************************************************************************
                     * 外包围处理*
                     * @type {THREE.OutlinePass}
                     */

                    window.addEventListener( 'click', onMouseClick);
                     window.addEventListener('dblclick', onMouseDbClick);

                    function onMouseClick(event) {
                        that.clickstate=true
                        var x, y;
                        x = event.clientX;
                        y = event.clientY;
                        mouse.x = (x/ window.innerWidth) * 2 - 1;
                        mouse.y = -(y/ window.innerHeight) * 2 + 1;
                        raycaster.setFromCamera(mouse, _camera);
                        var intersects = raycaster.intersectObjects([_scene], true);

                         if(intersects.length == 0){
                             // 没有点击物体的操作
                             console.log("没有操作")
                             $("#label").attr("style", "display:none;");// 隐藏说明性标签
                             return;
                         }else{
                             //点击了3d物体
                             if(intersects[0].object.objectType == "level"){
                                 //点击需要显示数据3d模块
                                 if(intersects[0].object.name == "house"){
                                     console.log('点击了右边的楼')
                                 }else{
                                     console.log('点击了左边的楼层')
                                 }
                                 //选中物体数据清空
                                 selectedObjects.splice(0, selectedObjects.length)
                                 selectedObjects.push(intersects[0].object);
                                 outlinePass.selectedObjects = selectedObjects;//给选中的线条和物体加发光特效
                                 $("#label").attr("style", "display:block;");// 显示说明性标签
                                 $("#label").css({left: x, top: y - 40});//修改标签的位置
                                 let type=intersects[0].object.objectType;
                                 let name=intersects[0].object.name;
                                 let no=intersects[0].object.uuid;
                                 console.log(intersects[0].object)
                                 /* let dataShow=this.DataShow(type,no,name);*/
                                 let dataShow=that.showHint(type,no,name)
                                 $("#label").html(dataShow);// 显示模型信

                             }else{
                                 console.log("点击了地面")
                                 selectedObjects.pop();
                                 $("#label").attr("style", "display:none;");// 隐藏说明性标签
                                 if(intersects[0].object.name=="冰块"){
                                     selectedObjects.splice(0, selectedObjects.length)
                                     selectedObjects.push(intersects[0].object);
                                     outlinePass.selectedObjects = selectedObjects;//给选中的线条和物体加发光特效
                                 }
                             }
                         }
                    }

                     function onMouseDbClick(event) {
                         var x, y;
                         x = event.clientX;
                         y = event.clientY;
                         mouse.x = (x / window.innerWidth) * 2 - 1;
                         mouse.y = -(y / window.innerHeight) * 2 + 1;
                         raycaster.setFromCamera(mouse, _camera);
                         var intersects = raycaster.intersectObjects([_scene], true);
                         //判断双击物体，跳转地址
                         if(intersects.length == 0){
                             // 没有点击物体的操作
                             console.log("没有操作")
                             $("#label").attr("style", "display:none;");// 隐藏说明性标签
                             return;
                         }else{
                             //点击了3d物体
                             if(intersects[0].object.objectType == "level"){
                                 //点击需要显示数据3d模块
                                 if(intersects[0].object.name == "house"){
                                     console.log('双击了右边的楼')
                                        //路由跳转
                                     that.$router.push({
                                             path: `/house`,
                                         })
                                 }else{
                                     if(intersects[0].object.name == "level-02"){
                                         //路由跳转
                                         that.$router.push({
                                             path: `/level02`,
                                         })
                                     }else if(intersects[0].object.name == "level-01"){
                                         //路由跳转
                                         that.$router.push({
                                             path: `/level01`,
                                         })
                                     }else{
                                         that.$router.push({
                                             path: `/level03`,
                                         })
                                     }
                                     console.log('双击了左边的楼层')
                                     //路由跳转
                                     this.$router.push({
                                         path: `/house`,
                                     })
                                 }

                                 $("#label").attr("style", "display:none;");// 显示说明性标签

                             }else{
                                 console.log("双击了地面")
                                 selectedObjects.pop();
                                 $("#label").attr("style", "display:none;");// 隐藏说明性标签
                             }
                         }

                     }
                },


                /**
                 * 选中物体数据标签显示
                 */
                showHint (type,no,name) {
                    let htmltext='';
                    /*  let dataAnalyze = new DataAnalyze(this.no);*/
                    /*  if(this.type=='StoreSign'||this.type=='Store')*/
                    if(name=='house'){
                       /* let group= dataAnalyze.getGroup(this.no);*/
                        htmltext='<p>编码：'+ no +'</p>';
                        htmltext+='<p>名称：'+  name +'</p>';
                        htmltext+='<p>总耗能：888</p>';
                      /*  htmltext+='<p>总库存：'+dataAnalyze.getGroupTotalBin(this.no) +'</p>';
                        htmltext+='<p>已占库存：'+dataAnalyze.getGroupOccurpyBin(this.no) +'</p>';
                        htmltext+='<p>今日入库：'+dataAnalyze.getGroupTotalBin(this.no) +'</p>';
                        htmltext+='<p>今日出库：'+dataAnalyze.getGroupOccurpyBin(this.no) +'</p>';
                        htmltext+='<p1>提示：双击可查看详细信息</p1>';*/
                    }else{
                            /*  let store= dataAnalyze.getStore(this.no);*/
                            htmltext='<p>楼层编码：'+ no +'</p>';
                            htmltext+='<p>楼层名称：'+  name +'</p>';
                            htmltext+='<p>楼层总耗能：111</p>';
                            /*  htmltext+='<p>已占库存：'+dataAnalyze.getStoreOccurpyBin(this.no) +'</p>';
                              htmltext+='<p>今日入库：'+dataAnalyze.getStoreTotalBin(this.no) +'</p>';
                              htmltext+='<p>今日出库：'+dataAnalyze.getStoreOccurpyBin(this.no) +'</p>';
                              htmltext+='<p1>提示：双击可查看详细信息</p1>';*/
                    }
                    return htmltext;
                },


                /**
                 * 定时重复刷新
                 */
                animate () {
                    requestAnimationFrame(this.animate);
                    //this.initTile()
                   // this.stats.update();
                    if(this.scene&& this.camera){
                        this.renderer.render(this.scene, this.camera);
                    }
                    if(this.clickstate){
                        this.orbitControl.update();
                        this.composer.render();
                    }

                }
            },
            destroyed() {
                this.scene.remove()
        }
        };
</script>

<style scoped lang="less">
    #container {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    #label {
        position: absolute;
        padding: 10px;
        background: rgba(255, 255, 255, 0.6);
        line-height: 1;
        color:#000000;
        border-radius: 5px;
        display:none;
        line-height: 3vh;
        font-size: 0.9vw;
    }

</style>