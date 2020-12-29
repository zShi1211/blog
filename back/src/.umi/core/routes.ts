// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'C:/Users/12/Desktop/blog/back/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.jsx').default,
    "routes": [
      {
        "path": "/addArticle",
        "exact": true,
        "component": require('@/pages/addArticle/index.jsx').default
      },
      {
        "path": "/debrisWord",
        "exact": true,
        "component": require('@/pages/debrisWord/index.jsx').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index/index.jsx').default
      },
      {
        "path": "/leaveWord",
        "exact": true,
        "component": require('@/pages/leaveWord/index.jsx').default
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('@/pages/login/index.jsx').default
      },
      {
        "path": "/updataPwd",
        "exact": true,
        "component": require('@/pages/updataPwd/index.jsx').default
      },
      {
        "path": "/upload",
        "exact": true,
        "component": require('@/pages/upload/index.jsx').default
      },
      {
        "path": "/userInfo",
        "exact": true,
        "component": require('@/pages/userInfo/index.jsx').default
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
