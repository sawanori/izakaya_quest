import { Cylinder, Sphere } from '@react-three/drei'

export const Lantern = ({ position }: { position: [number, number, number] }) => {
    return (
        <group position={position}>
            {/* String/Hook */}
            <Cylinder args={[0.02, 0.02, 1]} position={[0, 1, 0]}>
                <meshStandardMaterial color="#333" />
            </Cylinder>

            {/* Main Body (Paper) */}
            <Sphere args={[0.6, 32, 32]} scale={[1, 1.5, 1]} position={[0, -0.2, 0]}>
                <meshStandardMaterial
                    color="#ff4444"
                    emissive="#ff2222"
                    emissiveIntensity={0.8}
                    roughness={0.8}
                    transparent
                    opacity={0.9}
                />
            </Sphere>

            {/* Top Cap */}
            <Cylinder args={[0.4, 0.5, 0.1]} position={[0, 0.5, 0]}>
                <meshStandardMaterial color="#1a1a1a" />
            </Cylinder>

            {/* Bottom Cap */}
            <Cylinder args={[0.4, 0.3, 0.1]} position={[0, -0.9, 0]}>
                <meshStandardMaterial color="#1a1a1a" />
            </Cylinder>

            {/* Ribs (Black lines) */}
            {[0.2, 0, -0.2, -0.4, -0.6].map((y, i) => (
                <Cylinder key={i} args={[0.61, 0.61, 0.02, 32]} position={[0, y, 0]} scale={[1, 1, 1]}>
                    <meshStandardMaterial color="#000" />
                </Cylinder>
            ))}

            {/* Light Source */}
            <pointLight position={[0, -0.2, 0]} intensity={3} distance={5} color="#ffaa00" decay={2} />
        </group>
    )
}
