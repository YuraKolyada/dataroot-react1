import {GET_PROJECTS, GET_ABOUT, CALLBACK_REQUEST} from '../constants/home';



const getInitialState = {
	project: [],
	about: {},
	textRequest: {},
	fetching: false,
}

export default function PageHomeData(state = getInitialState, action){

	switch(action.type){
		case GET_PROJECTS:
			return {
				...state,
				project: action.payload,
				fetching: false,
			}
		case GET_ABOUT:
			return {
				...state,
				about: action.payload,
				fetching: false,
			}
		case CALLBACK_REQUEST:
			return {
				...state,
				textRequest: action.payload,
				fetching: false,
			}
	}
	return state;
}