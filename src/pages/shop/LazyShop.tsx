import { lazy } from 'react';

export const LazyShop = lazy(() => import(/* webpackChunkName: "page-shop" */ './Shop'));
