import React from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

function Cube() {

    /*
    DRACOLoader是針對比較大的3D模型做壓縮的plugins，當我們需要
    考慮到客戶瀏覽的順暢度時，就需要加入這個plugins來幫助檔案的壓縮
    */
    const { nodes, materials } = useLoader(GLTFLoader, 'Basic Primitive.glb', loader => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('model/')
        loader.setDRACOLoader(dracoLoader)
    })
    
    console.log( 'node:',nodes )
    console.log( 'materials:',materials )
    
    return (
            <mesh geometry={nodes.Cube.geometry} position={[0,0,0]}>
                <meshStandardMaterial attach="material" color="lightblue" />
            </mesh>
                );

}

export default Cube;
