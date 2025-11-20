import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useStore } from '../store'
import { SECTIONS } from '../constants'
import { Text, useTexture } from '@react-three/drei'
import { Lantern } from './models/Lantern'
import { TableSet } from './models/TableSet'
import { Noren } from './models/Noren'
import { SakeBottle } from './models/SakeBottle'
import { Enemy } from './models/Enemy'
import * as THREE from 'three'

const Zone = ({ position, size, id, label }: { position: [number, number, number], size: [number, number, number], id: string, label: string }) => {
    const setActiveZone = useStore((state) => state.setActiveZone)

    return (
        <group position={position}>
            {/* Visual Marker */}
            <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[size[0] * 0.5, size[0] * 0.6, 32]} />
                <meshBasicMaterial color="white" opacity={0.3} transparent />
            </mesh>
            <Text position={[0, 2, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
                {label}
            </Text>

            {/* Sensor */}
            <RigidBody
                type="fixed"
                sensor
                onIntersectionEnter={(payload) => {
                    if (payload.other.rigidBodyObject?.name === 'player') {
                        setActiveZone(id as any)
                    }
                }}
                onIntersectionExit={(payload) => {
                    if (payload.other.rigidBodyObject?.name === 'player') {
                        setActiveZone(null)
                    }
                }}
            >
                <CuboidCollider args={[size[0], size[1], size[2]]} />
            </RigidBody>
        </group>
    )
}

export const World = () => {
    // Load wood floor textures
    const [colorMap, normalMap, roughnessMap, heightMap] = useTexture([
        '/models/wood_texture_calm_1024.png',
        '/models/wood_texture_calm_normal_1024.png',
        '/models/wood_texture_calm_roughness_1024.png',
        '/models/wood_texture_calm_height_1024.png',
    ])

    // Configure texture repeating for proper tiling
    colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping
    roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping
    heightMap.wrapS = heightMap.wrapT = THREE.RepeatWrapping

    const repeatCount = 10
    colorMap.repeat.set(repeatCount, repeatCount)
    normalMap.repeat.set(repeatCount, repeatCount)
    roughnessMap.repeat.set(repeatCount, repeatCount)
    heightMap.repeat.set(repeatCount, repeatCount)

    // Set proper color space for non-color data
    normalMap.colorSpace = THREE.NoColorSpace
    roughnessMap.colorSpace = THREE.NoColorSpace
    heightMap.colorSpace = THREE.NoColorSpace

    return (
        <>
            {/* Floor */}
            <RigidBody type="fixed" friction={1}>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                    <planeGeometry args={[50, 50, 100, 100]} />
                    <meshStandardMaterial
                        map={colorMap}
                        normalMap={normalMap}
                        normalScale={new THREE.Vector2(1, 1)}
                        roughnessMap={roughnessMap}
                        displacementMap={heightMap}
                        displacementScale={0.05}
                    />
                </mesh>
            </RigidBody>

            {/* Walls */}
            <RigidBody type="fixed">
                <mesh position={[0, 5, -25]}>
                    <boxGeometry args={[50, 10, 1]} />
                    <meshStandardMaterial color="#2a2a2a" />
                </mesh>
                <mesh position={[0, 5, 25]}>
                    <boxGeometry args={[50, 10, 1]} />
                    <meshStandardMaterial color="#2a2a2a" />
                </mesh>
                <mesh position={[-25, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[50, 10, 1]} />
                    <meshStandardMaterial color="#2a2a2a" />
                </mesh>
                <mesh position={[25, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[50, 10, 1]} />
                    <meshStandardMaterial color="#2a2a2a" />
                </mesh>
            </RigidBody>

            {/* Zones */}
            <Zone position={[0, 0, -5]} size={[2, 2, 2]} id="philosophy" label={SECTIONS.find(s => s.id === 'philosophy')?.title || ''} />
            <Zone position={[-10, 0, 0]} size={[2, 2, 2]} id="menu" label={SECTIONS.find(s => s.id === 'menu')?.title || ''} />
            <Zone position={[10, 0, 0]} size={[2, 2, 2]} id="course" label={SECTIONS.find(s => s.id === 'course')?.title || ''} />
            <Zone position={[-10, 0, 10]} size={[2, 2, 2]} id="drink" label={SECTIONS.find(s => s.id === 'drink')?.title || ''} />
            <Zone position={[10, 0, 10]} size={[2, 2, 2]} id="seats" label={SECTIONS.find(s => s.id === 'seats')?.title || ''} />
            <Zone position={[0, 0, 15]} size={[2, 2, 2]} id="location" label={SECTIONS.find(s => s.id === 'location')?.title || ''} />



            {/* Decor - Counter Area */}
            <RigidBody type="fixed">
                {/* Main Counter */}
                <mesh position={[-10, 0.5, -10]}>
                    <boxGeometry args={[15, 1, 4]} />
                    <meshStandardMaterial color="#5c3a21" />
                </mesh>
                {/* Kitchen Back Wall / Shelf */}
                <mesh position={[-15, 2.5, -15]}>
                    <boxGeometry args={[1, 5, 10]} />
                    <meshStandardMaterial color="#3d2616" />
                </mesh>
            </RigidBody>


            {/* Decor - Noren (Entrance) */}
            <Noren position={[0, 2.5, 20]} />

            {/* Decor - Sake Bottles */}
            <SakeBottle position={[-10, 1.0, -10]} type="sake" />
            <SakeBottle position={[-11, 1.0, -10]} type="shouchuu" />
            <SakeBottle position={[-9, 1.0, -10]} type="sake" />
            <SakeBottle position={[-12, 1.0, -10]} type="shouchuu" />
            <SakeBottle position={[-8, 1.0, -10]} type="sake" />

            {/* Shelf Bottles */}
            <SakeBottle position={[-14.5, 3, -12]} type="shouchuu" />
            <SakeBottle position={[-14.5, 3, -13]} type="sake" />
            <SakeBottle position={[-14.5, 3, -14]} type="shouchuu" />
            <SakeBottle position={[-14.5, 4, -12.5]} type="sake" />
            <SakeBottle position={[-14.5, 4, -13.5]} type="shouchuu" />

            {/* Decor - Lanterns */}
            <Lantern position={[0, 4, -5]} />
            <Lantern position={[-5, 4, -5]} />
            <Lantern position={[5, 4, -5]} />
            <Lantern position={[-10, 4, 0]} />
            <Lantern position={[10, 4, 0]} />
            <Lantern position={[-10, 4, 10]} />
            <Lantern position={[10, 4, 10]} />
            <Lantern position={[0, 4, 18]} /> {/* Entrance Lantern */}

            {/* Decor - Tables */}
            <TableSet position={[10, 0, 10]} rotation={[0, Math.PI / 4, 0]} />
            <TableSet position={[10, 0, 5]} />
            <TableSet position={[5, 0, 10]} />

            {/* Additional Tables */}
            <TableSet position={[15, 0, 15]} rotation={[0, -Math.PI / 6, 0]} />
            <TableSet position={[15, 0, 5]} rotation={[0, Math.PI / 3, 0]} />
            <TableSet position={[15, 0, -5]} rotation={[0, Math.PI / 2, 0]} />
            <TableSet position={[5, 0, 15]} rotation={[0, Math.PI / 8, 0]} />
            <TableSet position={[5, 0, 0]} rotation={[0, -Math.PI / 4, 0]} />
            <TableSet position={[0, 0, 5]} rotation={[0, Math.PI / 6, 0]} />
            <TableSet position={[-5, 0, 15]} rotation={[0, -Math.PI / 3, 0]} />
            <TableSet position={[-5, 0, 5]} rotation={[0, Math.PI / 5, 0]} />
            import {Enemy} from './models/Enemy'

            // ...

            <TableSet position={[10, 0, -5]} rotation={[0, -Math.PI / 8, 0]} />
            <TableSet position={[5, 0, -5]} rotation={[0, Math.PI / 4, 0]} />

            {/* Enemies */}
            <Enemy position={[0, 2, 10]} />
            <Enemy position={[-5, 2, 5]} />
            <Enemy position={[5, 2, 15]} />
            <Enemy position={[12, 2, 0]} />
            <Enemy position={[-8, 2, 12]} />
        </>
    )
}
