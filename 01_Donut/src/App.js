import React, { useRef,Suspense} from 'react';
import styled from 'styled-components';
import { useThree, useFrame, Canvas } from 'react-three-fiber'

import * as THREE from "three";

import { Stars, Sky } from 'drei'
import { softShadows } from "drei"
import { number } from '@storybook/addon-knobs'

import Controls from './Controls'//控制模型oribt
import Donuts from './Donut'
import Environment from './Environment'

const CanvasWrapper = styled.div`
  margin: 0px;
  position: absolute;
  height: 100vh;
  width: 100vw;
`;

function App() {
  
  softShadows()

  return (
    <CanvasWrapper>
        <Canvas
          camera={{ position: [0.15, 0.15, 0.15], fov: 69 }}
          colorManagement
          pixelRatio={window.devicePixelRatio}
          onCreated={({ gl }) => {
            //gl.shadowMap.enabled = true;
            //gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
        <Sky
          distance={3000} 
          turbidity={number('Turbidity', 8, { range: true, max: 10, step: 0.1 })} 
          rayleigh={number('Rayleigh', 0.5, { range: true, max: 10, step: 0.1 })} 
          mieCoefficient={number('mieCoefficient', 0.01, { range: true, max: 0.1, step: 0.001 })} 
          mieDirectionalG={number('mieDirectionalG', 0.5, { range: true, max: 1., step: 0.01 })} 
          sunPosition={[Math.PI, 10, 10]}
        />
        {/*<Stars/>*/}
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={0.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} color="red" intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={0.5} />
        <ambientLight intensity={0.1}/>
          <Controls/>     
          <Suspense fallback={null}>
            <Environment />
            <Donuts/>
          </Suspense>
        </Canvas>
    </CanvasWrapper>
  );
}

export default App;
