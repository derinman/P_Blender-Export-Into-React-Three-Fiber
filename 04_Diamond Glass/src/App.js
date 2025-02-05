import { WebGLRenderTarget, Object3D } from 'three'
import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useLoader, useThree, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import styled from 'styled-components';

import BackfaceMaterial from './shader/Backface'
import RefractionMaterial from './shader/Refraction'
import diamondUrl from './model/diamond.glb'

import Controls from './Controls'
import Background from './Background'

console.log(diamondUrl)

const CanvasWrapper = styled.div`
  margin: 0px;
  position: absolute;
  height: 100vh;
  width: 100vw;
`;

function Diamonds() {
  const { size, viewport, gl, scene, camera, clock } = useThree()
  //console.log("size:", size);
  //console.log("viewport:", viewport);
  //console.log("gl:", gl);
  //console.log("scene:", scene);
  //console.log("camera:", camera);
  //console.log("clock:", clock);

  const model = useRef()
  const gltf = useLoader(GLTFLoader, diamondUrl)
  //console.log('gltf: ',gltf);
  //console.log('gltf.__$[1].geometry: ',gltf.__$[1].geometry);

  //Fbo: FrameBuffer Object
  //FrameBuffer就像是一個webgl繪製的容器一樣，平時我們默認繪製都是將3d場景繪製在了默認的窗口中輸出
  //（此時綁定framebuffer為null），而當我們指定一個FrameBuffer為當前繪製容器，再繪製時則會將對象
  //繪製於指定的FrameBuffer中，而不是直接繪製到屏幕。

  // Create Fbo and materials
  const [envFbo, backfaceFbo, backfaceMaterial, refractionMaterial] = useMemo(() => {
    const envFbo = new WebGLRenderTarget(size.width, size.height)
    const backfaceFbo = new WebGLRenderTarget(size.width, size.height)
    const backfaceMaterial = new BackfaceMaterial()
    const refractionMaterial = new RefractionMaterial({
      envMap: envFbo.texture,
      backfaceMap: backfaceFbo.texture,
      resolution: [size.width, size.height],
    })
    return [envFbo, backfaceFbo, backfaceMaterial, refractionMaterial]
  }, [size])
  //console.log('envFbo: ', envFbo);
  //console.log('backfaceFbo: ', backfaceFbo);
  //console.log('backfaceMaterial:', backfaceMaterial)
  //console.log('refractionMaterial:', refractionMaterial)

  // Create random position data
  const dummy = useMemo(() => new Object3D(), [])
  //console.log(dummy);

  const diamonds = useMemo(
    () =>
      new Array(80).fill().map((_, i) => ({
        position: [
          i < 5 ? 0 : viewport.width / 2 - Math.random() * viewport.width,
          40 - Math.random() * 40,
          i < 5 ? 26 : 10 - Math.random() * 20,
        ],
        factor: 0.1 + Math.random(),
        direction: Math.random() < 0.5 ? -1 : 1,
        rotation: [
          Math.sin(Math.random()) * Math.PI,
          Math.sin(Math.random()) * Math.PI,
          Math.cos(Math.random()) * Math.PI,
        ],
      })),
    [viewport.width]
  )
  console.log('diamonds: ',diamonds);//[{position:,factor:,direction:,rotation:},{},{},...]

  // Render-loop
  useFrame(() => {
    // Update instanced diamonds
    diamonds.forEach((data, i) => {
      
      const t = clock.getElapsedTime()
      //console.log('t:', t)
      
      {/* Y軸(垂直) */}
      data.position[1] -= (data.factor / 5) * data.direction
      if (data.direction === 1 ? data.position[1] < -50 : data.position[1] > 50)
        data.position = [
          i < 5 ? 0 : viewport.width / 2 - Math.random() * viewport.width,
          50 * data.direction,
          data.position[2],
        ]
      
      const { position, rotation, factor } = data
      dummy.position.set(position[0], position[1], position[2])//關掉看看
      dummy.rotation.set(rotation[0] + t * factor, rotation[1] + t * factor, rotation[2] + t * factor)//關掉看看
      dummy.scale.set(1 + factor, 1 + factor, 1 + factor)//關掉看看
      dummy.updateMatrix()
      //console.log(dummy)

      //結合dummy跟diamonds
      model.current.setMatrixAt(i, dummy.matrix)
    })
    model.current.instanceMatrix.needsUpdate = true//關掉看看，畫面會靜止

    //ren背後那張jpg到 fbo
    // Render env to fbo
    gl.autoClear = false
    camera.layers.set(1)
    gl.setRenderTarget(envFbo)
    gl.render(scene, camera)

    //ren鑽石到fbo
    // Render cube backfaces to fbo
    camera.layers.set(0)
    model.current.material = backfaceMaterial
    gl.setRenderTarget(backfaceFbo)
    gl.clearDepth()
    gl.render(scene, camera)

    // Render env to screen
    camera.layers.set(1) //調成0看看!
    gl.setRenderTarget(null)
    gl.render(scene, camera)
    gl.clearDepth()

    // Render cube with refraction material to screen
    camera.layers.set(0)
    model.current.material = refractionMaterial //試著關掉這一行看看!
    gl.render(scene, camera)

  }, 1)

  return (
    //instaceMesh的三個args是geometry material count
    //attach可以綁定其parent的args
    <instancedMesh ref={model} args={[null, null, diamonds.length]}>
      <bufferGeometry dispose={false} attach="geometry" {...gltf.__$[1].geometry} />
      <meshBasicMaterial attach="material" />
    </instancedMesh>
  )
}

function App() {
  return (
    <CanvasWrapper>
      <Canvas 
        //colorManagement
        camera={{ fov: 50, position: [0, 0, 30] }}
      >
        <Controls/>
        <Suspense fallback={null}>
          <Background />
          <Diamonds />
        </Suspense>
      </Canvas>
    </CanvasWrapper>
  )
}

export default App;
