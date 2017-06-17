import getDataIndex from './BaseActions';
import { GET_ARCHITECTURE,  GET_PARK } from '../constants/catalog';
import { SELECT_MATERIAL } from '../constants/product';

export let architecture = () => getDataIndex('architecture', GET_ARCHITECTURE);
export let park = () => getDataIndex('park', GET_PARK);
export let selectType = (value = 'marble') => getDataIndex('decoration', SELECT_MATERIAL, {type: 'type', value });