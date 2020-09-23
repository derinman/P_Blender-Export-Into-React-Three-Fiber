import { WebGLRenderTarget, Object3D } from 'three'
import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useLoader, useThree, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import styled from 'styled-components';

import BackfaceMaterial from './shader/Backface'
import RefractionMaterial from './shader/Refraction'
import diamondUrl from './model/diamond.glb'

import Diamonds from './Diamonds'

import Controls from './Controls'
import Background from './Background'

const CanvasWrapper = styled.div`
  margin: 0px;
  position: absolute;
  height: 100vh;
  width: 100vw;
`;



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
