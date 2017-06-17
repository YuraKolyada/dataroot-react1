import {START_LOADING} from '../constants/product';
import IndexApi from '../api/IndexApi';

const Api = new IndexApi();

let actionsRequest = (API) =>
	(methodUrl, actionName, params = '') => 
		(dispatch) => {
			dispatch({
				type: START_LOADING
			}); 
			return API[methodUrl].call(API, params)
				.then(response => response.json())
				.then(payload => dispatch({
					type: actionName,
					payload,
				}))
				.catch(error => console.log(error));
		}


let getDataIndex = actionsRequest(Api);


export default getDataIndex; 
