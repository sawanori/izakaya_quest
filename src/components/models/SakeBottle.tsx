import { useGLTF } from '@react-three/drei'

type BottleType = 'sake' | 'shouchuu'

export const SakeBottle = ({ position, type = 'sake' }: { position: [number, number, number], type?: BottleType }) => {
    const modelPath = type === 'sake' ? '/models/sake.glb' : '/models/shouchuu.glb'
    const { scene } = useGLTF(modelPath)

    return (
        <group position={position}>
            <primitive object={scene.clone()} scale={1} rotation={[0, -Math.PI / 2, 0]} />
        </group>
    )
}
