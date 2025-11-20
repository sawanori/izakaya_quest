import { Sphere, Box, Cylinder } from '@react-three/drei'
import { useRef } from 'react'
import { Group } from 'three'

export const Sheep = () => {
    const group = useRef<Group>(null)

    return (
        <group ref={group} dispose={null}>
            {/* Wooly Body */}
            <Sphere args={[0.4, 16, 16]} position={[0, 0.4, 0]} scale={[1, 0.8, 1.2]}>
                <meshStandardMaterial color="#ffffff" roughness={0.9} />
            </Sphere>
            <Sphere args={[0.25, 16, 16]} position={[0.2, 0.5, 0.3]}>
                <meshStandardMaterial color="#ffffff" roughness={0.9} />
            </Sphere>
            <Sphere args={[0.25, 16, 16]} position={[-0.2, 0.5, 0.3]}>
                <meshStandardMaterial color="#ffffff" roughness={0.9} />
            </Sphere>
            <Sphere args={[0.25, 16, 16]} position={[0.2, 0.5, -0.3]}>
                <meshStandardMaterial color="#ffffff" roughness={0.9} />
            </Sphere>
            <Sphere args={[0.25, 16, 16]} position={[-0.2, 0.5, -0.3]}>
                <meshStandardMaterial color="#ffffff" roughness={0.9} />
            </Sphere>

            {/* Head */}
            <Box args={[0.3, 0.3, 0.35]} position={[0, 0.6, 0.5]}>
                <meshStandardMaterial color="#1a1a1a" />
            </Box>

            {/* Eyes */}
            <Sphere args={[0.03, 8, 8]} position={[0.08, 0.65, 0.65]}>
                <meshStandardMaterial color="white" />
            </Sphere>
            <Sphere args={[0.03, 8, 8]} position={[-0.08, 0.65, 0.65]}>
                <meshStandardMaterial color="white" />
            </Sphere>
            <Sphere args={[0.01, 8, 8]} position={[0.08, 0.65, 0.67]}>
                <meshStandardMaterial color="black" />
            </Sphere>
            <Sphere args={[0.01, 8, 8]} position={[-0.08, 0.65, 0.67]}>
                <meshStandardMaterial color="black" />
            </Sphere>

            {/* Legs */}
            <Cylinder args={[0.06, 0.04, 0.4]} position={[0.2, 0.2, 0.3]}>
                <meshStandardMaterial color="#1a1a1a" />
            </Cylinder>
            <Cylinder args={[0.06, 0.04, 0.4]} position={[-0.2, 0.2, 0.3]}>
                <meshStandardMaterial color="#1a1a1a" />
            </Cylinder>
            <Cylinder args={[0.06, 0.04, 0.4]} position={[0.2, 0.2, -0.3]}>
                <meshStandardMaterial color="#1a1a1a" />
            </Cylinder>
            <Cylinder args={[0.06, 0.04, 0.4]} position={[-0.2, 0.2, -0.3]}>
                <meshStandardMaterial color="#1a1a1a" />
            </Cylinder>
        </group>
    )
}
