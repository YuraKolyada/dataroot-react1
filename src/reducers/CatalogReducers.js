import {GET_ARCHITECTURE, GET_PARK} from '../constants/catalog';



const getInitialState = {
	architecture: [],
	park: [],
}

export default function PageCatalogData(state = getInitialState, action){

	switch(action.type){
		case GET_PARK:
			return {
				...state,
				park: action.payload
			}
		case GET_ARCHITECTURE:
			return {
				...state,
				architecture: action.payload
			}
	}
	return state;
}