// 'use client';
// import { Icon } from '../ui/Icon/Icon';
// import { DiaryEntry } from '@/types/diary';
// import { useEmotionsStore } from '@/lib/store/emotionStore';
// import css from './DiaryEntryDetails.module.css';
// import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
// import { useEffect, useState } from 'react';
// import { deleteDiary } from '@/lib/api/clientApi';
// import { useDiaryStore } from '@/lib/store/diaryStore';
// import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm';
// import Modal from '../Modal/Modal';

// interface DiaryEntryDetailsProps {
//   entryData: DiaryEntry | null;
// }

// function DiaryEntryDetails({ entryData }: DiaryEntryDetailsProps) {
//   const [checkedData, setCheckedData] = useState(entryData);
//   const { emotions } = useEmotionsStore();
//   const [isDeleteModal, setIsDeleteModal] = useState(false);
//   const [isPatchModalOpen, setPatchModalOpen] = useState<boolean>(false);
//   const { fetchDiaries } = useDiaryStore();

//   const emotionMap = new Map(emotions.map(e => [e._id, e.title]));

//   const emotionsTags = Array.isArray(entryData?.emotions)
//     ? entryData.emotions.map(id => emotionMap.get(id)).filter(Boolean)
//     : [];

//   const handleDeleteDiary = async () => {
//     if (!entryData?._id) return;
//     try {
//       await deleteDiary(entryData._id);
//       setCheckedData(null);
//       setIsDeleteModal(false);
//       await fetchDiaries();
//     } catch (error) {
//       console.log('Failed to delete the draft', error);
//     }
//   };

//   useEffect(() => {
//     if (entryData?._id && entryData._id !== checkedData?._id) {
//       setCheckedData(entryData);
//     }
//   }, [entryData]);

//   if (!checkedData) return 'Запис видалено, оберіть новий !';

//   return entryData === null ? (
//     <div className={css.diary_noteWrapper}>
//       <div className={css.diary_noteHeader_titleBox}>
//         <h2 className={css.diary_noteList_title}>Щоденників поки що немає.</h2>
//       </div>
//     </div>
//   ) : (
//     <>
//       <div className={css.diary_noteWrapper}>
//         <div className={css.diary_note_header}>
//           <div className={css.diary_noteHeader_titleBox}>
//             <h2 className={css.diary_noteList_title}>{entryData?.title}</h2>
//             <Icon name="note" action={() => setPatchModalOpen(true)} />
//           </div>

//           <div className={css.diary_note_date}>
//             {new Date(entryData.updatedAt).toLocaleDateString('uk-UA', {
//               day: 'numeric',
//               month: 'long',
//               year: 'numeric',
//             })}

//             <Icon
//               name="delete"
//               action={() => {
//                 setIsDeleteModal(true);
//               }}
//             />
//           </div>
//           {isDeleteModal && (
//             <ConfirmationModal
//               title="Видалити запис?"
//               handler={handleDeleteDiary}
//               onClose={() => {
//                 setIsDeleteModal(false);
//               }}
//             />
//           )}
//         </div>
//         <p className={css.diary_note_content}>{entryData?.description}</p>
//         <ul className={css.diary_note_tagList}>
//           {emotionsTags?.map((title, index) => (
//             <li
//               key={entryData?._id + '_emo_' + index}
//               className={css.diary_tagListNote_item}
//             >
//               {title}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {isPatchModalOpen && (
//         <Modal
//           title="Редагувати запис"
//           onClose={() => setPatchModalOpen(false)}
//         >
//           <AddDiaryEntryForm
//             patchMode={true}
//             data={entryData}
//             closeModal={() => {
//               setPatchModalOpen(false);
//             }}
//           />
//         </Modal>
//       )}
//     </>
//   );
// }

// export default DiaryEntryDetails;
'use client';
import { Icon } from '../ui/Icon/Icon';
import { DiaryEntry } from '@/types/diary';
import { useEmotionsStore } from '@/lib/store/emotionStore';
import css from './DiaryEntryDetails.module.css';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { useEffect, useState } from 'react';
import { deleteDiary } from '@/lib/api/clientApi';
import { useDiaryStore } from '@/lib/store/diaryStore';
import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm';
import Modal from '../Modal/Modal';

interface DiaryEntryDetailsProps {
  entryData: DiaryEntry | null;
}

function DiaryEntryDetails({ entryData }: DiaryEntryDetailsProps) {
  const [checkedData, setCheckedData] = useState(entryData);
  const { emotions } = useEmotionsStore();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isPatchModalOpen, setPatchModalOpen] = useState<boolean>(false);

  const { fetchDiaries, diaries } = useDiaryStore();

  const emotionMap = new Map(emotions.map(e => [e._id, e.title]));

  const emotionsTags = Array.isArray(entryData?.emotions)
    ? entryData.emotions.map(id => emotionMap.get(id)).filter(Boolean)
    : [];

  const handleDeleteDiary = async () => {
    if (!entryData?._id) return;
    try {
      await deleteDiary(entryData._id);
      setCheckedData(null);
      setIsDeleteModal(false);
      await fetchDiaries();
    } catch (error) {
      console.log('Failed to delete the draft', error);
    }
  };

  useEffect(() => {
    if (entryData) {
      setCheckedData(entryData);
    }
  }, [entryData]);

  // ✅ якщо взагалі немає записів
  if (!diaries || diaries.length === 0) {
    return (
      <h2 className={css.diary_noteList_title}>Поки що у вас немає записів.</h2>
    );
  }

  // ✅ якщо записи є, але цей запис видалено
  if (!checkedData) {
    return (
      <div className={css.diary_noteWrapper}>
        <h2 className={css.diary_noteList_title}>
          Запис видалено, оберіть новий!
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className={css.diary_noteWrapper}>
        <div className={css.diary_note_header}>
          <div className={css.diary_noteHeader_titleBox}>
            <h2 className={css.diary_noteList_title}>{entryData?.title}</h2>
            <Icon name="note" action={() => setPatchModalOpen(true)} />
          </div>

          <div className={css.diary_note_date}>
            {entryData?.updatedAt
              ? new Date(entryData.updatedAt).toLocaleDateString('uk-UA', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : ''}

            <Icon name="delete" action={() => setIsDeleteModal(true)} />
          </div>
          {isDeleteModal && (
            <ConfirmationModal
              title="Видалити запис?"
              handler={handleDeleteDiary}
              onClose={() => setIsDeleteModal(false)}
            />
          )}
        </div>
        <p className={css.diary_note_content}>{entryData?.description}</p>
        <ul className={css.diary_note_tagList}>
          {emotionsTags?.map((title, index) => (
            <li
              key={entryData?._id + '_emo_' + index}
              className={css.diary_tagListNote_item}
            >
              {title}
            </li>
          ))}
        </ul>
      </div>

      {isPatchModalOpen && (
        <Modal
          title="Редагувати запис"
          onClose={() => setPatchModalOpen(false)}
        >
          <AddDiaryEntryForm
            patchMode={true}
            data={entryData ?? undefined}
            closeModal={() => setPatchModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default DiaryEntryDetails;
