export const createChartTemplate = (chartData, title) => {
  return `
  <style> .anychart-credits { display: none; } </style>
  <script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-base.min.js" type="text/javascript"></script>
  
  <div id="container" style="width: 100%; height: ${50 * chartData.length}px;"></div>
  
  <script>
    anychart.onDocumentReady(function() {
      var data = {
        header: ["Component name", "Occurrences"],
        rows: ${JSON.stringify(chartData)}
      }
      // create the chart
      var chart = anychart.bar();
    
      // add data
      chart.data(data);
      chart.labels(true);
    
    
      // set the chart title
      chart.title("${title}");
    
      // draw
      chart.container("container");
      chart.draw();
    });
  </script>`
}