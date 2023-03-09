const anychart = require('anychart')

const rows = [
    {
        "name": "Icon",
        "value": 30
    },
    {
        "name": "Button",
        "value": 14
    },
    {
        "name": "TextBlock",
        "value": 7
    },
    {
        "name": "TableCell",
        "value": 6
    },
    {
        "name": "EmptyState",
        "value": 5
    },
    {
        "name": "Author",
        "value": 3
    },
    {
        "name": "BottomSheetBase",
        "value": 3
    },
    {
        "name": "CreatorRow",
        "value": 3
    },
    {
        "name": "SegmentedControl",
        "value": 3
    },
    {
        "name": "Avatar",
        "value": 2
    },
    {
        "name": "BackButton",
        "value": 2
    },
    {
        "name": "LocationPicker",
        "value": 2
    },
    {
        "name": "NativePicker",
        "value": 2
    },
    {
        "name": "Tooltip",
        "value": 2
    },
    {
        "name": "DetailHeader",
        "value": 2
    },
    {
        "name": "DetailCover",
        "value": 1
    },
    {
        "name": "BadgeLevel",
        "value": 1
    },
    {
        "name": "CardCreator",
        "value": 1
    },
    {
        "name": "CardPost",
        "value": 1
    },
    {
        "name": "CreatorStatus",
        "value": 1
    },
    {
        "name": "NotificationsList",
        "value": 1
    }
]

anychart.onDocumentReady(function() {

  var data = {
    header: ["Component name", "Occurrences"],
    rows: rows.filter(r => r.value > 1)
  }
  // create the chart
  var chart = anychart.bar();

  // add data
  chart.data(data);
  chart.labels(true);


  // set the chart title
  chart.title("Instantly Component occurences");

  // draw
  chart.container("container");
  chart.draw();
});
