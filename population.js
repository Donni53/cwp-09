const Promise = require('bluebird');
const axios = require('axios');

let req = [];

let populationCanada = "http://api.population.io:80/1.0/population/2017/Canada/";
let populationGermany = "http://api.population.io:80/1.0/population/2017/Germany/";
let populationFrance = "http://api.population.io:80/1.0/population/2017/France/";
let populationBelarus2015 = "http://api.population.io:80/1.0/population/2015/Belarus/";
let populationBelarus2016 = "http://api.population.io:80/1.0/population/2016/Belarus/";

axios.get('http://api.population.io:80/1.0/population/2017/Belarus/')
    .then(function (response) {
        if (response.data.length > 0) {
            let total = 0;
            for (let i = 0; i < response.data.length; i++){
                total += response.data[i].total;
            }
            console.log();
            console.log('Население: ' + total);
        }
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });

req.push(axios.get(populationCanada));
req.push(axios.get(populationGermany));
req.push(axios.get(populationFrance));

Promise.all(req)
    .then((results) => {
        console.log();
        console.log("Promise.all");
        results.forEach((obj) => {
            let total = 0;
            obj.data.forEach((ageGroup) => {
                total += ageGroup.total;
            });
            console.log(total);
        });
    })
    .catch((err) => {

        console.error("Promise.all ERROR " + err);
    });


Promise.any([axios.get(populationBelarus2015), axios.get(populationBelarus2016)]).then((results) => {
    let total = 0;
    console.log();
    console.log("Promise.any");
    results.data.forEach((ageGroup) => {
        if (ageGroup.age === 25)
            total += ageGroup.total;
    });
    console.log(total);
}).catch((error) => {
    console.error("Promise.any ERROR " + error);
});

/*Promise.props({
    test: axios.get(""),
    tset: axios.get("")
}).then((result) => {
    console.log();
    console.log("Promise.props");
    Object.values(result).forEach((prop) => {
        prop.data.results.forEach((val) => {
            console.log(val.name);
        });
    })

    return
}).catch((error) => {
    console.error(error);
});
*/

let arr = [1,2,3,4,5];

Promise.map(arr, (id) => {
    return axios.get("http://api.population.io:80/1.0/countries");
}).then((res) => {
    console.log("Promise.map");
    res.forEach((obj) => {
        console.log(obj.countries);
    });
}).catch((error => {
    console.error("Promise.map ERROR " + error);
}))