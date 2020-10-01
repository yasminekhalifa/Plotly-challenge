  // var sample_value = data.names;
  //   console.log(sample_value)})
    function populateFilter() {
      // Let's populate the <option> elements in 
      // our <select> from the database. 
      d3.json("./../../samples.json").then(function(data){

        var filerOptions = ["All"];
        filerOptions = filerOptions.concat(data.names);
        console.log(filerOptions);
    
        d3.select("#selDataset")
          .selectAll("option")
          .data(filerOptions)
          .enter()
          .append("option")
          .text(d => d);
        // Bind an event to refresh the data
        // when an option is selected.
        d3.select("#selDataset").on("change", refreshCharts);
      });
    }
    populateFilter();
    function refreshCharts(event) {
      // event.target will refer tp the selector
      // from which we will get the selected option
      var selectedValue = d3.select("#selDataset").property('value');
      console.log(selectedValue);
      // With the selectedValue we can refresh the charts
      // filtering if needed. 
      buildareaBarChart(selectedValue);
    }
    // function buildareaBarChart(selectedArea) {
    //   let xl = [];
    //   let yl = [];
    //     for (var i = 0; i < data.samples.length; i++) {
    //       xl.push(data.samples[i].sample_values)
    //       yl.push(data.samples[i].durationminutes)
    //     }
    
    //     let trace = {
    //       x: xl,
    //       y: yl,
    //       marker: {
    //         color: '#37536D'
    //       },
    //       type: 'bar'
    //     };
    //     let layout = {
    //       title: 'Duration per parking space',
    //       yaxis: { title: 'Sample value' },
    //       xaxis: { title: 'OTU ID' , type: "category"}
    //     };
    //     Plotly.plot('plot', [trace], layout, { displayModeBar: false });
    
    //   });
    // }
    populateFilter();
    // buildareaBarChart();
    //Use `sample_values` as the values for the bar chart.
  //   const myUsers = [
  //     { name: 'shark', likes: 'ocean' },
  //     { name: 'turtle', likes: 'pond' },
  //     { name: 'otter', likes: 'fish biscuits' }
  // ]
  
  // const usersByLikes = myUsers.map(item => {
  //     const container = {};
  
  //     container[item.name] = item.likes;
  //     container.age = item.name.length * 10;
  
  //     return container;
  // })
  
  // console.log(usersByLikes);
    // * Use `otu_ids` as the labels for the bar chart.
    
    // * Use `otu_labels` as the hovertext for the chart.