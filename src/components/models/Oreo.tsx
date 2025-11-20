import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'

export const Oreo = (props: GroupProps) => {
    const { scene } = useGLTF('/models/oreo.glb')

    return <primitive object={scene.clone()} {...props} />
}

useGLTF.preload('/models/oreo.glb')
