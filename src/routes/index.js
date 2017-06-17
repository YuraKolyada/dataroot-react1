/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */
import { projects, about } from './../actions/HomeActions';
import { park, architecture, selectType } from './../actions/CatalogActions';
// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,
    require('./catalog').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],

  async action({ next, store }) {
    // Execute each child route until one of them return the result
    const route = await next();
    await Promise.all([
      store.dispatch(projects()), 
      store.dispatch(about()),
      store.dispatch(park()),
      store.dispatch(architecture()),
      store.dispatch(selectType()),
    ])

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled'}`;
    route.description = route.description || '';

    return route;
  },

};
