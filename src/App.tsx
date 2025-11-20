import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Scene } from './components/Scene'
import { UI } from './components/UI'

function App() {
    return (
        <div className="w-full h-screen bg-izakaya-dark text-white">
            <div className="absolute inset-0 z-0">
                <Canvas shadows dpr={[1, 2]}>
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>
            </div>
            <UI />
        </div>
    )
}

export default App
