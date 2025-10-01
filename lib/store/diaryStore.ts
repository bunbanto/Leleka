import { create } from 'zustand';
import { DiaryEntry } from '../../types/diary';
import { getDiaries } from '../api/clientApi';

type DiaryStore = {
  diaries: DiaryEntry[];
  selectedDiary: DiaryEntry | null;
  isLoaded: boolean;
  setSelectedDiary: (entry: DiaryEntry | null) => void;
  setDiaries: (entries: DiaryEntry[]) => void;
  fetchDiaries: () => Promise<void>;
};

export const useDiaryStore = create<DiaryStore>((set, get) => ({
  diaries: [],
  selectedDiary: null,
  isLoaded: false,

  setSelectedDiary: entry => set({ selectedDiary: entry }),

  setDiaries: entries => set({ diaries: entries }),

  fetchDiaries: async () => {
    try {
      const { result } = await getDiaries(1);

      const diaries = result.data;
      const selected =
        get().selectedDiary ?? (diaries.length > 0 ? diaries[0] : null);

      set({
        diaries,
        selectedDiary: selected,
        isLoaded: true,
      });
    } catch (error) {
      console.error('Failed to fetch diaries:', error);
      set({
        diaries: [],
        selectedDiary: null,
        isLoaded: true,
      });
    }
  },
}));
