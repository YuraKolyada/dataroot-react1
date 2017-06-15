import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import intl from './intl';
import selectMaterial from './materials';
import PageHomeData from './HomeReducers';
import PageCatalogData from './CatalogReducers';

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    user,
    runtime,
    intl,
    selectMaterial,
    PageHomeData,
    PageCatalogData
  });
}
