import {SELECT_MATERIAL, SELECT_START_LOAD, SELECT_MATERIAL_ERROR} from '../constants/product';



const getInitialState = {
	listMaterials: [{key: 1, name: "мармур", type: 'marble'}, 
				{key: 2, name: "граніт", type: 'granite'},
				{key: 3, name: "пісковик", type: 'sandstone'},
				{key: 4, name: "вапняк", type: 'limestone'},
				{key: 5, name: "квацит", type: 'quartzite'},
				{key: 6, name: "онікс", type: 'onyx'},],

	selectedMaterial: [{
		img: '',
		alt: ''
	}],

	error: false
}

export default function selectMaterial(state=getInitialState, action){

	switch(action.type){
		case SELECT_START_LOAD: 
			return {
				...state,
				error: true,
			}
		case SELECT_MATERIAL_ERROR:
			return {
				...state,
				error: true,
			}
		case SELECT_MATERIAL:
			return {
				...state,
				selectedMaterial: action.payload,
				error: false,
			}
	}
	return state;
}