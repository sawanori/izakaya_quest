import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, RapierRigidBody, CuboidCollider } from '@react-three/rapier'
import { Box } from '@react-three/drei'
import { useStore } from '../../store'

export const Enemy = ({ position }: { position: [number, number, number] }) => {
    const rigidBody = useRef<RapierRigidBody>(null)
    const isHit = useRef(false)

    useFrame(() => {
        if (!rigidBody.current) return

        // Simple logic: If player is attacking and close, apply force
        // Ideally, use collision events, but for simplicity/robustness with current setup:
        const isAttacking = useStore.getState().isAttacking

        // Reset hit state if not attacking (allows multi-hit combo)
        if (!isAttacking) {
            isHit.current = false
        }
    })

    const handleCollision = (_: any) => {
        const isAttacking = useStore.getState().isAttacking

        // Check if colliding with player while attacking
        // Note: payload.other.rigidBodyObject.name should be checked if we named the player body
        // For now, we assume high velocity collision or state check

        if (isAttacking && !isHit.current) {
            if (rigidBody.current) {
                // Calculate direction from player (approximate or random away)
                // For pop effect, just shoot up and away
                const impulse = { x: (Math.random() - 0.5) * 20, y: 20, z: (Math.random() - 0.5) * 20 }
                rigidBody.current.applyImpulse(impulse, true)
                rigidBody.current.applyTorqueImpulse({ x: Math.random(), y: Math.random(), z: Math.random() }, true)
                isHit.current = true
            }
        }
    }

    return (
        <RigidBody
            ref={rigidBody}
            position={position}
            colliders={false}
            restitution={0.5}
            onCollisionEnter={handleCollision}
        >
            <CuboidCollider args={[0.4, 0.4, 0.4]} />
            <Box args={[0.8, 0.8, 0.8]}>
                <meshStandardMaterial color="#ff4444" roughness={0.2} />
            </Box>
            {/* Eyes */}
            <Box args={[0.2, 0.2, 0.1]} position={[0.2, 0.2, 0.4]}>
                <meshStandardMaterial color="white" />
            </Box>
            <Box args={[0.2, 0.2, 0.1]} position={[-0.2, 0.2, 0.4]}>
                <meshStandardMaterial color="white" />
            </Box>
        </RigidBody>
    )
}
