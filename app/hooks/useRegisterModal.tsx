import { create } from "zustand";

interface UseRegisterModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterModal = create<UseRegisterModalProps>((set) => ({ // create a new store
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
