export type DiaryEntry = {
  _id: string;
  userId: string;
  title: string;
  date: string;
  description: string;
  emotions: string[];
  createdAt: string;
  updatedAt: string;
};

export interface NewDiaryData {
  title: string;
  description: string;
  emotions: string[];
  date: string;
}

export type DiaryMutationResponse = {
  data: {
    diary: DiaryEntry;
  };
};

export type Emotion = { _id?: string; title: string };
