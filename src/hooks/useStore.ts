import { create } from "zustand";

interface State {
  ready: boolean;
  isReady: () => void;
}

export const useStore = create<State>((set) => ({
  ready: false,
  isReady: () => set({ ready: true }),
}));

interface CarouselState {
  currentFlavorIndex: number;
  setCurrentFlavorIndex: (index: number) => void;
}

export const useCarouselStore = create<CarouselState>((set) => ({
  currentFlavorIndex: 0,
  setCurrentFlavorIndex: (index) => set({ currentFlavorIndex: index }),
}));
