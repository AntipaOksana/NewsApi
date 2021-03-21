import axios from "axios";

class ApiServices {
    constructor() {
        this.url = 'https://newsapi.org/v2/'
    }

    getRequest(endpoint, query) {
        try {
            return axios.get(`${this.url}${endpoint}`, {
                params: {
                    ...query,
                    apiKey: '173ba3b47dbd47999df111ac0f52b447'
                }
            }).then((res)=> res.data)
        } catch (e) {

        }
    }

}

export default ApiServices