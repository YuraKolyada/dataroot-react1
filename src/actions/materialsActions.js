import {SELECT_MATERIAL} from '../constants/product';

export function selectMaterial(index){
	return (dispatch) => {
		dispatch({
			type: SELECT_MATERIAL,
			payload: index
		});
	}
}