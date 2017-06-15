import {SELECT_MATERIAL, SELECT_START_LOAD, SELECT_MATERIAL_ERROR} from '../constants/product';
import IndexApi from '../api/IndexApi';
const Api = new IndexApi();

export function selectMaterial(value){
	return (dispatch) => {
		dispatch({
			type: SELECT_START_LOAD
		});

		Api.decoration.call(Api, {
			type: 'type',
			value,
		})
			.then(response => response.json())
			.then(payload => dispatch({
				type: SELECT_MATERIAL,
				payload,
			}))
			.catch(error => dispatch({
				type: SELECT_MATERIAL_ERROR
			}));
	}
}