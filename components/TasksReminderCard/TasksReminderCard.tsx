'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import style from '@/app/(private routes)/Page.module.css';
import iconStyle from '@/components/ui/Icon/Style.module.css';

import css from './Style.module.css';

import Icon from '@/public/icons/circle.svg';
import Image from 'next/image';
import Button from '../ui/Button/Button';
import ModalTask from './ModalTask';
import { getAllTasks, patchActiveTask } from '@/lib/api/clientApi';
import { Task } from '@/types/task';
import { useAuthStore } from '@/lib/store/authStore';

import { ClipLoader } from 'react-spinners';

interface TasksHttpResponse {
  result: {
    data: Task[];
    totalPages: number;
  };
}

function TasksReminderCard() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [switchModal, setSwitchModal] = useState(false);
  const queryClient = useQueryClient();

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const { data, isLoading } = useQuery<TasksHttpResponse>({
    queryKey: ['tasks'],
    queryFn: () => getAllTasks(1),
  });

  const tasks: Task[] = data?.result?.data ?? [];

  // PATCH

  const mutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      patchActiveTask(id, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setLoadingId(null);
    },
    onError: error => {
      setLoadingId(null);
      console.error('Помилка при оновленні задачі:', error);
    },
  });

  const handleToggleActive = (id: string, currentState: boolean) => {
    setLoadingId(id);
    mutation.mutate({ id, isActive: !currentState });
  };

  // DATA FORMATED

  const formatDateShort = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  };

  const handleClick = () => {
    if (isAuthenticated) {
      setSwitchModal(true);
    } else {
      router.push('/auth/register');
    }
  };

  return (
    <>
      <div className={css.task_form}>
        <div className={css.title_wrapper}>
          <h3 className={style.block_title}>Важливі завдання</h3>
          <Image
            onClick={handleClick}
            src={Icon}
            alt="Open form button"
            className={iconStyle.icon}
          />
        </div>
        {tasks.length > 0 && !isLoading && isAuthenticated ? (
          <ul className={css.list}>
            {tasks
              .slice()
              .reverse()
              .map((item, index) => {
                return (
                  <li key={index} className={css.item}>
                    <label
                      htmlFor={item.text}
                      onClick={() =>
                        handleToggleActive(item._id, item.isActive)
                      }
                      className={css.input_label_wrapper}
                    >
                      {loadingId === item._id ? (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: '4px',
                          }}
                        >
                          <ClipLoader
                            size={16}
                            color="var(--color-scheme-accent)"
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </div>
                      ) : (
                        <input
                          type="checkbox"
                          checked={item.isActive}
                          name={item.text}
                          onChange={() =>
                            handleToggleActive(item._id, item.isActive)
                          }
                        />
                      )}

                      <div className={css.item_content}>
                        <span>{formatDateShort(item.date)}</span>
                        <span
                          style={{
                            textDecoration: item.isActive
                              ? 'line-through'
                              : 'none',
                          }}
                        >
                          {item.text}
                        </span>
                      </div>
                    </label>
                  </li>
                );
              })}
          </ul>
        ) : (
          <div className={css.greating_block}>
            <b>Наразі немає жодних завдань</b>
            <p className={css.about_text}>Створіть мершій нове завдання!</p>
            <Button
              type={'button'}
              styles={{ maxWidth: 191 }}
              action={handleClick}
            >
              {'Створити завдання'}
            </Button>
          </div>
        )}
      </div>
      {/* Modal */}
      {switchModal && <ModalTask switchModal={setSwitchModal} />}
    </>
  );
}

export default TasksReminderCard;
