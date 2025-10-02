'use client';
import { DiaryEntry } from '@/types/diary';
import { useEmotionsStore } from '@/lib/store/emotionStore';
import css from './DiaryEntryCard.module.css';
// import { useDragScroll } from '@/hooks/useDragScroll';

interface DiaryEntryCardProps {
  diaryEntry: DiaryEntry;
}

function DiaryEntryCard({ diaryEntry }: DiaryEntryCardProps) {
  const { emotions } = useEmotionsStore();

  const emotionMap = new Map(emotions.map(e => [e._id, e.title]));
  const emotionsTags = diaryEntry.emotions
    .map(id => emotionMap.get(id))
    .filter(Boolean);

  // const { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove } =
  //   useDragScroll<HTMLUListElement>('horizontal');

  return (
    <>
      <div className={css.diaryItem_header}>
        <h3 className={css.diaryItemHeader_Title}>{diaryEntry.title}</h3>
        <span className={css.diaryItemHeader_date}>
          {new Date(diaryEntry.updatedAt).toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>
      <ul
        className={css.diaryItem_tagList}
        // ref={ref}
        // onMouseDown={onMouseDown}
        // onMouseLeave={onMouseLeave}
        // onMouseUp={onMouseUp}
        // onMouseMove={onMouseMove}
        // style={{ overflow: 'auto', whiteSpace: 'nowrap' }}
      >
        {emotionsTags.map((title, index) => {
          return (
            <li
              key={diaryEntry._id + '_emotion_' + index}
              className={css.diaryTagList_item}
            >
              {title}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default DiaryEntryCard;
