import React, { Suspense} from 'react';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber'

import Controls from './Controls'//控制模型oribt
import Donuts from './Donut'


const CanvasWrapper = styled.div`
  margin: 0px;
  position: absolute;
  height: 100vh;
  width: 100vw;
`;

function App() {

  return (
    <CanvasWrapper>
        <Canvas>
          <Controls/>     
          <Suspense fallback={null}>
            <Donuts/>
          </Suspense>
        </Canvas>
    </CanvasWrapper>
  );
}

export default App;
