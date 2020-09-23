import { WebGLRenderTarget, Object3D } from 'three'
import React, { useMemo, useRef } from 'react'
import { useLoader, useThree, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import BackfaceMaterial from './shader/Backface'
import RefractionMaterial from './shader/Refraction'
import diamondUrl from './model/diamond.glb'

function Diamonds() {
    const { size, gl, scene, camera, clock } = useThree()

    const modelRef = useRef()
    //console.log('model: ',model)

    //const gltf = useLoader(GLTFLoader, diamondUrl)
    //console.log('gltf: ',gltf);

    const {nodes}= useLoader(GLTFLoader, diamondUrl)
    console.log('nodes: ',nodes)
    console.log(nodes.Cylinder.position)

    // Create random position data
    const dummy = useMemo(() => new Object3D(), [])
    //console.log(dummy);

    // Create Fbo and materials
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

    

    useFrame(() => {        
        const t = clock.getElapsedTime()
        //dummy.scale.set(1,1,1)
        dummy.scale.set(3,3,3)
        dummy.position.set(nodes.Cylinder.position.x,nodes.Cylinder.position.y,nodes.Cylinder.position.z)
        dummy.rotation.set(t, t , t)
        dummy.updateMatrix()
        //console.log(dummy)

        //結合dummy跟diamonds
        modelRef.current.setMatrixAt(0, dummy.matrix)
        modelRef.current.instanceMatrix.needsUpdate = true//關掉看看，畫面會靜止

        //ren背後那張jpg到 fbo
        // Render env to fbo
        gl.autoClear = false
        camera.layers.set(1)
        gl.setRenderTarget(envFbo)
        gl.render(scene, camera)

        //ren鑽石到fbo
        // Render cube backfaces to fbo
        camera.layers.set(0)
        modelRef.current.material = backfaceMaterial
        gl.setRenderTarget(backfaceFbo)
        gl.clearDepth()
        gl.render(scene, camera)

        // Render env to screen
        camera.layers.set(1) //調成0看看!
        gl.setRenderTarget(null)
        gl.render(scene, camera)
        gl.clearDepth()

        // Render cube with refraction material to screen
        camera.layers.set(0)
        modelRef.current.material = refractionMaterial //試著關掉這一行看看!
        gl.render(scene, camera)

    }, 1)

    return (
        //instaceMesh的三個args是geometry material count
        <instancedMesh ref={modelRef} args={[null, null, 1]}>
            <bufferGeometry dispose={false} attach="geometry" {...nodes.Cylinder.geometry} />
            <meshBasicMaterial attach="material" />
        </instancedMesh>
    )
}

export default Diamonds