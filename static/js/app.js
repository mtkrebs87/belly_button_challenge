//Read in the json file from URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Promise Pending
const dataPromise = d3.json(url);

console.log("Data Promise: ", dataPromise);

//Fetch JSON data and log it
d3.json(url).then(function(data) {
    console.log(data);
});

//Initialize the dashboard with default plot
function init() {

    //Select dropdown menu with D3
    let dropdownMenu = d3.select("#selDataset");

    //Assign values from the dataset
    let dataset = dropdownMenu.names;

    //
}

// //Create horizontal bar chart with dropdown menu - displays top 10 otus
// //sort search data results
// let sorteddata = dataPromise.sort((a, b) => b.sample_values - a.sample_values);

// //slice objects for plotting
// let slicedData = sorteddata.slice(0, 10);

// //reverse array to accomodate Plotly's defaults
// slicedData.reverse();

// //Trace1 = top 10 OTU data
// let trace1 = {
//     x: slicedData.map(object => object.sample_values),
//     y: slicedData.map(object => object.otu_ids),
//     text: slicedData.map(object => object.otu_ids),
//     name: "IDs",
//     type: "bar",
//     orientation: "h"
// };

// //Data Array
// let data = [trace1];

// //Apply title to layout
// let layout = {
//     title: "Top 10 OTU's Per Individual",
//     margin: {
//         l: 100,
//         r: 100,
//         t: 100,
//         b: 100
//     }
// };

// //Render the plot to the div tab with id "plot"
// Plotly.newPlot("plot", data, layout);