const samples = './static/js/samples.json'
const data = d3.json(samples);

let select = document.getElementById('selDataset');

data.then((a) => {
    for(let j = 0; j < a.names.length; j++) {
      let opt = a.names[j];
      let el = document.createElement('option');
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
  }
});

function init() {
  
  optionChanged('940')
  
};
  
init();

let selectM = d3.select('#sample-metadata');
selectM.attr('class', 'card');

function optionChanged(sel) {
    $('.mdata-card').remove();
    data.then((ds) => {
        let valueID = new Array();
        valueID.push(ds.names.indexOf(sel))
        let samples = ds.samples[valueID].sample_values.slice(0,10);
        let sortedSamples = samples.sort((a, b) => a - b);
        let sampleIDs = ds.samples[valueID].otu_ids.slice(0,10);
        
        let mdata = ds.metadata[valueID];
        
        let labelArray = [];
        for (let q = 0; q < samples.length; q++) {
            labelArray.push(`OTU ${sampleIDs[q]} `)
        }

        let container = selectM.append('div').attr('class', 'mdata-card');;
        for (const [key, value] of Object.entries(mdata)) {
                container.append('p').text(`${key}: ${value}`);
        }
        let config = {responsive: true}

        let trace = {
            x: sortedSamples,
            y: labelArray.reverse(),
            type: 'bar',
            orientation: 'h',
            marker: {
                color: ds.samples[valueID].otu_ids
              }
        };
          
        let traceData = [trace];
          
        let layout = {
            height: 500,
            width: 580,
            title: `<b style='font-size:1.25em;'>Top Samples</b>`,
            margin: {
              l: 100,
              r: 100,
              t: 60,
              b: 20
            }
        };
          
        Plotly.newPlot('bar', traceData, layout, config);


        let labelArray1 = [];
        for (let q = 0; q < samples.length; q++) {
            labelArray1.push(`OTU ${ds.samples[valueID].otu_ids[q]} `)
        }

        let trace1 = {
            x: ds.samples[valueID].otu_ids,
            y: ds.samples[valueID].sample_values,
            text: labelArray1,
            mode: 'markers',
            marker: {
              color: ds.samples[valueID].otu_ids,
              size: ds.samples[valueID].sample_values
            },
            orientation: 'h'
          };
          
        let traceData1 = [trace1];
          
        let layout1 = {
            showlegend: false,
            height: 600,
            width: 800,
            title: `<b style='font-size:1.5em;'>Total Samples</b>`
        };
          
        Plotly.newPlot('bubble', traceData1, layout1, config);

        let wfreqVal = ds.metadata[valueID].wfreq;

        if (wfreqVal == 0) {
          xvalue = 0.15,
          yvalue = 0.22
        } else if (wfreqVal == 1) {
          xvalue = 0.16,
          yvalue = 0.35
        } else if (wfreqVal == 2) {
          xvalue = 0.23,
          yvalue = 0.47
        } else if (wfreqVal == 3) {
          xvalue = 0.33,
          yvalue = 0.55
        } else if (wfreqVal == 4) {
          xvalue = 0.445,
          yvalue = 0.6
        } else if (wfreqVal == 5) {
          xvalue = 0.56,
          yvalue = 0.6
        } else if (wfreqVal == 6) {
          xvalue = 0.675,
          yvalue = 0.56
        } else if (wfreqVal == 7) {
          xvalue = 0.75,
          yvalue = 0.46
        } else if (wfreqVal == 8) {
          xvalue = 0.805,
          yvalue = 0.345
        } else if (wfreqVal == 9) {
          xvalue = 0.81,
          yvalue = 0.22
        } else {
          xvalue = 0.15,
          yvalue = 0.22
        };
        
        let data2 = [
            {
                mode: 'gauge',
                type: 'indicator',
                value: wfreqVal,
                title: `<b style='font-size:1.35em;'>Belly Button Washing Frequency</b> <br> Scrubs per Week`, 
                gauge: {
                    shape: 'angular',
                    bar: { color: "#d75d4790", width: 2 },
                    borderwidth: 0,
                    axis: {
                        range: [0,9],
                        visible: true,
                        tickmode: 'array',
                        tickvals: [0,1,2,3,4,5,6,7,8,9],
                        tickwidth: 2, 
                        tickcolor: "darkblue",
                        ticks: 'outside'
                    },
                    steps: [
                        {range: [0, 1],color: '#f8f3ec'},
                        {range: [1, 2],color: '#f4f1e4'},
                        {range: [2, 3],color: '#e9e6c9'},
                        {range: [3, 4],color: '#e5e8b0'},
                        {range: [4, 5],color: '#d5e599'},
                        {range: [5, 6],color: '#b7cd8f'},
                        {range: [6, 7],color: '#8ac086'},
                        {range: [7, 8],color: '#89bc8d'},
                        {range: [8, 9],color: '#84b589'}
                    ]
                }
            }
        ]
        
        let layout2 = {
          height: 550,
          width: 580,
          xaxis: {range: [0, 1], showgrid: false, 'zeroline': false, 'visible': false, fixedrange: true},
          yaxis: {range: [0, 1], showgrid: false, 'zeroline': false, 'visible': false, fixedrange: true},
          showlegend: false,
          annotations: [
            {
              ax: 0.5,
              ay: 0.22,
              axref: 'x',
              ayref: 'y',
              x: xvalue,
              y: yvalue,
              xref: 'x',
              yref: 'y',
              showarrow: true,
              arrowhead: 100,
              arrowwidth: 3,
              arrowhead: 3,
              arrowsize: 1,
            }
          ]
        };
        Plotly.newPlot('gauge', data2, layout2, config);
    });
}



// optionChanged();

