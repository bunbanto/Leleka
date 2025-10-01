import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  message: string;
  type: ToastType;
  visible: boolean;
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>(set => ({
  message: '',
  type: 'info',
  visible: false,
  showToast: (message, type = 'info', duration = 3000) => {
    set({ message, type, visible: true });

    setTimeout(() => {
      set({ visible: false });
    }, duration);
  },
  hideToast: () => set({ visible: false }),
}));
