

export default class Api {
	constructor(){
		this.Url = 'http://maysternja.dataroot.co/'
	}


	fetch(url, params = {}){
		return fetch(url, params);
	}

	options(object) {
		if (!object && (typeof object === 'object')) return "";

		return '?' + encodeURIComponent(object.type) + '=' + encodeURIComponent(object.value);
	}

	get(url, params){
		return this.fetch(this.Url + url + this.options(params));
	}

	post(url, body){
		let formdata = new FormData(body);
		return this.fetch(this.Url + url, {
			method: 'POST',
			body: formdata
		})

	}

}