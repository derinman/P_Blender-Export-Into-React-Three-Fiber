import React, { Suspense} from 'react';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber'

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

  return (
    <CanvasWrapper>
        <Canvas
          camera={{ position: [0.15, 0.15, 0.15], fov: 69 }}
        >
        
        <ambientLight intensity={0.7}/>
          <Controls/>     
          <Suspense fallback={null}>
            <Environment/>
            <Donuts/>
          </Suspense>
        </Canvas>
    </CanvasWrapper>
  );
}

export default App;
