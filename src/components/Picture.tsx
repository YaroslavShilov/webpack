import React from 'react';
import classNames from 'classnames';

/*
<Picture
	src={require('../assets/img.webp')
	fallbackSrc={require('../assets/img.png') // if browser doesn't support webp
	alt="Image"
	width={1036} // use for reserving a place during loading the page
	height={598} // use for reserving a place during loading the page
	media="(max-width: 768px)" // if display is smaller than 768px
	mediaSrc={require('../assets/img-mob.webp')
	mediaFallbackSrc={require('../assets/img-mob.png')
/>
*/

interface IPicture {
  className?: string;
  src: string;
  fallbackSrc: string;
  media?: string;
  mediaSrc?: string;
  mediaFallbackSrc?: string;
  alt: string;
}

type Picture = IPicture & React.ImgHTMLAttributes<HTMLImageElement>;

export const Picture: React.FC<Picture> = ({
  className,
  src,
  fallbackSrc,
  mediaSrc,
  mediaFallbackSrc,
  media,
  alt,
  ...props
}) => {
  if (media && (!mediaSrc || !mediaFallbackSrc)) {
    throw new Error('Picture.tsx: You add media but did not add mediaSrc AND mediaFallbackSrc');
  }

  const extension = src.slice(src.lastIndexOf('.') + 1);
  const type = `image/${extension}`;

  return (
    <picture className={classNames(className)}>
      {media && (
        <>
          <source type={type} srcSet={mediaSrc} media={media} />
          <source srcSet={mediaFallbackSrc} media={media} />
        </>
      )}
      <source type={type} srcSet={src} />
      <img src={fallbackSrc} loading="lazy" decoding="async" alt={alt} {...props} />
    </picture>
  );
};
