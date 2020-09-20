import React, {Suspense} from 'react';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber'
import * as THREE from 'three'

import Controls from './Controls'//控制模型oribt
import Cube from './Cube'

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
          camera={{ position: [0, 0, 4], fov: 69 }}
          onCreated={({ gl, scene }) => {
            scene.background = new THREE.Color('#666')
          }}
        >
          <Controls/>
          <ambientLight intensity={500} color={'yellow'} />
          <spotLight intensity={10} position={[300, 300, 400]} />
          <Suspense fallback={null}>
            <Cube />
          </Suspense>
        </Canvas>
    </CanvasWrapper>
  );
}

export default App;
