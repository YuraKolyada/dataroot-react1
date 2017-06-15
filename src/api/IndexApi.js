import Api from './ApiRequest';


export default class IndexApi extends Api {
	about(params) {
		return this.get(`about/`, params)
	}

	park(params) {
		return this.get(`catalog/park/`, params)
	}

	architecture(params) {
		return this.get(`catalog/architecture/`, params)
	}

	decoration(params) {
		return this.get(`catalog/decoration/`, params)
	}

	projects(params) {
		return this.get(`projects/`, params)
	}

	callback(body) {
		return this.post('callback/', body)
	}
}
