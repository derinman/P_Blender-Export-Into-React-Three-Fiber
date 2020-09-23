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

  const model = useRef()
  const gltf = useLoader(GLTFLoader, diamondUrl)
  //console.log('gltf: ',gltf);
  //console.log('gltf.__$[1].geometry: ',gltf.__$[1].geometry);

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

  // Create random position data
  const dummy = useMemo(() => new Object3D(), [])
  //console.log(dummy);

  const diamonds = useMemo(
    () =>[{position:[0,0,0], factor:1, direction:1, rotation:[0,0,0]}]
    ,[viewport.width]
  )
  //console.log('diamonds: ',diamonds);//[{position:,factor:,direction:,rotation:},{},{},...]

  useFrame(() => {
    
    diamonds.forEach((data, i) => {
      
      const t = clock.getElapsedTime()
      //console.log('t:', t)

      const { rotation, factor } = data
      dummy.rotation.set(rotation[0] + t * factor, rotation[1] + t * factor, rotation[2] + t * factor)//關掉看看
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
        colorManagement
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
