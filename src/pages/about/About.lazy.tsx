import { lazy } from 'react';

export const LazyAbout = lazy(() => import(/* webpackChunkName: "page-about" */ './About'));
