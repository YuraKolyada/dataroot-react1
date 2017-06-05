import {SELECT_MATERIAL} from '../constants/product';

export function selectMaterial(type){
	return (dispatch) => {
		dispatch({
			type: SELECT_MATERIAL,
			payload: type
		});
	}
}