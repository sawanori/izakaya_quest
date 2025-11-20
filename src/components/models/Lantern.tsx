import { useGLTF } from '@react-three/drei'

export const Lantern = ({ position }: { position: [number, number, number] }) => {
    const { scene } = useGLTF('/models/redlight.glb')

    return (
        <group position={position}>
            <primitive object={scene.clone()} scale={2} rotation={[0, Math.PI * 1.5, 0]} />
            {/* Light Source */}
            <pointLight position={[0, -0.2, 0]} intensity={3} distance={5} color="#ffaa00" decay={2} />
        </group>
    )
}
