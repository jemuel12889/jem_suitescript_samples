/**
 * @NApiVersion 2.1
 */

define(['N/currentRecord', 'N/record'], (currentRecord, record) => {
    function verifyPerson() {
        // Retrieving the Internal ID of the Current Record
        let currecord = currentRecord.get();
        let recordId = currecord.id;

        // Loading the Current Record using the N/record Module to enable setting values in VIEW context
        let newRecord = record.load({
            type : 'customrecord_custom_people',
            id : recordId
        });

        // Determine the current value of the Verify Checkbox
        let isVerified = newRecord.getValue({
            fieldId : 'custrecord_verify'
        });

        try {
            if (isVerified) {
                // If checked, the button click will uncheck the checkbox
                log.debug('Button Click', 'Button has been clicked');
                newRecord.setValue({
                    fieldId : 'custrecord_verify',
                    value : false
                });    
                log.debug('Verified', 'Current Record has now been verified');
            } else {
                // if unchecked, the button click will check the checkbox
                log.debug('Button Click', 'Button has been clicked');
                newRecord.setValue({
                    fieldId : 'custrecord_verify',
                    value : true
                });
                log.debug('Unverified', 'Current Record has now been unverified');
            }

            // Save the changes in the Record
            newRecord.save();

            // Reloading the page to show the changes
            window.location.reload();
        } catch (error) {
            log.error('Error Verifying', error);
        }
    }

    return {
        verifyPerson : verifyPerson
    };
});