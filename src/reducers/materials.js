import {SELECT_MATERIAL} from '../constants/product';
import material1 from "../image/material1.png";
import material2 from "../image/material2.png";
import material3 from "../image/material3.png";
import material4 from "../image/material4.png";
import material5 from "../image/material5.png";


const getInitialState = {
	listMaterials: [{key: 1, name: "мармур", type: 'marble'}, 
				{key: 2, name: "граніт", type: 'granite'},
				{key: 3, name: "пісковик", type: 'sandstone'},
				{key: 4, name: "вапняк", type: 'limestone'},
				{key: 5, name: "квацит", type: 'kvatsyt'},
				{key: 6, name: "онікс", type: 'onyx'},],

	optionsMaterials: {
		1: {
			photos: [material1, material2, material3, material4, material5],
			classNameId: 1,
			type: 'marble'
		},
		2: {
			photos: [material1, material4, material5, material3, material2],
			classNameId: 2,
			type: 'granite'
		},
		3: {
			photos: [material2, material4, material5, material3, material1],
			classNameId: 3,
			type: 'sandstone'
		},
		4: {
			photos: [material1, material4, material5, material3, material2],
			classNameId: 4,
			type: 'limestone'
		},
		5: {
			photos: [material1, material3, material5, material3, material4],
			classNameId: 5,
			type: 'kvatsyt'
		},
		6: {
			photos:[material4, material1, material5, material3, material2],
			classNameId: 6,
			type: 'onyx'
		},
	},

	selectedMaterial: {
		photos: [material1, material2, material3, material4, material5],
		classNameId: 1,
		type: 'marble'
	}
}

export default function selectMaterial(state=getInitialState, action){

	switch(action.type){
		case SELECT_MATERIAL:
			return {
				...state,
				selectedMaterial: state.optionsMaterials[action.payload],
			}
	}
	return state;
}