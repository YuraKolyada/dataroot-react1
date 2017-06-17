import {SELECT_MATERIAL, START_LOADING} from '../constants/product';



const getInitialState = {
	listMaterials: [{key: 1, name: "мармур", type: 'marble'}, 
				{key: 2, name: "граніт", type: 'granite'},
				{key: 3, name: "пісковик", type: 'sandstone'},
				{key: 4, name: "вапняк", type: 'limestone'},
				{key: 5, name: "квацит", type: 'quartzite'},
				{key: 6, name: "онікс", type: 'onyx'},],
	startType: 'marble',
	selectedMaterial: [{
		img: '',
		alt: ''
	}],
	fetching: false,
}

export default function selectMaterial(state = getInitialState, action){

	switch(action.type){
		case START_LOADING: 
			return {
				...state,
				fetching: true,
			}
		case SELECT_MATERIAL:
			return {
				...state,
				selectedMaterial: action.payload,
				fetching: false,
				startType: '',
			}
	}
	return state;
}