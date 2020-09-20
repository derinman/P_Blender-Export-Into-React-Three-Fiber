import React, { useRef, useEffect } from 'react'
import { extend, useThree, useFrame } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

function Controls({ disable }) {
  const { camera, gl } = useThree()
  const ref = useRef()
  
  useFrame(() => ref.current.update())

  useEffect(() => {
    if (disable) {
      ref.current.addEventListener('start', () => disable(true))
      ref.current.addEventListener('end', () => disable(false))
    }
  }, [])

  return (
    <orbitControls
      ref={ref}
      target={[0, 0, 0]}
      enableDamping
      enableZoom={false}
      enablePan={false}
      dampingFactor={0.05}
      rotateSpeed={0.9}
      // minPolarAngle={Math.PI / 1.9}
      // maxPolarAngle={Math.PI / 1.9}
      minPolarAngle={0}
      maxPolarAngle={3}
      args={[camera, gl.domElement]}
    />
  )
}

export default Controls;