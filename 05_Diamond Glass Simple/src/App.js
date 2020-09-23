import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'

import styled from 'styled-components';

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
