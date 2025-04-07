import { create } from 'zustand'

interface CameraState {
  showCamera: boolean
  setShowCamera: (show: boolean) => void
  toggleCamera: () => void
}

export const useCameraStore = create<CameraState>((set) => ({
  showCamera: false,
  setShowCamera: (show) => set({ showCamera: show }),
  toggleCamera: () => set((state) => ({ showCamera: !state.showCamera })),
})) 