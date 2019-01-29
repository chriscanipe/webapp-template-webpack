const xlsx = require('node-xlsx');
const fs = require("fs");
const _ = require('lodash');
const request = require("request");
const async = require("async");
const json2csv = require('json2csv');
const d3 = require('d3');


let theData = {};
let theLookup = {};


var setData = {
    init: function(aca, pop) {

        //DO YOUR DATA STUFF HERE
        aca.forEach(d=> {
            theLookup[d.Location] = d;
        });

        pop.forEach(d=> {

            let aca17 = !theLookup[d.State] ? null : theLookup[d.State]["Total Individuals Who Have Selected a Marketplace Plan"];
            let pop17 = +d["2017"];
            let pct = numberFormat.rounded((aca17/pop17) * 100, 2);

            let obj = {
                aca17 : aca17,
                pop17 : pop17,
                pctEnrolled : pct
            }
                
            theData[d.State] = obj;

        });

        writeFile(theData);

    }



}


function writeFile(data) {

    //Stringify the data
    var theJson = JSON.stringify(data);

    //...and write it to an output.json file. (or whatever you want to call it)
    fs.writeFile("data.json", theJson, function(err) {
        if (err) return console.log(err);
        console.log('Data Success.');
    });


}





/* ===+===+===+===+===+===+=== */
/* D A T A   C A L L S 📞 */
/* ===+===+===+===+===+===+=== */

//SET UP YOUR DATA CALLS HERE.
//THIS HAPPENS IN AN ASYNC ARRAY SO TAHT WE CAN STACK MULTIPLE CALLS IF WE WANT TO
//JUST NEST THEM IN THE ARRAY
async.series(
    [

        function(callback) {//CSV EXAMPLE
            fs.readFile('hca_enrollment_dec17.csv', 'utf8', function(err, d) {
                let data = d3.csvParse(d); //USE THE D3 CSV PARSER TO GET OBJECT ARRAY
                callback(null, data);
            });
        },
        function(callback) { //EXCEL EXAMPLE
            var data = xlsx.parse('nst-est2017-01.xlsx'); 
            callback(null, data);
        }

    ],
    function(err, results) {

        // `results` is an array responses from the above requests
        // The Excel parser returns as an object that looks like this:

            // [{
            //     name : [[WORKSHEET NAME]]
            //     data : [[THIS DATA IS A RAW ARRAY OF ARRAYS]]
            // }]



        let hca = results[0];
        let pop = toObjectArray(results[1][1].data); //USE THE toObjectArray() FUNCTION TO CONVERT THE EXCEL DATA TO AN OBJECT ARRAY

        setData.init(hca, pop);

    }
)







/* ===+===+===+===+===+===+=== */
/* U T I L I T I E S */
/* ===+===+===+===+===+===+=== */


//Converts that crazy Excel data format into an object array.
function toObjectArray(origArray) {

    var newArray = [];
    for (var index = 1; index < origArray.length; index++) {
        newArray.push(_.zipObject(origArray[0], origArray[index]));
    }

    return newArray;

}


function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


const numberFormat = {
    rounded: function(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    },
    commas: function(val) {
        while (/(\d+)(\d{3})/.test(val.toString())) {
            val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
        }
        return val;
    },
    percent: function(val, decimals) {
        return numberFormat.rounded(val * 100, decimals).toFixed(decimals);
    },
    dollars: function(val) {
        return `$${numberFormat.commas(val)}`;
    }
}