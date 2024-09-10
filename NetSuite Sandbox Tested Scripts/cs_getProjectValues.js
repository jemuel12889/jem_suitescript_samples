/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 */

//This script is only used to get information about the Project Record Type
define([], function() {
    function pageInit(context) {
        var projectRecord = context.currentRecord;

        var projectName = projectRecord.getValue({
            fieldId : 'altname'
        });

        var parent = projectRecord.getValue({
            fieldId : 'parent'
        });
        var parentText = projectRecord.getText({
            fieldId : 'parent'
        });

        var expenseType = projectRecord.getValue({
            fieldId : 'projectexpensetype'
        });
        var expenseTypeText = projectRecord.getText({
            fieldId : 'projectexpensetype'
        });

        console.log("Project Name: " + projectName);
        console.log("Project Parent: #" + parent + " " + parentText);
        console.log("Project Expense Type: " + expenseType + " " + expenseTypeText);
    }

    return {
        pageInit : pageInit
    };
});
