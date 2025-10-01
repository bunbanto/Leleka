import React from 'react';
import type { StaticImageData } from 'next/image';

import Image from 'next/image';
import css from '../../app/(auth routes)/auth/Page.module.css';

type ImageProps = { image: string | StaticImageData };

function Decor({ image }: ImageProps) {
  return (
    <div className={css.image_wrapper}>
      <Image
        src={image}
        alt="Registration background image"
        width={720}
        height={900}
      />
    </div>
  );
}

export default Decor;
