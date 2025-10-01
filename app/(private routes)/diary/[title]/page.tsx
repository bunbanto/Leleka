'use client';
import { useDiaryStore } from '@/lib/store/diaryStore';
import css from './page.module.css';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/components/ui/Loader/Loader';

export default function DiaryDetailsPage() {
  const { title } = useParams<{ title: string }>();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const { diaries, selectedDiary, setSelectedDiary, fetchDiaries } =
    useDiaryStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchDiaries();
      setLoading(false);
    };
    load();
  }, [fetchDiaries]);

  useEffect(() => {
    if (!loading) {
      const diary = diaries.find(d => d._id === id) || null;
      if (diary === null) return router.push('/diary');
      setSelectedDiary(diary);
    }
  }, [loading, diaries, id, setSelectedDiary, router]);

  if (loading) return <Loader />;

  return (
    <section className={css.diaryDetailsContainer}>
      <DiaryEntryDetails entryData={selectedDiary} />
    </section>
  );
}
