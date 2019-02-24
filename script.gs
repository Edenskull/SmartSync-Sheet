function run() {
    var smartSheetID = "ID_SMARTSHEET";
    var smartSheetToken = "TOKEN";
    var sheet = SpreadsheetApp.openById("SHEET_ID").getSheets()[0];
    var url = "https://api.smartsheet.com/2.0/sheets/" + smartSheetID;
    var response = UrlFetchApp.fetch(
        url, { headers: {Authorization: 'Bearer ' + smartSheetToken}}
    );
    var result = JSON.parse(response.getContentText());
    sheet.clear();
    for(var row in result.rows){
        var cells = result.rows[row]["cells"];
        var tab = [];
        for(var cell in cells){
            var value = cells[cell]["value"] == undefined ? "" : cells[cell]["value"];
            tab.push(value);
        }
        sheet.appendRow(tab);
    }
}
