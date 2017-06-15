import getDataIndex from './BaseActions';
import { GET_ARCHITECTURE,  GET_PARK } from '../constants/catalog';
export let architecture = () => getDataIndex('architecture', GET_ARCHITECTURE);
export let park = () => getDataIndex('park', GET_PARK);
