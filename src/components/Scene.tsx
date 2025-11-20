import { PerspectiveCamera, Environment, KeyboardControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { Player } from './Player'
import { World } from './World'
import { Suspense } from 'react'

export const Scene = () => {
    return (
        <KeyboardControls
            map={[
                { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
                { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
                { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
                { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
                { name: 'jump', keys: ['Space'] },
                { name: 'rotateLeft', keys: ['q', 'Q'] },
                { name: 'rotateRight', keys: ['e', 'E'] },
                { name: 'attack', keys: ['Shift'] },
            ]}
        >
            <PerspectiveCamera makeDefault position={[0, 10, 10]} />
            <Environment preset="night" />
            <fog attach="fog" args={['#404040', 5, 30]} />

            <ambientLight intensity={2.5} />
            <spotLight position={[10, 20, 10]} angle={0.5} penumbra={1} intensity={5.0} castShadow color="#ffaa00" />

            {/* Additional spotlights for dramatic lighting */}
            <spotLight position={[-10, 15, 0]} angle={0.6} penumbra={1} intensity={4} color="#ffffff" target-position={[-10, 0, 0]} />
            <spotLight position={[10, 15, 0]} angle={0.6} penumbra={1} intensity={4} color="#ffffff" target-position={[10, 0, 0]} />
            <spotLight position={[0, 15, -10]} angle={0.6} penumbra={1} intensity={4} color="#ffffff" target-position={[0, 0, -5]} />
            <spotLight position={[0, 15, 15]} angle={0.6} penumbra={1} intensity={3} color="#ffd700" target-position={[0, 0, 15]} />

            {/* Additional lights for better illumination */}
            <pointLight position={[-15, 10, 0]} intensity={4} distance={30} color="#ffffff" />
            <pointLight position={[15, 10, 0]} intensity={4} distance={30} color="#ffffff" />
            <pointLight position={[0, 10, -15]} intensity={4} distance={30} color="#ffffff" />
            <pointLight position={[0, 10, 15]} intensity={4} distance={30} color="#ffffff" />

            <Suspense fallback={null}>
                <Physics gravity={[0, -9.8, 0]}>
                    <Player />
                    <World />
                </Physics>
            </Suspense>
        </KeyboardControls>
    )
}
