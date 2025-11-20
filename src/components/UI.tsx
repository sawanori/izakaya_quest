import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store'
import { SECTIONS } from '../constants'
import { Joystick } from './Joystick'

export const UI = () => {
    const activeZone = useStore((state) => state.activeZone)
    const activeSection = SECTIONS.find((s) => s.id === activeZone)

    return (
        <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-8">
            {/* Header */}
            <header className="flex justify-between items-start">
                <h1 className="text-2xl font-serif font-bold text-white tracking-widest drop-shadow-lg">
                    居酒屋 <span className="text-izakaya-red">P亭</span>
                </h1>
                <div className="bg-black/50 backdrop-blur-md p-4 rounded-lg text-white/80 font-sans text-sm hidden md:block">
                    <p>WASD / 矢印キー : 移動</p>
                </div>
            </header>



            {/* Modal */}
            <AnimatePresence>
                {activeSection && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/40 backdrop-blur-sm p-4"
                    >
                        <div className="bg-izakaya-dark/90 border border-izakaya-red/30 p-8 md:p-12 rounded-xl max-w-2xl w-full shadow-2xl text-center relative overflow-hidden">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-izakaya-red to-transparent opacity-50" />
                            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-izakaya-red to-transparent opacity-50" />

                            <p className="text-izakaya-red font-serif mb-4 tracking-[0.2em] text-lg uppercase">{activeSection.subtitle}</p>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 md:mb-8 tracking-widest">
                                {activeSection.title}
                            </h2>
                            <p className="text-white/90 font-sans text-base md:text-lg leading-relaxed whitespace-pre-wrap mb-6 md:mb-8">
                                {activeSection.description}
                            </p>

                            <div className="text-white/40 text-xs md:text-sm font-serif tracking-widest">
                                エリアから離れると閉じます
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Controls */}
            <div className="absolute bottom-8 left-8 pointer-events-auto md:hidden">
                <Joystick />
            </div>
            <div className="absolute bottom-8 right-8 pointer-events-auto md:hidden">
                <motion.button
                    className="w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center active:bg-white/30"
                    whileTap={{ scale: 0.9 }}
                    onTouchStart={() => useStore.getState().setIsJumping(true)}
                    onTouchEnd={() => useStore.getState().setIsJumping(false)}
                    onMouseDown={() => useStore.getState().setIsJumping(true)}
                    onMouseUp={() => useStore.getState().setIsJumping(false)}
                >
                    <span className="text-white font-bold text-sm">JUMP</span>
                </motion.button>
            </div>
        </div>
    )
}
