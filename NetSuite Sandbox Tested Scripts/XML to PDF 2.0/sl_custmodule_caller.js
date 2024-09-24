/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

/**
 * XML to PDF 2.0
 * The only purpose of this Suitelet, currently, is to pass the Record ID 
 * from the User Event Script into the Custom Module.
 */

// This Suitelet defines the Custom Module as a dependency
define(['./custmodule_customPeoplePdf'], (customPeoplePdf) => {
    function onRequest(context) {

        // This script only triggers on POST Method
        if (context.request.method === 'POST') {

            // Storing the Custom People Record Internal ID
            let id = context.request.parameters.recId;

            // Creating an object to be used as a parameter for the method from the Custom Module
            let params = {
                personId : id
            };

            // Calling the renderPdf(param) method from the Custom Module
            let xmlString = customPeoplePdf.renderPdf(params);
        }
    }

    return {
        onRequest : onRequest
    };
});