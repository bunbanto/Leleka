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
// import { Icon } from '@/components/ui/Icon/Icon';
import { getMe, login } from '@/lib/api/clientApi';

import { LoginRequest } from '@/types/user';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useToastStore } from '@/lib/store/toastStore';

export default function RegisterForm() {
  const router = useRouter();

  const setUser = useAuthStore(state => state.setUser);
  const setIsLoaded = useAuthStore(state => state.setIsLoaded);

  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Невірний формат email')
      .required('Email обов’язковий'),
    password: Yup.string()
      .min(6, 'Пароль має містити щонайменше 6 символів')
      .required('Пароль обов’язковий'),
  });

  const handleSubmit = async (formValues: LoginRequest) => {
    setIsLoaded(true);

    const result = await login(formValues);

    if (result.success) {
      useToastStore.getState().showToast('Вхід виконано');
    }

    if (!result.success) {
      setIsLoaded(false);
      useToastStore.getState().showToast(result.message ?? 'Помилка невідома');

      return result.message;
    }

    const userRes = await getMe();
    setUser(userRes);
    router.push('/');
  };

  return (
    <div className={css.form_wrapper}>
      <div className={css.content_wrapper}>
        <Image src={Logo} alt="Leleka" className={css.logo} />

        <h1 className={style.title}>Вхід</h1>
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

              <Button type="submit">Увійти</Button>
              {/* <Button type="button" alternative={true} styles={{ gap: 12 }}>
                <Icon name="Google" />
                Увійти через Google
              </Button> */}
            </Form>
          )}
        </Formik>
        <div className={css.nav_link_block}>
          <span>Немає аккаунту?</span>
          <Link href={'/auth/register'} className={style.link}>
            Зареєструватися
          </Link>
        </div>
      </div>
    </div>
  );
}
