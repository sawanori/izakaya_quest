import { Cylinder, Sphere } from '@react-three/drei'

export const SakeBottle = ({ position, color = "#4a90e2" }: { position: [number, number, number], color?: string }) => {
    return (
        <group position={position}>
            {/* Body */}
            <Cylinder args={[0.15, 0.15, 0.6]} position={[0, 0.3, 0]}>
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
            </Cylinder>
            {/* Shoulder */}
            <Sphere args={[0.15, 16, 16]} position={[0, 0.6, 0]} scale={[1, 0.5, 1]}>
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
            </Sphere>
            {/* Neck */}
            <Cylinder args={[0.05, 0.05, 0.2]} position={[0, 0.75, 0]}>
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
            </Cylinder>
            {/* Cap */}
            <Cylinder args={[0.06, 0.06, 0.05]} position={[0, 0.85, 0]}>
                <meshStandardMaterial color="#8b4513" />
            </Cylinder>
            {/* Label */}
            <Cylinder args={[0.155, 0.155, 0.3]} position={[0, 0.3, 0]}>
                <meshStandardMaterial color="white" />
            </Cylinder>
        </group>
    )
}
