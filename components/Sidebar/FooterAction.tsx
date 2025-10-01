'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import css from './Sidebar.module.css';

import { logout } from '@/lib/api/clientApi';
import Image from 'next/image';

import Avatar from '@/public/img/avatarPreview.png';
import { Icon } from '../ui/Icon/Icon';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function FooterAction() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();

  const { isAuthenticated, user } = useAuthStore();

  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/auth/login');
  };

  if (!isAuthenticated) {
    return (
      <div className={css.footer_action}>
        <Link href={'/auth/login'}>Увійти</Link>
        <span></span>
        <Link href={'/auth/register'}>Зареєструватись</Link>
      </div>
    );
  }

  return (
    <>
      <div className={css.user_wrapper}>
        <Image
          src={user?.avatar || Avatar}
          alt="Avatar"
          width={40}
          height={40}
          className={css.user_avatar}
        />
        <div className={css.user_content}>
          <span>{user?.name}</span>
          <span>{user?.email}</span>
        </div>
        <Icon name={'exit'} width={18} action={() => setConfirmOpen(true)} />
      </div>
      {confirmOpen && (
        <ConfirmationModal
          title="Ви точно хочете вийти?"
          handler={() => handleLogout()}
          onClose={() => setConfirmOpen(false)}
        />
      )}
    </>
  );
}

export default FooterAction;
