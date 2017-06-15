import getDataIndex from './BaseActions';
import { GET_PROJECTS,  GET_ABOUT, CALLBACK_REQUEST } from '../constants/home';
export let projects = () => getDataIndex('projects', GET_PROJECTS);
export let about = () => getDataIndex('about', GET_ABOUT);
export let callback = (body) => getDataIndex('callback', CALLBACK_REQUEST, body);