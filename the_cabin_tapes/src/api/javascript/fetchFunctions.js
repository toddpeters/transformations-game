// global.fetch = require('node-fetch');
const url = 'http://127.0.0.1:5000/';

const fetchFunctions = {

    async postData(url, data = {}) {
                                                    // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST',                         // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',                           // no-cors, *cors, same-origin
            cache: 'no-cache',                      // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin',             // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'          
                                                    // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',                     // manual, *follow, error
            referrer: 'no-referrer',                // no-referrer, *client
            body: JSON.stringify(data)              // body data type must match "Content-Type" header
        });

        const json = await response.json();         // parses JSON response into native JavaScript objects
        json.status = response.status;
        json.statusText = response.statusText;
        return json;
    },

    async getData(url) {
                                                    // Default options are marked with *
        const response = await fetch(url)
        //     method: 'GET',     // *GET, POST, PUT, DELETE, etc.
        //     mode: 'same-origin', // no-cors, *cors, same-origin
        //     cache: 'no-cache',  // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: 'same-origin', // include, *same-origin, omit
        //     headers: {
        //         'Content-Type': 'application/json'
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     redirect: 'follow',         // manual, *follow, error
        //     referrer: 'no-referrer',    // no-referrer, *client
        // });

        const json = await response.json();    // parses JSON response into native JavaScript objects
        json.status = response.status;
        json.statusText = response.statusText;
        return json;
    },

    async loadData(userName) {
        return await this.getData(url + 'user/' + userName);
    },

    async registerUser(user) {
        console.log(url +'register',user)
        // return await this.postData(url +"user", user)
        return await this.postData(url + 'register/', user);
    },

    async loginUser(userName) {
        return await this.postData(url + 'user/' + userName + '/login'); //this could be a get (we don't provide request data)
    },
}

export default fetchFunctions;