'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import css from './Breadcrumbs.module.css';

import Arrow from '@/public/icons/arrowRight.png';
import Image from 'next/image';

const routeNames: Record<string, string> = {
  '': 'Мій день',
  journey: 'Подорож',
  diary: 'Щоденник',
  profile: 'Профіль',
};

const Breadcrumbs = () => {
  const path = usePathname();
  const segments = path.split('/').filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = routeNames[segment] || decodeURIComponent(segment);
    return { href, label };
  });

  return (
    <ul className={css.breadcrumbsContainer}>
      <li className={css.crumb_item}>
        <Link href={'/'}>
          <span className={css.path_label}>Лелека</span>
        </Link>
        <Image className={css.arrow} src={Arrow} alt="Icon" />
      </li>
      {segments.length === 0 && (
        <li
          style={{
            color: `${path.includes('/') && 'var(--color-neutral)'}`,
          }}
        >
          <span>Мій день</span>
        </li>
      )}
      {breadcrumbs.map((crumb, index) => (
        <li
          key={crumb.href}
          style={{
            color: path.includes(crumb.href)
              ? 'var(--color-neutral)'
              : 'inherit',
          }}
          className={css.crumb_item}
        >
          <Link
            href={crumb.href}
            className={css.crumb_link}
            title={crumb.label}
          >
            {crumb.label}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <Image className={css.arrow} src={Arrow} alt="Icon" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
