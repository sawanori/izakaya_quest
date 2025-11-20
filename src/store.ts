import { create } from 'zustand'

type SectionId = 'hero' | 'philosophy' | 'menu' | 'course' | 'drink' | 'seats' | 'location' | null

interface GameState {
    activeZone: SectionId
    setActiveZone: (zone: SectionId) => void
    joystickInput: { x: number; y: number }
    setJoystickInput: (input: { x: number; y: number }) => void
    isJumping: boolean
    setIsJumping: (isJumping: boolean) => void
}

export const useStore = create<GameState>((set) => ({
    activeZone: null,
    setActiveZone: (zone) => set({ activeZone: zone }),
    joystickInput: { x: 0, y: 0 },
    setJoystickInput: (input) => set({ joystickInput: input }),
    isJumping: false,
    setIsJumping: (isJumping) => set({ isJumping }),
}))
