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
            ]}
        >
            <PerspectiveCamera makeDefault position={[0, 10, 10]} />
            <Environment preset="night" />
            <fog attach="fog" args={['#404040', 5, 30]} />

            <ambientLight intensity={1.5} />
            <spotLight position={[10, 20, 10]} angle={0.5} penumbra={1} intensity={3.0} castShadow color="#ffaa00" />

            <Suspense fallback={null}>
                <Physics gravity={[0, -9.8, 0]}>
                    <Player />
                    <World />
                </Physics>
            </Suspense>
        </KeyboardControls>
    )
}
