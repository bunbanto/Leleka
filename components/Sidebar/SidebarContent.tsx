'use client';
import React from 'react';
import Link from 'next/link';

import css from './Sidebar.module.css';
import Logo from '@/public/icons/Logo.svg';
// import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import FooterAction from './FooterAction';
import { Icon } from '../ui/Icon/Icon';

interface SidebarContentProps {
  onLinkClick?: () => void;
  onClose?: () => void;
  open?: boolean;
}

const SidebarContent = ({
  onLinkClick,
  onClose,
  open,
}: SidebarContentProps) => {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Мій день', icon: 'my-day', w: 20, h: 22 },
    { href: '/journey', label: 'Подорож', icon: 'journey', w: 22, h: 20 },
    { href: '/diary', label: 'Щоденник', icon: 'dairy', w: 18, h: 22 },
    { href: '/profile', label: 'Профіль', icon: 'profile', w: 22, h: 22 },
  ];

  return (
    <aside className={css.sidebar} onClick={e => e.stopPropagation()}>
      <Link href="/" className={css.logo_link}>
        <Image src={Logo} alt="Logo company" className={css.logo} />
      </Link>

      <nav className={css.sidebarNav}>
        {open && (
          <button className={css.closeButton} onClick={onClose}>
            <Icon name={'close_btn'} width={14} height={14}></Icon>
          </button>
        )}
        <ul>
          {links.map(link => (
            <li key={link.href}>
              <Link
                onClick={onLinkClick}
                href={link.href}
                className={`${css.navItem} ${
                  link.href === '/'
                    ? pathname === '/' && css.active
                    : pathname.startsWith(link.href) && css.active
                }`}
              >
                <svg width={link.w} height={link.h}>
                  <use href={`/sprite.svg#${link.icon}`} />
                </svg>
                <p>{link.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* FOOTER */}

      <FooterAction />
    </aside>
  );
};

export default SidebarContent;
