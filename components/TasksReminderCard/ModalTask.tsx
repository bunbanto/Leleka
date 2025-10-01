import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Modal from '../Modal/Modal';
import Button from '../ui/Button/Button';

import css from './Style.module.css';
import style from '@/styles/Form.module.css';

/* MUI DATA */

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormikDatePickerBirthday } from '@/components/FormikDatePicker/FormikDatePicker';
import { createTask } from '@/lib/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NewTask } from '@/types/task';

type Props = {
  switchModal: (state: boolean) => void;
};

function ModalTask({ switchModal }: Props) {
  const queryClient = useQueryClient();

  const [succsess, setSuccsess] = useState(false);

  // FORMIK

  const initialValues = {
    text: '',
    date: '',
    isActive: false,
  };

  const validationSchema = Yup.object({
    text: Yup.string()
      .min(6, 'Значення має містити щонайменше 6 символи')
      .required('Ім’я обов’язкове'),
    date: Yup.string().required('Пароль обов’язковий'),
    isActive: Yup.boolean(),
  });

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleSubmit = async (values: NewTask) => {
    mutation.mutate(values, {
      onSuccess: () => {
        switchModal(false);
        setSuccsess(true);
      },
    });
  };
  return (
    <>
      <Modal
        onClose={() => switchModal(false)}
        title={'Нове завдання'}
        styles={{ maxHeight: 472 }}
      >
        <div className={css.modal_content}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ errors }) => (
              <Form className={css.form_content}>
                {/* Name */}

                <div className={style.input_wrapper}>
                  <label className={style.label}>Назва завдання</label>
                  <Field
                    type="text"
                    name="text"
                    placeholder="Прийняти вітаміни"
                    className={style.custom_input}
                    style={{
                      color: errors.text && 'var(--color-red)',
                      maxWidth: 640,
                    }}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={style.error}
                  />
                </div>

                {/* Date */}

                <div className={style.input_wrapper}>
                  <label className={style.label}>Дата</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <FormikDatePickerBirthday name="date" mxWidth={640} />
                  </LocalizationProvider>

                  <ErrorMessage
                    name="date"
                    component="div"
                    className={style.error}
                  />
                </div>

                {/* Action */}

                <Button
                  type="submit"
                  styles={{ margin: '0 auto', maxWidth: 268 }}
                >
                  {'Зберегти'}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>

      {/* Modal */}

      {succsess && (
        <Modal
          title="Завдання успішно додано"
          onClose={() => setSuccsess(false)}
          styles={{
            justifyContent: 'center',
            gap: 25,
            padding: 25,
            maxHeight: 250,
          }}
        >
          <Button
            type="button"
            styles={{ maxWidth: 144, height: 44 }}
            action={() => window.location.reload()}
          >
            Готово
          </Button>
        </Modal>
      )}
    </>
  );
}

export default ModalTask;
