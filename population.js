const promise = require('bluebird');
const axios = require('axios');

axios.get('http://api.population.io:80/1.0/population/2017/Belarus/')
    .then(function (response) {
        if (response.data.length > 0) {
            let total = 0;
            for (let i = 0; i < response.data.length; i++){
                total += response.data[i].total;
            }
            console.log('Население: ' + total);
        }
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });