import { motion, useDragControls } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store'

export const Joystick = () => {
    const setJoystickInput = useStore((state) => state.setJoystickInput)
    const constraintsRef = useRef(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleDrag = (event: any, info: any) => {
        const maxDistance = 35 // Half of the container size minus half of the knob size
        let x = info.offset.x
        let y = info.offset.y

        // Normalize
        const distance = Math.sqrt(x * x + y * y)
        if (distance > maxDistance) {
            x = (x / distance) * maxDistance
            y = (y / distance) * maxDistance
        }

        // Map to -1 to 1 range
        const inputX = x / maxDistance
        const inputY = y / maxDistance // Invert Y for standard joystick feel if needed, but 3D usually expects -Y for forward

        // Update store
        setJoystickInput({ x: inputX, y: inputY })
    }

    const handleDragEnd = () => {
        setJoystickInput({ x: 0, y: 0 })
        setPosition({ x: 0, y: 0 })
    }

    return (
        <div className="relative w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center touch-none">
            <motion.div
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                className="w-10 h-10 bg-izakaya-red/80 rounded-full shadow-lg cursor-pointer"
                whileTap={{ scale: 1.1 }}
            />
        </div>
    )
}
