
import IndexApi from '../api/IndexApi';

const Api = new IndexApi();

let actionsRequest = (API) =>
	(methodUrl, actionName, params = '') => 
		(dispatch) => 
			API[methodUrl].call(API, params)
				.then(response => response.json())
				.then(payload => dispatch({
					type: actionName,
					payload,
				}))
				.catch(error => console.log(error));


let getDataIndex = actionsRequest(Api);


export default getDataIndex; 
