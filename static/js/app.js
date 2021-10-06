const samples = '/static/js/samples.json'
const data = d3.json(samples);

let select = document.getElementById("selDataset");

data.then((a) => {
    for(let j = 0; j < a.names.length; j++) {
      let opt = a.names[j];
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
  }
});

let selectM = d3.select("#sample-metadata");
selectM.attr("class", "card");

d3.select('#mdata-card').remove();

function optionChanged(sel) {
    $('.mdata-card').remove();
    data.then((ugh) => {
        let valueID = new Array();
        valueID.push(ugh.names.indexOf(sel))
        let samples = ugh.samples[valueID].sample_values.slice(0,10);
        let sortedSamples = samples.sort((a, b) => a - b);
        let sampleIDs = ugh.samples[valueID].otu_ids.slice(0,10);
        
        let mdata = ugh.metadata[valueID];
        
        let labelArray = [];
        for (let q = 0; q < samples.length; q++) {
            labelArray.push(`OTU ${sampleIDs[q]} `)
        }

        let container = selectM.append('div').attr("class", "mdata-card");;
        for (const [key, value] of Object.entries(mdata)) {
                container.append('p').text(`${key}: ${value}`);
        }

        let trace = {
            x: sortedSamples,
            y: labelArray.reverse(),
            type: "bar",
            orientation: "h",
            marker: {
                color: 'rgb(213, 229, 153)'
              }
        };
          
        let traceData = [trace];
          
        let layout = {
            margin: {
              l: 100,
              r: 100,
              t: -100,
              b: 100
            }
        };
          
        Plotly.newPlot("bar", traceData, layout);
        let labelArray1 = [];
        for (let q = 0; q < samples.length; q++) {
            labelArray1.push(`OTU ${ugh.samples[valueID].otu_ids[q]} `)
        }
        let trace1 = {
            x: ugh.samples[valueID].otu_ids,
            y: ugh.samples[valueID].sample_values,
            text: labelArray1,
            mode: 'markers',
            marker: {
              color: ugh.samples[valueID].otu_ids,
            //   opacity: [1, 0.8, 0.6, 0.4],
              size: ugh.samples[valueID].sample_values
            },
            orientation: "h"
          };
          
        let traceData1 = [trace1];
          
        let layout1 = {
            showlegend: false,
            height: 600,
            width: 1000
        };
          
        Plotly.newPlot('bubble', traceData1, layout1);

        // let trace2 = {
        //     hole: 0.4, 
        //     type: 'pie', 
        //     marker: {
        //     colors: ['#f8f3ec', '#f4f1e4', '#e9e6c9', '#e5e8b0', '#d5e599', '#b7cd8f', '#8ac086', '#89bc8d', '#84b589'], 
        //     hoverinfo: 'label', 
        //       labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9']
        //     }, 
        //     text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'], 
        //     rotation: 90, 
        //     textinfo: 'text', 
        //     direction: 'clockwise', 
        //     values: [9, 9, 9, 9, 9, 9, 9, 9, 9, 81], 
        //     showlegend: false, 
        //     textposition: 'inside'
        //   };
        //   data2 = [trace2];
        //   layout2 = {
        //     title: 'Belly Button Washing Frequency - Scrubs per Week', 
        //     xaxis: {
        //       range: [-1, 1], 
        //       visible: false
        //     }, 
        //     yaxis: {
        //       range: [-1, 1], 
        //       visible: false
        //     }, 
        //     shapes: [
        //       {
        //         x0: 0.5, 
        //         x1: ugh.metadata[valueID].wfreq / 6, 
        //         y0: 0.5, 
        //         y1: 0.6, 
        //         line: {
        //           color: 'black', 
        //           width: 3
        //         }, 
        //         type: 'line'
        //       }
        //     ], 
        //     autosize: true
        //   };
        // Plotly.newPlot('gauge', data2, layout2);
    });
}
optionChanged();

// function init() {
  


// };

// init();