import React, { Suspense} from 'react';
import styled from 'styled-components';

import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'

import Controls from './Controls'//控制模型oribt
import FlyMachine from './FlyMachine'


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
          concurrent
          noEvents={false}
          //pixelRatio={window.devicePixelRatio}
          camera={{ position: [6, 2, 0.1], fov: 69 }}
          gl={{ antialias: true }}
          onCreated={({ gl, scene }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.outputEncoding = THREE.sRGBEncoding
            //scene.background = new THREE.Color('#373740')
          }}>
          
          <ambientLight intensity={0.33}/>
        >
          <Controls/>     
          <Suspense fallback={null}>
            <FlyMachine/>
          </Suspense>
        </Canvas>
    </CanvasWrapper>
  );
}

export default App;
