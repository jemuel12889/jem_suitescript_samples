/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

/**
 * XML to PDF 1.0
 * This is the Suitelet that is responsible for loading the Custom People Record
 * using the Internal ID passed from the User Event Script, then maps the record
 * field values into the PDF Template.
 * The resulting PDF file is then saved to the File Cabinet.
 */
define(['N/render', 'N/file', 'N/record'], (render, file, record) => {
    function onRequest(context) {
        // Script only triggers with POST method
        if (context.request.method === 'POST') {

            // Accessing the recId parameter value (Internal ID from User Event Script)
            let personid = context.request.parameters.recId;

            // Using the parameter value to retrieve the same Custom People Instance
            let personRecord = record.load({
                type : 'customrecord_custom_people',
                id : personid
            });

            // Creating a TemplateRenderer
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
                context.response.renderPdf(xmlString);
                log.debug('PDF Rendered', 'PDF is rendered successfully');
                pdfFile.folder = 13726;
                pdfFile.name = `${fname} ${lname} Report`;
                pdfFile.save();
                log.debug('File Saved', 'PDF File has been saved to File Cabinet');
            } catch (error) {
                log.error('Render Failure', error);
            }
        }
    }

    return {
        onRequest : onRequest
    };
});