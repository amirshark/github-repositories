import { trackPromise } from 'react-promise-tracker';

export async function GET(url, headers = {}){
	try{
		var respond = await trackPromise(fetch(url,{
			method:"GET",
			headers:{
				'Content-Type':"application/json;charset=UTF-8",
				"Accept":"application/json, application/vnd.github.v3+json, text/plain, */*",
				...headers
			}
		}));

		let text = await respond.text();
		let json = validJson(text);

		if (respond.ok){
			return JSON.parse(text);
		} else if(json.errors) {
			let {errors} = json;

			if(errors){
				var key = Object.keys(errors)[0];
				throw new FetchError( errors[key][0], respond.status, url );
			}
		} else {
			throw new FetchError(text, respond.status, url);
		}
	} catch(err) {
		throw err;
	}
}

export async function POST(url, data, headers = {}){
	try{
		var respond = await trackPromise(fetch(url,{
			method:"POST",
			body:JSON.stringify(data),
			headers:{
				'Content-Type':"application/json;charset=UTF-8",
				"Accept":"application/json, application/vnd.github.v3+json, text/plain, */*",
				...headers
			}
		}));

		let text = await respond.text();
		let json = validJson(text);

		if (respond.ok){
			return JSON.parse(text);
		} else if(json.errors) {
			let {errors} = json;

			if(errors){
				var key = Object.keys(errors)[0];
				throw new FetchError( errors[key][0], respond.status, url );
			}
		} else {
			throw new FetchError(text, respond.status, url);
		}
	}  catch (err) {
		throw err;
	}
}

export async function POSTFORM(url, data, headers = {}){
	try{
		var respond = await trackPromise(fetch(url,{
			method:"POST",
			body:data,
			headers:{
				'Content-Type': 'multipart/form-data',
				"Accept":"application/json, text/plain, */*",
				"Cache-Control":"no-cache",
				...headers
			}
		}));

		let text = await respond.text();
		let json = validJson(text);

		if (respond.ok){
			return JSON.parse(text);
		} else if(json.errors) {
			let {errors} = json;

			if(errors){
				var key = Object.keys(errors)[0];
				throw new FetchError( errors[key][0], respond.status, url );
			}
		} else {
			throw new FetchError(text, respond.status, url);
		}
	}  catch (err) {
		throw err;
	}
}

function validJson(str) {
	try {
		return JSON.parse(str);
	} catch (e) {
		return false;
	}
}

class FetchError extends Error {
	constructor(message, status, url){
		super();

		this.name = "Fetch";
		this.message = message;
		this.status = status;
		this.url = url;
	}
}