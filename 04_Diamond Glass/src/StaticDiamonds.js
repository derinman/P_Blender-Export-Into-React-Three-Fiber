import { TextureLoader, WebGLRenderTarget, Object3D, LinearFilter } from 'three'
import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useLoader, useThree, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import styled from 'styled-components';

import BackfaceMaterial from './shader/Backface'
import RefractionMaterial from './shader/Refraction'
import diamondUrl from './model/diamond.glb'
import textureUrl from './imgs/backdrop.jpg'

import Controls from './Controls'

function staticDiamonds(){
    const { size, viewport, gl, scene, camera, clock } = useThree()
    
    const model = useRef()
    const gltf = useLoader(GLTFLoader, diamondUrl)

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

    
}

export default staticDiamonds;