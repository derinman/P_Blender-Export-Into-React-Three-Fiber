import React from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import BasicGeo from './model/Basic Primitive.glb'

function BasicPrimitive() {

    /*
    1.DRACOLoader是針對比較大的3D模型做壓縮的plugins，當我們需要
    考慮到客戶瀏覽的順暢度時，就需要加入這個plugins來幫助檔案的壓縮

    2.在Blender時要將mesh位置歸零，才會以Blender的相對位置匯進來
    */
    const { nodes, materials } = useLoader(GLTFLoader, BasicGeo, loader => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('./model/model')
        loader.setDRACOLoader(dracoLoader)
    })
    
    console.log( 'node:',nodes )
    console.log( 'materials:',materials )
    
    return (
            <group>
                <mesh geometry={nodes.Circle.geometry} position={[0,0,0]}/>
                <mesh geometry={nodes.Cone.geometry} position={[0,0,0]}/>  
                <mesh geometry={nodes.Cube.geometry} position={[0,0,0]}/>
                <mesh geometry={nodes.Cylinder.geometry} position={[0,0,0]}/>
                <mesh geometry={nodes.Icosphere.geometry} position={[0,0,0]}/>
                <mesh geometry={nodes.Inman_Cube.geometry} position={[0,0,0]}/>
                <mesh geometry={nodes.Plane.geometry} position={[0,0,0]}/>
                <mesh geometry={nodes.Sphere.geometry} position={[0,0,0]}/>
                <mesh geometry={nodes.Torus.geometry} position={[0,0,0]}/>
            </group> 
                );

}

export default BasicPrimitive;
