    d3.json("./../../samples.json").then(function(data) {
      console.log(data);
    function populateFilter() {
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

      };
    populateFilter();
    function filterIds(selectedId) {
      return data.samples.find(s => s.id == selectedId)
};
    function refreshCharts(event) {
      // event.target will refer tp the selector
      // from which we will get the selected option
      var selectedValue = d3.select("#selDataset").property('value');
      console.log(selectedValue);
      var filteredData = filterIds(selectedValue)
      // With the selectedValue we can refresh the charts
      // filtering if needed. 

      console.log(filteredData);
    
      // Use the map method with the arrow function to return all the filtered movie titles.
      var bacterias = []
      for(var i in filteredData.sample_values){
        bacterias.push(
          {
            id:filteredData.otu_ids[i],
            values: filteredData.sample_values[i],
            label: filteredData.otu_labels[i]
          }
        )
      }
      var top_bacteria = bacterias.sort((a,b) => a.values > b.values ).slice(0,10);
      let x_values = top_bacteria.map(b => b.values);
      let y_values = top_bacteria.map(b => b.id);
      let text = top_bacteria.map(b => b.label);

      console.log(x_values);

      var bar = {
                  x: x_values,     //top 10 values
                  y: y_values,     // formatted ids
                  text: text,     //labels
                  type: "bar", //bar graphs
                  orientation: "h" //horizontal graphs
          };
          var setLayout = {
                  title: "Bacteria found",
                  yaxis: { title: 'OTU IDs', type: "category" },
                  xaxis: { title: 'Sample values' }
          };
          var data = [bar];
          Plotly.newPlot("bar", data, setLayout);

      var trace1 = {
        x: y_values,
        y: x_values,
        mode: 'markers',
        text: text,
        marker: {
          color: [y_values],
          opacity: [1, 0.8, 0.6, 0.4],
          size: x_values
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Marker Size and Color',
        showlegend: false,
      };
      
      Plotly.newPlot('bubble', data, layout);
  };
  });