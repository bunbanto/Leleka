'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import style from '@/styles/Form.module.css';

import css from '../Page.module.css';

import Logo from '@/public/icons/Logo.svg';

import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';

import { RegisterRequest } from '@/types/user';
import { register } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useToastStore } from '@/lib/store/toastStore';

export default function RegisterForm() {
  const router = useRouter();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Ім’я має містити щонайменше 3 символи')
      .max(24, 'Ім’я не перевищує 24 символи')
      .trim()

      .required('Ім’я обов’язкове'),

    email: Yup.string()
      .trim()
      .email('Невірний формат email')
      .max(34, 'Емейл не перевищує 34 символи')
      .required('Email обов’язковий'),

    password: Yup.string()
      .min(6, 'Пароль має містити щонайменше 6 символів')
      .max(30, 'Пароль не перевищує 30 символи')
      .required('Пароль обов’язковий'),
  });

  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formValues: RegisterRequest) => {
    try {
      const result = await register(formValues);

      if (result.success && result.data) {
        setUser(result.data);

        router.push('/profile/edit');
      }

      if (result.success) {
        useToastStore
          .getState()
          .showToast(`${formValues?.email}, зареєстровано !`, 'success');
      }

      if (!result.success) {
        useToastStore
          .getState()
          .showToast(result.message ?? 'Помилка невідома');

        return result.message;
      }
    } catch (error) {
      console.error('Помилка реєстрації:', error);
    }
  };

  return (
    <div className={css.form_wrapper}>
      <div className={css.content_wrapper}>
        <Image src={Logo} alt="Leleka" className={css.logo} />

        <h1 className={style.title}>Реєстрація</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ errors }) => (
            <Form className={css.form_content}>
              {/* Name */}
              <div className={style.input_wrapper}>
                <label className={style.label}>Ім’я*</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Ваше імʼя"
                  className={style.custom_input}
                  style={{
                    color: errors.name && 'var(--color-red)',
                    borderColor: errors.name && 'var(--color-red)',
                  }}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={style.error}
                />
              </div>
              {/* E-MAIL */}
              <div className={style.input_wrapper}>
                <label className={style.label}>Пошта*</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="hello@leleka.com"
                  className={style.custom_input}
                  style={{
                    color: errors.email && 'var(--color-red)',
                    borderColor: errors.email && 'var(--color-red)',
                  }}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={style.error}
                />
              </div>
              {/* Password */}
              <div className={style.input_wrapper}>
                <label className={style.label}>Пароль*</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="********"
                  className={style.custom_input}
                  style={{
                    color: errors.password && 'var(--color-red)',
                    borderColor: errors.password && 'var(--color-red)',
                  }}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={style.error}
                />
              </div>

              <Button type="submit">Зареєструватись</Button>
              {/* <Button type="button" alternative={true} styles={{ gap: 12 }}>
                <Icon name="Google" />
                Зареєструватись через Google
              </Button> */}
            </Form>
          )}
        </Formik>
        <div className={css.nav_link_block}>
          <span>Вже маєте аккаунт?</span>
          <Link href={'/auth/login'} className={style.link}>
            Увійти
          </Link>
        </div>
      </div>
    </div>
  );
}
