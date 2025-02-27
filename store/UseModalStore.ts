import { ModalProps } from '@/types';
import { create } from 'zustand';

export type ModalType = 'reset-password' | 'confirm' | 'alert' | 'custom';

interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  props: ModalProps;
  openModal: (type: ModalType, props?: ModalProps) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  props: {},
  openModal: (type, props = {}) => set({ isOpen: true, type, props }),
  closeModal: () => set({ isOpen: false, type: null, props: {} }),
}));
