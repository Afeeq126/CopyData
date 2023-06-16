function copyQCdataBP() {
  var ss = SpreadsheetApp.openById("1J_gpn8Lks82Os0foSj6Ft9dIaTcCT_O2A0CccDKMr1s");
  var sheet = ss.getSheetByName("QC Data");

  var ss1 = SpreadsheetApp.openById("1ndKT9TL1ScPHbjQxGkSU75CC8VM1vk6Ew42w_OAFrF8");
  var sheet1 = ss1.getSheetByName("Team Bharat");

  var ss2 = SpreadsheetApp.openById("1dZzDkNkY5tf3M-6NdqAZOlb4WjfdhPTgg31qOyGv_J0");
  var sheet2 = ss2.getSheetByName("Quality");

  var ss3 = SpreadsheetApp.openById("1mqFHSBB10d9UYuBdnSRE7Xe2EB-BQ1Wqu6z0wHeyd2E");
  var sheet3 = ss3.getSheetByName("QC Data");

  var data = sheet.getRange(2,1,sheet.getLastRow(),8).getValues();

  sheet1.getRange(sheet1.getLastRow()+1,1,sheet.getLastRow(),8).setValues(data);
  sheet2.getRange(sheet2.getLastRow()+1,1,sheet.getLastRow(),8).setValues(data);
  //sheet3.getRange(sheet3.getLastRow()+1,1,sheet.getLastRow(),8).setValues(data);
  var sheet2lr = sheet2.getLastRow()-1;
  var range1 = sheet2.getRange(2,9,sheet2lr,1);
  var range2 = sheet2.getRange(2,10,sheet2lr,1);
  var range3 = sheet2.getRange(2,11,sheet2lr,1);
  var range4 = sheet2.getRange(2,12,sheet2lr,1);
  range1.setFormula('=TEXT(A2,"mmmm-yyyy")');
  range2.setFormula('=ArrayFormula("Q" & ROUNDUP(MONTH(A2)/3))');
  range3.setFormula('=YEAR(A2)');
  range4.setFormula("=INDEX('Helper Sheet'!$G$1:$G$12,MATCH(C2,'Helper Sheet'!$F$1:$F$12,0))");

}

function clearBP () {
  var ss = SpreadsheetApp.openById("1J_gpn8Lks82Os0foSj6Ft9dIaTcCT_O2A0CccDKMr1s");
  var sheet = ss.getSheetByName("QC Data");

  sheet.getRange(2,1,sheet.getLastRow(),8).clearContent();
  sheet.getRange(2,1,sheet.getLastRow(),8).clearContent();
}