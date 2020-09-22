import React, {useRef} from 'react'

import * as THREE from 'three'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import helmet from './model/DamagedHelmet.glb'

function DamagedHelmet() {

    const group = useRef();
    const outerGroup = useRef();

    /*
    1.DRACOLoader是針對比較大的3D模型做壓縮的plugins，當我們需要
    考慮到客戶瀏覽的順暢度時，就需要加入這個plugins來幫助檔案的壓縮

    2.在Blender時要將mesh(Ctrl+A)位置歸零，才會以Blender的相對位置匯進來
    
    3.useLoader的第三個參數是optional

    4.Blender裡面的Cursor要注意位置
    */
    
    const gltf  = useLoader(GLTFLoader, helmet, loader => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('./model/model')
        loader.setDRACOLoader(dracoLoader)
    })
    
    const { nodes, materials } = useLoader(GLTFLoader, helmet, loader => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('./model/model')
        loader.setDRACOLoader(dracoLoader)
    })
    
    console.log( 'gltf: ',gltf)
    
    console.log( 'nodes:',nodes )
    console.log( 'materials:',materials )
    
    return (
            <group
                ref={outerGroup}
                dispose={null}
            >   
                <mesh
                    geometry={nodes['node_damagedHelmet_-6514'].geometry}
                    meterial={materials.Material_MR}
                />
            </group>
        );
}

export default DamagedHelmet;
