import { NewTask, patchTask, Task } from '@/types/task';
import { User } from '../../types/user';

// INITIAL

import { serverApi } from './api';

// COOKIES

import { cookies } from 'next/headers';

import { FullWeekData, WeekMom, WeekBaby } from '@/types/weeks';

import { NewDiaryData } from '@/types/diary';
import { FetchDiaryResponse } from './clientApi';
// TYPES

import { Journey, JourneyMom, JourneyBaby } from '@/types/journey';

interface TasksHttpResponse {
  result: {
    data: Task[];
    totalPages: number;
  };
}

// PRIVAT USER

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

// PATCH ME

export const editProfile = async (data: FormData) => {
  const cookieStore = await cookies();
  const res = await serverApi.patch('/users', data, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

// CHECK SESSION

export const checkSession = async () => {
  try {
    const cookieStore = await cookies();
    const response = await serverApi.post('/auth/refresh', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return response;
  } catch (error: unknown) {
    console.error(
      'Session refresh failed:',
      error instanceof Error ? error.message : error
    );
    return null;
  }
};

export const fetchCurrentWeekServer = async () => {
  const cookieStore = await cookies();
  const response = await serverApi.get<Journey>('/weeks/current', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data.weekNumber;
};

export const getJourneyByWeekNumberAndTabServer = async (
  weekNumber: number,
  activeTab: string = 'baby'
) => {
  const cookieStore = await cookies();
  const res = await serverApi.get<JourneyBaby | JourneyMom>(
    `/weeks/journej/${weekNumber}/${activeTab}`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );
  return res.data;
};
// GET

export const getServerAllTasks = async (
  page: number
): Promise<TasksHttpResponse> => {
  const PARAMS = new URLSearchParams({
    page: page.toString(),
  });
  const cookieStore = await cookies();

  const response = await serverApi.get('/task', {
    params: PARAMS,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

// POST

export const createServerTask = async (newTask: NewTask): Promise<Task> => {
  const cookieStore = await cookies();
  const response = await serverApi.post('/task', newTask, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

// PATCH

export const patchActiveTask = async (id: string, payload: patchTask) => {
  const cookieStore = await cookies();
  const res = await serverApi.patch(`/task/${id}`, payload, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

//====================WeeksApi===================================

//GET CURRENT WEEK INFO

export const getCurrentWeekServer = async (
  dueDate: string
): Promise<FullWeekData> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get<FullWeekData>('/weeks/current', {
    params: { dueDate },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  console.log(cookieStore);

  return data;
};

//GET CURRENT WEEK INFO PUBLIC

export const getCurrentWeekPublicServer = async (): Promise<FullWeekData> => {
  const { data } = await serverApi.get<FullWeekData>('/weeks/current/public');
  return data;
};

//GET CURRENT WEEK MOM INFO

export const getWeekMomServer = async (
  weekNumber: number
): Promise<WeekMom> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get<WeekMom>(`/weeks/${weekNumber}/mom`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

//GET CURRENT WEEK BABY INFO

export const getWeekBabyServer = async (
  weekNumber: number
): Promise<WeekBaby> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get<WeekBaby>(`/weeks/${weekNumber}/baby`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

//GET CURRENT WEEK WITH FUUL INFO (MOM + BABY)

export const getWeekFullServer = async (
  weekNumber: number
): Promise<FullWeekData> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get<FullWeekData>(`/weeks/${weekNumber}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getDiaries = async (page: number) => {
  const PARAMS = new URLSearchParams({
    page: page.toString(),
  });
  const cookieStore = await cookies();

  const response = await serverApi.get<FetchDiaryResponse>('/diary', {
    params: PARAMS,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export async function createDiary(newDiary: NewDiaryData) {
  const cookieStore = await cookies();
  const resp = await serverApi.post('/diary', newDiary, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return resp.data;
}

export const patchDiary = async (id: string, payload: NewDiaryData) => {
  const cookieStore = await cookies();
  const res = await serverApi.patch(`/diary/${id}`, payload, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};
