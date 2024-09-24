/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */

/**
 * XML to PDF 1.0
 * This is the first version of Rendering a Custom People Record into a PDF Template.
 * This User Event Script calls a Suitelet in the afterSubmit Entry Point and passes
 * the record instance's Internal ID as a parameter
 */
define(['N/https', 'N/url'], (https, url) => {
    function afterSubmit(context) {
        // Script only runs in 'EDIT' context
        if (context.type !== context.UserEventType.EDIT) {
            return;
        }

        // Accessing the current Record Object
        let person = context.newRecord;

        try {
            log.debug('Calling Suitelet', 'Sending request to Suitelet');
            
            // Calling the Suitelet with a POST Method with the Record ID as part of the Request Body
            https.requestSuitelet({
                deploymentId : 'customdeploy_sl_render_custpeople_pdf',
                scriptId : 'customscript_sl_render_custpeople_pdf',
                body : {
                    recId : person.id
                },
                method : 'POST'
            });
        } catch (error) {
            log.error('Call to Suitelet Failure', error);
        }
    }

    return {
        afterSubmit : afterSubmit
    };
});