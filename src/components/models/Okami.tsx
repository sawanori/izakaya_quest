import { Sphere, Cylinder } from '@react-three/drei'

export const Okami = ({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Head */}
            <Sphere args={[0.35, 32, 32]} position={[0, 1.6, 0]}>
                <meshStandardMaterial color="#f5d0b0" />
            </Sphere>

            {/* Hair (Bun) */}
            <Sphere args={[0.15, 32, 32]} position={[0, 1.9, -0.1]}>
                <meshStandardMaterial color="#1a1a1a" />
            </Sphere>
            <Sphere args={[0.36, 32, 32]} position={[0, 1.65, -0.05]} scale={[1, 0.8, 1]}>
                <meshStandardMaterial color="#1a1a1a" />
            </Sphere>

            {/* Body (Kimono - Lower visible part) */}
            <Cylinder args={[0.4, 0.5, 0.6]} position={[0, 0.3, 0]}>
                <meshStandardMaterial color="#2a3a5a" />
            </Cylinder>

            {/* Kappogi (White Smock - Upper Body & Apron) */}
            <Cylinder args={[0.32, 0.45, 0.9]} position={[0, 1.0, 0]}>
                <meshStandardMaterial color="white" />
            </Cylinder>

            {/* Kappogi Ruffles/Shoulders */}
            <Sphere args={[0.33, 16, 16]} position={[0, 1.4, 0]} scale={[1, 0.3, 1]}>
                <meshStandardMaterial color="white" />
            </Sphere>

            {/* Arms (White Sleeves) */}
            <Cylinder args={[0.12, 0.15, 0.5]} position={[0.4, 1.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <meshStandardMaterial color="white" />
            </Cylinder>
            <Cylinder args={[0.12, 0.15, 0.5]} position={[-0.4, 1.1, 0]} rotation={[0, 0, Math.PI / 4]}>
                <meshStandardMaterial color="white" />
            </Cylinder>

            {/* Hands */}
            <Sphere args={[0.1, 16, 16]} position={[0.6, 0.8, 0]}>
                <meshStandardMaterial color="#f5d0b0" />
            </Sphere>
            <Sphere args={[0.1, 16, 16]} position={[-0.6, 0.8, 0]}>
                <meshStandardMaterial color="#f5d0b0" />
            </Sphere>
        </group>
    )
}
