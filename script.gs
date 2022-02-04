function run() {
    var smartSheetID = "ID_SMARTSHEET";
    var smartSheetToken = "TOKEN";
    var sheetName = "SHEET_NAME";
    var sheet = SpreadsheetApp.openById("SHEET_ID").getSheetByName(sheetName);
    var url = "https://api.smartsheet.com/2.0/sheets/" + smartSheetID;
    var response = UrlFetchApp.fetch(
        url, { headers: {Authorization: 'Bearer ' + smartSheetToken}}
    );
    var result = JSON.parse(response.getContentText());
    var tabResult = [];
    var colResult = [];
    sheet.clear();
    for(var col in result.columns){
        colResult.push(result.columns[col]["title"]);
    }
    tabResult.push(colResult);
    for(var row in result.rows){
        var cells = result.rows[row]["cells"];
        var tab = [];
        for(var cell in cells){
            var value = cells[cell]["value"] == undefined ? "" : cells[cell]["value"];
            tab.push(value);
        }
        tabResult.push(tab);
    }
    sheet.getRange(1, 1, tabResult.length, tabResult[0].length).setValues(tabResult);
}
