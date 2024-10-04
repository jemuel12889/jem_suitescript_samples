/**
 * @NApiVerions 2.1
 */

/**
 * This Custom Module is responsible for disabling the "isCurrent" Field and setting its value
 * based on whether the "enddate" field is populated or not
 */
define(['N/currentRecord'], (currentRec) => {
    // "lineCount" parameter is the number of Sublist Lines the current Record has
    function disableExistingIsCurrentField(lineCount) {
        // Using currentRecord.get() to access the current record for this Custom Module
        const peopleRec = currentRec.get();

        // Iterating through all Sublist Lines based on the "lineCount" parameter value
        log.debug('Iterating Sublist Lines', `This sublist has ${lineCount} lines.`);
        for (let i = 0; i < lineCount; i++) {
            // Selecting current line of the current iteration
            peopleRec.selectLine({
                sublistId : 'recmachcustrecord1',
                line : i
            });

            console.log(`Processing Line#${i}`);

            // Retrieving End Date Field Value
            let enddate = peopleRec.getCurrentSublistValue({
                sublistId : 'recmachcustrecord1',
                fieldId : 'custrecord_enddate'
            });

            // Accessing the isCurrent Field
            let isCurrentField = peopleRec.getSublistField({
                sublistId : 'recmachcustrecord1',
                fieldId : 'custrecord_iscurrent',
                line : i
            });

            // Evaluating End Date Field Value
            if (enddate != '' || enddate) {
                // If End Date is empty, disable the isCurrent Field and set its value to false
                console.log(`Disabling isCurrent Field for line #${i}`);
                peopleRec.setCurrentSublistValue({
                    sublistId : 'recmachcustrecord1',
                    fieldId : 'custrecord_iscurrent',
                    value : false
                });
                isCurrentField.isDisabled = true;
                
            } else if (enddate == '' || !enddate) {
                // If End Date is not empty, set its value to true
                peopleRec.setCurrentSublistValue({
                    sublistId : 'recmachcustrecord1',
                    fieldId : 'custrecord_iscurrent',
                    value : true
                });
            }

            // Commit the line change
            peopleRec.commitLine({
                sublistId : 'recmachcustrecord1'
            });
        }
    }
    
    return {
        disableExistingIsCurrentField : disableExistingIsCurrentField
    };
});