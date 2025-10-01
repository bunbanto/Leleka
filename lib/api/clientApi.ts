import { NewTask, patchTask, Task } from '@/types/task';
import {
  RegisterRequest,
  User,
  CheckSessionRequest,
  LoginRequest,
  UserResponse,
} from '@/types/user';
import { FullWeekData, WeekMom, WeekBaby } from '@/types/weeks';

import { serverApi } from './api';
import { DiaryEntry, Emotion, NewDiaryData } from '@/types/diary';

export interface FetchDiaryResponse {
  result: {
    data: DiaryEntry[];
    totalPages: number;
  };
}
import { Journey } from '@/types/journey';
import { isAxiosError } from 'axios';

interface TasksHttpResponse {
  result: {
    data: Task[];
    totalPages: number;
  };
}

// REGISTER

export const register = async (data: RegisterRequest) => {
  try {
    const res = await serverApi.post<User>('/auth/register', data);
    return { success: true, data: res.data };
  } catch (error: unknown) {
    let message = 'Не вдалося зареєструвати користувача';
    let status: number | undefined;

    if (isAxiosError(error)) {
      const errorData = error.response?.data;

      if (typeof errorData?.message === 'string') {
        message = errorData.message;
      } else if (typeof errorData?.error === 'string') {
        message = errorData.error;
      }

      status = error.response?.status;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return { success: false, message, status };
  }
};

// LOGIN

export const login = async (data: LoginRequest) => {
  try {
    const res = await serverApi.post<User>('/auth/login', data);
    return { success: true, data: res.data };
  } catch (error: unknown) {
    let message = 'Не вдалося виконати вхід';
    let status: number | undefined;

    if (isAxiosError(error)) {
      const errorData = error.response?.data;

      // Витягуємо error.message або error.error
      if (typeof errorData?.message === 'string') {
        message = errorData.message;
      } else if (typeof errorData?.error === 'string') {
        message = errorData.error;
      }

      status = error.response?.status;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return { success: false, message, status };
  }
};

// PATCH

export const editProfile = async (data: FormData) => {
  const res = await serverApi.patch<UserResponse>('/users', data);
  return res.data;
};

// LOGOUT

export const logout = async (): Promise<void> => {
  await serverApi.post('/auth/logout');
};

// AUTH ME

export const getMe = async (): Promise<User> => {
  const { data } = await serverApi.get('/users/me', {
    withCredentials: true,
  });

  return data;
};

// CHECK SESSION

export const checkSession = async () => {
  const res = await serverApi.get<CheckSessionRequest>('/auth/session', {
    withCredentials: true,
  });

  console.log('Session response:', res.data);

  return res;
};

export const fetchCurrentWeek = async () => {
  const response = await serverApi.get<Journey>(`/weeks/current`);
  return response.data.weekNumber;
};

export const getJourneyByWeekNumberAndTab = async (
  weekNumber: number,
  activeTab: string
) => {
  const res = await serverApi.get(`/weeks/${weekNumber}/${activeTab}`);
  return res.data;
};

// GET

export const getAllTasks = async (page: number): Promise<TasksHttpResponse> => {
  const PARAMS = new URLSearchParams({
    page: page.toString(),
  });

  const response = await serverApi.get<TasksHttpResponse>('/task', {
    params: PARAMS,
  });

  return response.data;
};

// POST

export const createTask = async (newTask: NewTask): Promise<Task> => {
  const response = await serverApi.post('/task', newTask);
  return response.data;
};

// PATCH

export const patchActiveTask = async (id: string, payload: patchTask) => {
  const res = await serverApi.patch<TasksHttpResponse>(`/task/${id}`, payload);
  return res.data;
};

//===========================WEEKS API==================================

//GET CURRENT WEEK INFO
export const getCurrentWeek = async (
  dueDate: string | undefined
): Promise<FullWeekData> => {
  const { data } = await serverApi.get<FullWeekData>('/weeks/current', {
    params: { dueDate },
  });
  return data;
};

//GET CURRENT WEEK INFO PUBLIC
export const getCurrentWeekPublic = async (): Promise<FullWeekData> => {
  const { data } = await serverApi.get<FullWeekData>('/weeks/current/public');
  return data;
};

//GET CURRENT WEEK MOM INFO
export const getWeekMom = async (weekNumber: number): Promise<WeekMom> => {
  const { data } = await serverApi.get<WeekMom>(`/weeks/${weekNumber}/mom`);
  return data;
};

//GET CURRENT WEEK BABY INFO
export const getWeekBaby = async (weekNumber: number): Promise<WeekBaby> => {
  const { data } = await serverApi.get<WeekBaby>(`/weeks/${weekNumber}/baby`);
  return data;
};

//GET CURRENT WEEK WITH FUUL INFO (MOM + BABY)
export const getWeekFull = async (
  weekNumber: number
): Promise<FullWeekData> => {
  const { data } = await serverApi.get<FullWeekData>(`/weeks/${weekNumber}`);
  return data;
};

// diary CRUD

export const getDiaries = async (page: number) => {
  const PARAMS = new URLSearchParams({
    page: page.toString(),
  });

  const resp = await serverApi.get<FetchDiaryResponse>('/diary', {
    params: PARAMS,
  });

  return resp.data;
};

export async function createDiary(newDiary: NewDiaryData) {
  const resp = await serverApi.post<DiaryEntry>('/diary', newDiary);
  return resp.data;
}

export async function patchDiary(id: string, newDiary: NewDiaryData) {
  const resp = await serverApi.patch<DiaryEntry>(`/diary/${id}`, newDiary);
  return resp.data;
}

export async function deleteDiary(_id: string) {
  const resp = await serverApi.delete<DiaryEntry>(`/diary/${_id}`);
  return resp.data;
}

interface getEmotionsResponse {
  data: Emotion[];
}

export async function getEmotions() {
  const resp = await serverApi.get<getEmotionsResponse>('/emotions');
  return resp.data;
}
