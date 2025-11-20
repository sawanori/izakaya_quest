import { Box } from '@react-three/drei'

export const Noren = ({ position }: { position: [number, number, number] }) => {
    return (
        <group position={position}>
            {/* Rod */}
            <Box args={[4, 0.1, 0.1]} position={[0, 2, 0]}>
                <meshStandardMaterial color="#5c3a21" />
            </Box>

            {/* Curtains */}
            <Box args={[0.8, 1.5, 0.05]} position={[-1.2, 1.2, 0]}>
                <meshStandardMaterial color="#000080" />
            </Box>
            <Box args={[0.8, 1.5, 0.05]} position={[-0.3, 1.2, 0]}>
                <meshStandardMaterial color="#000080" />
            </Box>
            <Box args={[0.8, 1.5, 0.05]} position={[0.6, 1.2, 0]}>
                <meshStandardMaterial color="#000080" />
            </Box>
            <Box args={[0.8, 1.5, 0.05]} position={[1.5, 1.2, 0]}>
                <meshStandardMaterial color="#000080" />
            </Box>

            {/* Text/Logo (Simplified as white squares for now) */}
            <Box args={[0.4, 0.4, 0.06]} position={[-1.2, 1.5, 0]}>
                <meshStandardMaterial color="white" />
            </Box>
            <Box args={[0.4, 0.4, 0.06]} position={[-0.3, 1.5, 0]}>
                <meshStandardMaterial color="white" />
            </Box>
            <Box args={[0.4, 0.4, 0.06]} position={[0.6, 1.5, 0]}>
                <meshStandardMaterial color="white" />
            </Box>
            <Box args={[0.4, 0.4, 0.06]} position={[1.5, 1.5, 0]}>
                <meshStandardMaterial color="white" />
            </Box>
        </group>
    )
}
