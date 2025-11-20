import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export const TableSet = ({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) => {
    const { scene } = useGLTF('/models/table.glb')

    return (
        <group position={position} rotation={rotation}>
            <RigidBody type="fixed" colliders="hull">
                <primitive object={scene.clone()} scale={2} />
            </RigidBody>
        </group>
    )
}
