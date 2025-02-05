import { TextureLoader, LinearFilter } from 'three'

import React, { useMemo } from 'react'
import { useLoader, useThree } from 'react-three-fiber'
import textureUrl from './imgs/backdrop.jpg'

function Background() {
    const { viewport, aspect } = useThree()
    const texture = useLoader(TextureLoader, textureUrl)
    useMemo(() => (texture.minFilter = LinearFilter), [texture.minFilter])
    // Calculates a plane filling the screen similar to background-size: cover
    const adaptedHeight = 3800 * (aspect > 5000 / 3800 ? viewport.width / 5000 : viewport.height / 3800)
    const adaptedWidth = 5000 * (aspect > 5000 / 3800 ? viewport.width / 5000 : viewport.height / 3800)

    return (
        <mesh layers={1} scale={[adaptedWidth, adaptedHeight, 1]}>
            <planeBufferGeometry attach="geometry" />
            <meshBasicMaterial attach="material" map={texture} depthTest={false} />
        </mesh>
    )
}

export default Background;