import React from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import Donut from './model/donut.glb'
import { Plane } from 'three'

function Donuts() {

    /*
    1.DRACOLoader是針對比較大的3D模型做壓縮的plugins，當我們需要
    考慮到客戶瀏覽的順暢度時，就需要加入這個plugins來幫助檔案的壓縮

    2.在Blender時要將mesh位置歸零，才會以Blender的相對位置匯進來
    
    3.useLoader的第三個參數是optional
    */
    
    const gltf  = useLoader(GLTFLoader, Donut, loader => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('./model/model')
        loader.setDRACOLoader(dracoLoader)
    })

    const { nodes, materials } = useLoader(GLTFLoader, Donut, loader => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('./model/model')
        loader.setDRACOLoader(dracoLoader)
    })
    
    console.log( 'gltf: ',gltf)
    
    console.log( 'nodes:',nodes )
    console.log( 'materials:',materials )

    //console.log( 'nodes.Scene: ', nodes.Scene)
    //console.log( 'nodes.Camera: ', nodes.Camera)
    //console.log( 'nodes.Light: ', nodes.Light)
    
    
    return (
            <group>
                <mesh
                    geometry={nodes.Donut.geometry}
                    material={materials.donut}
                />
                <mesh
                    geometry={nodes.Icing.geometry}
                    material={materials.icing}
                />
                <mesh
                    geometry={nodes.Plane.geometry}
                    material={materials.CounterTop}
                />
                <mesh
                    geometry={nodes.Plane002.geometry}
                    material={materials.Brick}
                />
            </group>
        );

}

export default Donuts;
