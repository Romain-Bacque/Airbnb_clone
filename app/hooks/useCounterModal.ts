import { create } from "zustand";

interface CounterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCounterModal = create<CounterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCounterModal;
