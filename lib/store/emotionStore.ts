import { create } from 'zustand';
import { Emotion } from '@/types/diary';
import { getEmotions } from '../api/clientApi';

type EmotionStore = {
  emotions: Emotion[];
  fetchEmotions: () => Promise<void>;
};

export const useEmotionsStore = create<EmotionStore>(set => ({
  emotions: [] as Emotion[],
  fetchEmotions: async () => {
    const res = await getEmotions();
    set({ emotions: res.data });
  },
}));
