import React, {useRef} from 'react'

import * as THREE from 'three'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import Donut from './model/gfc-hq.glb'

function FlyMachine() {

    const group = useRef();
    const outerGroup = useRef();

    /*
    1.DRACOLoader是針對比較大的3D模型做壓縮的plugins，當我們需要
    考慮到客戶瀏覽的順暢度時，就需要加入這個plugins來幫助檔案的壓縮

    2.在Blender時要將mesh(Ctrl+A)位置歸零，才會以Blender的相對位置匯進來
    
    3.useLoader的第三個參數是optional

    4.Blender裡面的Cursor要注意位置
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
    
    return (
            <group
                ref={outerGroup}
                dispose={null}
            >   
                <mesh 
                    geometry={nodes.casing.geometry}
                    material={materials['gfc main']}
                /> 
                {/* ARROWS */}
                <mesh
                    geometry={nodes.arrow1.geometry}
                    material={materials['gfc main']}
                />
                <mesh
                    geometry={nodes.arrow2.geometry}
                    material={materials['gfc main']}
                />
                <mesh
                    geometry={nodes.arrow3.geometry}
                    material={materials['gfc main']}
                />
                {/* BUTTONS */}
                <mesh 
                    geometry={nodes.button1.geometry}
                    material={materials['gfc main']} 
                />
                <mesh 
                    geometry={nodes.button2.geometry}
                    material={materials['gfc main']} 
                />
                <mesh 
                    geometry={nodes.button3.geometry}
                    material={materials['gfc main']} 
                />
                {/* LIGHTS 按鈕的綠燈 */}
                <mesh 
                    geometry={nodes.light1.geometry}
                    material={nodes.light1.material} 
                >
                    <meshPhongMaterial 
                        attach = "material"
                        color = {new THREE.Color('#010201')}
                        emissive = {new THREE.Color('#00ff00')}
                        emissiveIntensity = {50}
                    />
                </mesh>
                <mesh 
                    geometry={nodes.light2.geometry}
                    material={nodes.light2.material} 
                >
                    <meshPhongMaterial 
                        attach = "material"
                        color = {new THREE.Color('#010201')}
                        emissive = {new THREE.Color('#00ff00')}
                        emissiveIntensity = {50}
                    />
                </mesh>
                <mesh 
                    geometry={nodes.light3.geometry}
                    material={nodes.light3.material} 
                >
                    <meshPhongMaterial 
                        attach = "material"
                        color = {new THREE.Color('#010201')}
                        emissive = {new THREE.Color('#00ff00')}
                        emissiveIntensity = {50}
                    />
                </mesh>
                {/* SPHERE */}
                <mesh
                    geometry={nodes.sphere.geometry} 
                    material={materials['gfc main']} 
                />
                {/* PROPELLER (螺旋槳忽略)*/}
                <mesh material={materials['gfc main']} geometry={nodes.propeller_0.geometry} />
            </group>
        );
}

export default FlyMachine;
