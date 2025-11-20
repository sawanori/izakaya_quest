import { Box, Cylinder } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export const TableSet = ({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Table */}
            <RigidBody type="fixed" colliders="hull">
                {/* Table Top */}
                <Box args={[2, 0.1, 2]} position={[0, 1, 0]}>
                    <meshStandardMaterial color="#5c3a21" roughness={0.6} />
                </Box>
                {/* Legs */}
                <Cylinder args={[0.1, 0.1, 1]} position={[-0.8, 0.5, -0.8]}>
                    <meshStandardMaterial color="#3d2616" />
                </Cylinder>
                <Cylinder args={[0.1, 0.1, 1]} position={[0.8, 0.5, -0.8]}>
                    <meshStandardMaterial color="#3d2616" />
                </Cylinder>
                <Cylinder args={[0.1, 0.1, 1]} position={[-0.8, 0.5, 0.8]}>
                    <meshStandardMaterial color="#3d2616" />
                </Cylinder>
                <Cylinder args={[0.1, 0.1, 1]} position={[0.8, 0.5, 0.8]}>
                    <meshStandardMaterial color="#3d2616" />
                </Cylinder>
            </RigidBody>

            {/* Chairs (Simple Cushions/Zabuton style or low stools) */}
            <RigidBody type="fixed" colliders="hull">
                <Cylinder args={[0.4, 0.4, 0.4]} position={[0, 0.2, 1.5]}>
                    <meshStandardMaterial color="#8b4513" />
                </Cylinder>
            </RigidBody>
            <RigidBody type="fixed" colliders="hull">
                <Cylinder args={[0.4, 0.4, 0.4]} position={[0, 0.2, -1.5]}>
                    <meshStandardMaterial color="#8b4513" />
                </Cylinder>
            </RigidBody>
        </group>
    )
}
