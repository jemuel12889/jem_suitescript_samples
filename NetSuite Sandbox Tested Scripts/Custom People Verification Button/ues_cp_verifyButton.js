/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */

/** 
 * This User Event Script adds a Custom Button into the Custom People Form in the View context
 * The Button labeled "Verify"/"Unverify", when clicked, calls a Custom Module to execute a function.
 * The purpose of the Button is to check/uncheck a "Verify" Checkbox which is processed using the Custom Module Script
 * The Event Type "VIEW" is selected in the Deployment Page as its trigger type
 */
define(['N/ui/serverWidget'], (serverWidget) => {
    function beforeLoad(context) {
        // This instantiates a current UI form
        let form = context.form;

        // The Current Record that is passed as part of the Context Parameters
        let curRecord = context.newRecord;

        // Determine the current value of the Verify Checkbox
        let isVerified = curRecord.getValue({
            fieldId : 'custrecord_verify'
        });

        // Sets the Custom Module to be used by the Button
        form.clientScriptModulePath = './custmodule_verifyperson.js';

        // Creating the Button and use the verifyPerson() function that is found in the Custom Module
        let verifyButton = form.addButton({
            id : 'custpage_verify',
            label : 'Verify',
            functionName : 'verifyPerson'
        });

        // Changing the Button Label depending on the value of the Verify Checkbox
        if (isVerified) {
            verifyButton.label = 'Unverify';
        } else {
            verifyButton.label = 'Verify';
        }
    }

    return {
        beforeLoad : beforeLoad
    };
});