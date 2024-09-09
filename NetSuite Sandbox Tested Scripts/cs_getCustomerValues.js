/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 */

define([], function() {
    function pageInit(context) {
        var currentRecord = context.currentRecord;

        var customerName = currentRecord.getValue({
            fieldId : 'altname'
        });

        var customerTypeValue = currentRecord.getValue({
            fieldId : 'isperson'
        });

        var customerTypeText = currentRecord.getText({
            fieldId : 'isperson'
        });

        var jobTitle = currentRecord.getValue({
            fieldId : 'title'
        });

        var entityStatusValue = currentRecord.getValue({
            fieldId : 'entitystatus'
        });

        var entityStatusText = currentRecord.getText({
            fieldId : 'entitystatus'
        });

        var subsidiaryValue = currentRecord.getValue({
            fieldId : 'subsidiary'
        });

        var subsidiaryText = currentRecord.getText({
            fieldId : 'subsidiary'
        });

        console.log("Customer: " + customerName);
        console.log("Customer Type: " + customerTypeValue + ": " + customerTypeText);
        console.log("Job Title: " + jobTitle);
        console.log("Status: " + entityStatusValue + ": " + entityStatusText);
        console.log("Subsidiary: " + subsidiaryValue + ": " + subsidiaryText);
    }

    return {
        pageInit : pageInit
    }
});