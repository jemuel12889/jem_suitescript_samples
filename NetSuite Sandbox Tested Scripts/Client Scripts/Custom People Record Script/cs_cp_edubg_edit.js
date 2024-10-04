/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */

/**
 * Client Script to execute in the Custom People (Custom Record Type) to disable
 * "isCurrent" Sublist Field and set its value to "false" when "enddate" Field is populated.
 * Its value is set to "true" if the "enddate" Field is empty
 */
define(['N/currentRecord', './custmodule_sublist_disable'], (currentRec, disable) => {
    function pageInit(context) {
        // Script executes on the EDIT context
        if (context.mode !== 'edit') {
            return;
        }

        // Instantiate the current record
        const peopleRec = context.currentRecord;

        // Get the number of Sublist lines
        // Sublist ID is based on the Custom People and Educational Background Records' Parent-Child Relationship
        // 'recmachcustrecord1' is the Educational Background Sublist
        let lineCount = peopleRec.getLineCount({
            sublistId : 'recmachcustrecord1'
        });

        // Call function to disable "isCurrent" Field from Custom Module
        log.debug('Custom Module Call', 'Calling disableExistingIsCurrentField() Function from Custom Module');
        disable.disableExistingIsCurrentField(lineCount);
    }

    return {
        pageInit : pageInit
    };
});