import React from 'react';
import DiaryPageClient from './DiaryPageClient';
import css from './page.module.css';

const DiaryPage = async () => {
  return (
    <section className={css.diaryContainer}>
      <DiaryPageClient />
    </section>
  );
};

export default DiaryPage;
