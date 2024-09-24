/**
 * customPeoplePdf.js
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

/**
 * XML to PDF 2.0
 * For the second version, this process uses this Custom Module to separate the PDF rendering functionality
 * into a different script.
 * This contains the same logic from the previous version's Suitelet Script
 */
define(['N/render', 'N/file', 'N/record'], (render, file, record) => {
    function renderXmlToPdf(context) {

        // Loads a Custom People Record based on the ID that is passed from the UserEventScript through the Suitelet
        let personRecord = record.load({
            type : 'customrecord_custom_people',
            id : context.personId
        });

        // Creating a TemplateRenderer Object
        let renderer = render.create();

        // Loading XML File containing PDF Template from the File Cabinet
        let xmlFile = file.load({
            id : 18497
        });

        // Setting XML File content as the tamplate content of the TemplateRenderer
        renderer.templateContent = xmlFile.getContents();

        // Binding the Custom People Record instance as the Data Source for the template
        renderer.addRecord({
            templateName : 'record',
            record : personRecord
        });

        let fname = personRecord.getValue({
            fieldId : 'custrecord_firstname'
        });
        let lname = personRecord.getValue({
            fieldId : 'custrecord_lastname'
        });

        // Converting the populated template into an XML String
        let xmlString = renderer.renderAsString();

        // Converting the XML String into PDF
        let pdfFile = render.xmlToPdf(xmlString);
        try {

            // Saving the PDF File into the File Cabinet
            pdfFile.folder = 13726;
            pdfFile.name = `${fname} ${lname} Report`;
            pdfFile.save();
            log.debug('File Saved', 'PDF File has been saved to File Cabinet');
        } catch (error) {
            log.error('Render Failure', error);
        }
        return xmlString;
    }
    
    return {
        renderPdf : renderXmlToPdf
    };
});