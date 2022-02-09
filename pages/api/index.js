import { GET, POST } from './Fetch';

class API {
    constructor() {
        this.url = process.env.NEXT_PUBLIC_API_URL;
        this.org = process.env.NEXT_PUBLIC_ORG;
        this.prefix = process.env.NEXT_PUBLIC_NAME;
    }

    async getRepo() {
        return await GET(`${this.url}/orgs/${this.org}/repos`);
    }

    async search({ query }) {
        return await GET(`${this.url}/search/repositories?q=${query}+org:${this.org}`);
    }

    // spinner
    Loading(start) { }
    UpdateCartNumber(number) { }
}

let Api = new API();
export default Api;

