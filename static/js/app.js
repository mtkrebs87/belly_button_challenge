//Read in the json file from URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

//Fetch JSON data and log it
d3.json(url).then(function(data) {
    console.log(data);
});

//Initialize dashboard on startup
function init() {

    //Use d3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    //Use d3 to get sample names and populate the dropdown menu
    d3.json(url).then(function(data) {

        //Sets variable for sample names
        let names = data.names;

        //Add samples to dropdown menu
        names.forEach(function(id) {

            //Log the value of the id for each iteration of the loop
            console.log(id);

            dropdownMenu.append("option").text(id).property("value",id);
        });

        //Set the first sample from the list
        let first_sample = names[0];

        //Log value of first_sample
        console.log(first_sample);

        //Build plots
        demoData(first_sample);
        barchart(first_sample);
        bubblechart(first_sample);
    });
};

//Function to build the bubblechart
function bubblechart(sample) {

    //use d3 to retrieve the data
    d3.json(url).then(function(data)  {

        //retrieve data from samples
        let sampleData2 = data.samples;

        //filter based on value of sample
        let value = sampleData2.filter(result => result.id == sample);

        //get first index from array
        let valueData = value[0];

        //set up trace for bubble chart
        let trace2 = {
            x: valueData.otu_ids,
            y: valueData.sample_values,
            text: valueData.otu_labels,
            mode: "markers",
            marker: {
                size: valueData.sample_values,
                color: valueData.otu_ids,
                colorscale: "Portland"
            }
        };

        //setup layout
        let layout = {
            title: "Number of Bacteria Per Subject",
            hovermode: "closest",
            xaxis: {title: "OTU IDs"},
        };

        //use Plotly to setup bubble chart
        Plotly.newPlot("bubble", [trace2], layout)
    });
};

//Function to build the bar chart
function barchart(sample) {

    //use d3 to retrieve the data
    d3.json(url).then(function(data) {

        //retrieve data from samples
        let sampleData = data.samples;

        //filter based on value of sample
        let value = sampleData.filter(result => result.id == sample);

        //Get first index from array
        let valueData = value[0];

        //Get otu_ids, otu_labels, sample_values)
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        //log data to console
        console.log(otu_ids, otu_labels, sample_values);

        //display the top 10 otus
        let xvalues = sample_values.slice(0,10).reverse();
        let yvalues = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        //create trace for bar chart
        let trace1 = {
            x: xvalues,
            y: yvalues,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        //setup layout
        let layout = {
            title: "Top 10 OTUs Per Subject"
        };

        //use plotly to set up bar chart
        Plotly.newPlot("bar", [trace1], layout)
    });
};


//Function to populate the demographic data
function demoData(sample) {

    //use d3 to retrieve the data
    d3.json(url).then(function(data)  {

        //retrieve all metagata for demographics table
        let metadata = data.metadata;

        //filter based on value of sample
        let value = metadata.filter(result => result.id == sample);

        //Log the array of the metadata objects after filtering
        console.log(value)

        //get index from array
        let subjectData = value[0];

        //clear metadata
        d3.select("#sample-metadata").html(" ");

        //use object.entries to add each key:value pair
        Object.entries(subjectData).forEach(function([key,value]) {

            //log key:value pairs
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

//Function to update dashboard when selection is changed
function optionChanged(first_sample) {

    //Log new value
    console.log(first_sample);

    //Call all functions
    demoData(first_sample);
    barchart(first_sample);
    bubblechart(first_sample);
};



//Call Initialize function
init();