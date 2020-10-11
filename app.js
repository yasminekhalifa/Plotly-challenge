    d3.json("samples.json").then(function(data) {
    function populateFilter() {
        var filerOptions = ["All"];
        filerOptions = filerOptions.concat(data.names);
    
        d3.select("#selDataset")
          .selectAll("option")
          .data(filerOptions)
          .enter()
          .append("option")
          .text(d => d);
        d3.select("#selDataset").on("change", refreshCharts);

      };
    populateFilter();
    function filterIds(selectedId) {
      return data.samples.find(s => s.id == selectedId)
};
    function filterData(selectedId) {
      return data.metadata.find(d => d.id == selectedId)
    };
    function appendData(mainContainer,data) {
      mainContainer.innerHTML = "";
      for (var i = 0; i < Object.keys(data).length; i++) {
        var div = document.createElement("div");
        div.innerHTML = Object.keys(data)[i]+": "+Object.values(data)[i]
        mainContainer.appendChild(div);
      }
    }
    function refreshCharts(event) {
      var selectedValue = d3.select("#selDataset").property('value');
      var filteredData = filterIds(selectedValue)
      var metaData = filterData(selectedValue)
      var summaryTable = document.getElementById("sample-metadata");
      appendData(summaryTable, metaData);

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

      var bar = {
                  x: x_values, 
                  y: y_values,   
                  text: text,     
                  type: "bar", 
                  orientation: "h" 
          };
          var setLayout = {
                  title: "Bacteria found",
                  yaxis: { title: 'OTU IDs', type: "category" },
                  xaxis: { title: 'Sample values' }
          };
          var data = [bar];
          Plotly.newPlot("bar", data, setLayout);

      var trace1 = {
        x: filteredData.otu_ids,
        y: filteredData.sample_values,
        mode: 'markers',
        text: filteredData.otu_labels,
        marker: {
          color: [filteredData.otu_ids],
          size: filteredData.sample_values
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Marker Size and Color',
        showlegend: false
      };
      
      Plotly.newPlot('bubble', data, layout);
  };
  });