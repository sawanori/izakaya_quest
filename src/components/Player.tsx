import { useKeyboardControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useStore } from '../store'
import { Oreo } from './models/Oreo'

const SPEED = 5
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

export const Player = () => {
    const rigidBody = useRef<RapierRigidBody>(null)
    const modelGroup = useRef<THREE.Group>(null)
    const [, get] = useKeyboardControls()
    // Remove direct subscription to avoid re-renders on every joystick move
    // const joystickInput = useStore((state) => state.joystickInput)
    // const isJumping = useStore((state) => state.isJumping)

    // Camera state
    const cameraAngle = useRef(0)
    const isDragging = useRef(false)
    const previousTouchX = useRef(0)

    const { gl } = useThree()

    // Handle Drag for Rotation
    useEffect(() => {
        const canvas = gl.domElement

        const handlePointerDown = (e: PointerEvent) => {
            // Only start dragging if the target is the canvas (not UI elements)
            if (e.target === canvas) {
                isDragging.current = true
                previousTouchX.current = e.clientX
            }
        }
        const handlePointerUp = () => {
            isDragging.current = false
        }
        const handlePointerMove = (e: PointerEvent) => {
            if (isDragging.current) {
                const deltaX = e.clientX - previousTouchX.current
                cameraAngle.current -= deltaX * 0.005
                previousTouchX.current = e.clientX
            }
        }

        canvas.addEventListener('pointerdown', handlePointerDown)
        window.addEventListener('pointerup', handlePointerUp) // Keep window for up/move to handle dragging outside canvas
        window.addEventListener('pointermove', handlePointerMove)

        return () => {
            canvas.removeEventListener('pointerdown', handlePointerDown)
            window.removeEventListener('pointerup', handlePointerUp)
            window.removeEventListener('pointermove', handlePointerMove)
        }
    }, [gl])

    // Sync Keyboard Attack with Store
    const attackPressed = useKeyboardControls((state) => state.attack)

    useEffect(() => {
        useStore.getState().setIsAttacking(attackPressed)
    }, [attackPressed])

    useFrame((state, delta) => {
        if (!rigidBody.current) return

        const { forward, backward, left, right, jump, rotateLeft, rotateRight } = get()
        const joystickInput = useStore.getState().joystickInput
        const isJumping = useStore.getState().isJumping
        const isAttacking = useStore.getState().isAttacking

        // Update Camera Angle from Keys
        const rotationSpeed = 2 * delta
        if (rotateLeft) cameraAngle.current += rotationSpeed
        if (rotateRight) cameraAngle.current -= rotationSpeed

        // Calculate Camera Position based on Angle
        const distance = 10
        const height = 5
        const playerPos = rigidBody.current.translation()

        const cameraX = playerPos.x + distance * Math.sin(cameraAngle.current)
        const cameraZ = playerPos.z + distance * Math.cos(cameraAngle.current)

        const cameraPos = new THREE.Vector3(cameraX, playerPos.y + height, cameraZ)

        // Snap camera instantly to avoid interpolation jitter for now
        state.camera.position.copy(cameraPos)
        state.camera.lookAt(playerPos.x, playerPos.y, playerPos.z)

        // Calculate Movement Direction relative to Camera
        // We need the camera's forward direction projected onto the XZ plane
        // Since we control the angle manually, we can use cameraAngle.current directly

        // Combine Keyboard and Joystick input
        const forwardInput = (Number(backward) - Number(forward)) || -joystickInput.y
        const sideInput = (Number(left) - Number(right)) || -joystickInput.x

        frontVector.set(0, 0, forwardInput)
        sideVector.set(sideInput, 0, 0)

        // Create a rotation matrix from the camera angle
        const rotationEuler = new THREE.Euler(0, cameraAngle.current, 0)

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(rotationEuler)

        // Preserve vertical velocity (gravity)
        const currentVel = rigidBody.current.linvel()
        let nextY = currentVel.y

        if ((jump || isJumping) && Math.abs(currentVel.y) < 0.1) {
            nextY = 5 // Jump force
        }

        rigidBody.current.setLinvel({ x: direction.x, y: nextY, z: direction.z }, true)

        // Rotate character to face movement direction
        if (modelGroup.current) {
            if (isAttacking) {
                // Attack rotation (spin fast)
                modelGroup.current.rotation.y += 20 * delta
            } else if (forwardInput !== 0 || sideInput !== 0) {
                // Calculate the angle the character should face based on movement direction
                // Add PI to flip the direction 180 degrees so the front faces the movement direction
                const movementAngle = Math.atan2(direction.x, direction.z) + Math.PI
                // Smoothly rotate the character towards the movement direction
                modelGroup.current.rotation.y = THREE.MathUtils.lerp(
                    modelGroup.current.rotation.y,
                    movementAngle,
                    0.1 // Smoothing factor (0-1, lower = smoother)
                )
            }
        }
    })

    // const isMoving = ... (removed unused)



    return (
        <RigidBody ref={rigidBody} name="player" colliders={false} lockRotations friction={0}>
            {/* Collider for Oreo model - Adjusted for better fit */}
            <CapsuleCollider args={[0.2, 0.25]} position={[0, 0.5, 0]} />
            <group ref={modelGroup} position={[0, 0, 0]}>
                <Oreo />
            </group>
            <pointLight position={[0, 2, 0]} intensity={2} distance={5} color="white" />
        </RigidBody>
    )
}
