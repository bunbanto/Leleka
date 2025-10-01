'use client';
import React, { useState } from 'react';
import css from './Header.module.css';
import Logo from '@/public/icons/Logo.svg';
import SidebarContent from '../Sidebar/SidebarContent';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '../ui/Icon/Icon';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const toggleOpen = () => {
    if (open) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 300);
    } else {
      setOpen(true);
    }
  };

  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300);
  };

  return (
    <>
      <header className={css.header}>
        <Link href="/" className={css.logo_link}>
          <Image src={Logo} alt="Logo company" className={css.logo} />
        </Link>
        <button onClick={toggleOpen} className={css.burgerButton}>
          <svg width="22" height="16">
            <use href="/sprite.svg#burger" />
          </svg>
        </button>
      </header>

      {open && (
        <div className={css.overlay} onClick={closeMenu}>
          <div className={`${css.menu} ${closing ? css.closing : ''}`}>
            <SidebarContent
              open={open}
              onLinkClick={closeMenu}
              onClose={closeMenu}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
