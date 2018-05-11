var Eml2Pdf = require('eml-to-pdf')
var eml2pdf = new Eml2Pdf("sample9.eml");
eml2pdf.renameFile();

eml2pdf.convertEMLtoPDF();
