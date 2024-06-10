import { create } from "zustand";

interface UseLoginModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<UseLoginModalProps>((set) => ({ // create a new store
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
