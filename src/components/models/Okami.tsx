import { useGLTF } from '@react-three/drei'

export const Okami = ({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) => {
    const { scene } = useGLTF('/models/okami.glb')

    return (
        <group position={position} rotation={rotation}>
            <primitive object={scene.clone()} scale={2} />
        </group>
    )
}
