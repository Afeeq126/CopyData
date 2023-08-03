function sendingEodQueueSpecific() {
  const ss = SpreadsheetApp.openById("14uqbTPA8KLneTdAYg7PusbzZ69BK-UMpbNOmKGwVKJQ");
  const eodTemplete = ss.getSheetByName("EOD Templete");
  const queuespecificCount = ss.getSheetByName("QueueWiseCounts");

   // EOD heads
   const head1 = eodTemplete.getRange("A1:H1").getValues();
   const manag = head1[0][0];
   const managname = head1[0][1];
   const head2 = eodTemplete.getRange("A2:H2").getValues();
   const process = head2[0][0];
   const processname = head2[0][1];
   const pocs = eodTemplete.getRange("A3:H3").getValues();
   const poc = pocs[0][0];
   const pocname = pocs[0][1];
   const headers = eodTemplete.getRange("A4:H4").getValues();
   const auditor = headers[0][0];
   const task = headers[0][1];
   const count = headers[0][2];
   const target = headers[0][3];
   const product = headers[0][4];
   const hours = headers[0][5];
   const timeoff = headers[0][6];
   const notes = headers[0][7];

   //Queue specific heads

   const queueSpecificHead1 = queuespecificCount.getRange("A1").getValues();
   const queues = queueSpecificHead1[0][0];

   const queueSpecificHeaders = queuespecificCount.getRange("A2:G2").getValues();
   const qsauditor = queueSpecificHeaders[0][0];
   const qsimage = queueSpecificHeaders[0][1];
   const qsmodcp = queueSpecificHeaders[0][2];
   const qsmodemea = queueSpecificHeaders[0][3];
   const qshivol = queueSpecificHeaders[0][4];
   const qshiimp = queueSpecificHeaders[0][5];
   const qsother = queueSpecificHeaders[0][6];

  //EOD Total line
  const lr = eodTemplete.getLastRow();
  const tablevalues = eodTemplete.getRange(5, 1,lr-5,8).getDisplayValues();

  const totalline = eodTemplete.getRange(lr,1,1,8).getDisplayValues();
  const grandtotal = totalline[0][0];
  const countsum = totalline[0][2];
  const targetsum = totalline[0][3];
  const productsum = totalline[0][4];

  //Queue specific count total line
  const qSlr = queuespecificCount.getLastRow();
  const qSpecificTableconts = queuespecificCount.getRange(3, 1,qSlr-3,7).getDisplayValues();
 
  const qStotalline = queuespecificCount.getRange(qSlr,1,1,7).getDisplayValues();
  const qsgrandtotal = qStotalline[0][0];
  const qsimagesum = qStotalline[0][1];
  const qsmodcpsum = qStotalline[0][2];
  const qsmodemeasum = qStotalline[0][3];
  const qshivolsum = qStotalline[0][4];
  const qshiimpsum = qStotalline[0][5];
  const qsothersum = qStotalline[0][6];

  //EOD HTML 
  const htmlTemplete = HtmlService.createTemplateFromFile("EOD&QS");


  htmlTemplete.manag = manag;
  htmlTemplete.managname = managname;
  htmlTemplete.process = process;
  htmlTemplete.processname = processname;
  htmlTemplete.poc = poc;
  htmlTemplete.pocname = pocname;
  htmlTemplete.auditor = auditor;
  htmlTemplete.task = task;
  htmlTemplete.count = count;
  htmlTemplete.target = target;
  htmlTemplete.product = product;
  htmlTemplete.hours = hours;
  htmlTemplete.timeoff = timeoff;
  htmlTemplete.notes = notes;
  htmlTemplete.grandtotal = grandtotal;
  htmlTemplete.countsum = countsum;
  htmlTemplete.targetsum = targetsum;
  htmlTemplete.productsum = productsum;
  htmlTemplete.tablevalues = tablevalues;


  //Queuespecific HTML
 

  htmlTemplete.queues = queues;
  htmlTemplete.qsauditor = qsauditor;
  htmlTemplete.qsimage = qsimage;
  htmlTemplete.qsmodcp = qsmodcp;
  htmlTemplete.qsmodemea = qsmodemea;
  htmlTemplete.qshivol = qshivol;
  htmlTemplete.qshiimp = qshiimp;
  htmlTemplete.qsother = qsother;
  htmlTemplete.qsgrandtotal = qsgrandtotal;
  htmlTemplete.qsimagesum = qsimagesum;
  htmlTemplete.qsmodcpsum = qsmodcpsum;
  htmlTemplete.qsmodemeasum = qsmodemeasum;
  htmlTemplete.qshivolsum = qshivolsum;
  htmlTemplete.qshiimpsum = qshiimpsum;
  htmlTemplete.qsothersum = qsothersum;
  htmlTemplete.qSpecificTableconts = qSpecificTableconts;

 
  const htmlForEmail = htmlTemplete.evaluate().getContent();
 

  //Sending Mail


  // use below line for morning and afternoon shift
  //const date = Utilities.formatDate(new Date(),Session.getTimeZone,"dd-MM-yyyy");

  var timeZone = CalendarApp.getDefaultCalendar().getTimeZone();
  var date = new Date();
  var yesterday = new Date(new Date().setDate(date.getDate() - 1));
  var yestdate = Utilities.formatDate(yesterday, timeZone,"dd-MM-yyyy")

  const mailId = "bharatpandey-all@yahooinc.com";
  const subject = "GEMINI EOD REPORT - " + yestdate;
  const mailBody = 'Hi Team,  Please find the EOD report attached.';
  const mailCc = "prabathk@yahooinc.com" + "," + "chandanan.gowda@yahooinc.com";
  const senderName = "Afeeq Zabiulla";
  GmailApp.sendEmail(mailId, subject, mailBody,
  { name:senderName,
    cc:mailCc,
    htmlBody: htmlForEmail }
  );

}