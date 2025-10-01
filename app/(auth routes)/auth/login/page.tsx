'use client';
import { useWindowWidth } from '@/hooks/useWindowWidth';

import Decor from '../../../../components/Decor/Decor';
import Form from './LoginForm';

import css from '../Page.module.css';

import image from '@/public/img/logx2.jpg';
import Loader from '@/components/ui/Loader/Loader';
import { useAuthStore } from '@/lib/store/authStore';

export default function RegisterPage() {
  const { isLoaded, user, isAuthenticated } = useAuthStore();

  const usePageWidth = useWindowWidth();

  if (isLoaded && !user && !isAuthenticated) return <Loader />;

  return (
    <main className={css.wrapper}>
      <Form />
      {usePageWidth >= 920 && <Decor image={image} />}
    </main>
  );
}
