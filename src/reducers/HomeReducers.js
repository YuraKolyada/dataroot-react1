import {GET_PROJECTS, GET_ABOUT, CALLBACK_REQUEST} from '../constants/home';



const getInitialState = {
	project: [],
	about: {},
	textRequest: {},
}

export default function PageHomeData(state = getInitialState, action){

	switch(action.type){
		case GET_PROJECTS:
			return {
				...state,
				project: action.payload
			}
		case GET_ABOUT:
			return {
				...state,
				about: action.payload
			}
		case CALLBACK_REQUEST:
			return {
				...state,
				textRequest: action.payload
			}
	}
	return state;
}