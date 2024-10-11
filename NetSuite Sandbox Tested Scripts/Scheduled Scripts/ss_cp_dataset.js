/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */

/**
 * This Scheduled Script creates a Dataset for the Custom People Record filtered by the Verify Field
 */
define(['N/dataset', 'N/query'], (dataset, query) => {
    function execute(context) {
        // Creating Dataset Columns
        let fnameCol = dataset.createColumn({
            fieldId : 'custrecord_firstname',
            label : 'First Name'
        });
        let lnameCol = dataset.createColumn({
            fieldId : 'custrecord_lastname',
            label : 'Last Name'
        });
        let bdayCol = dataset.createColumn({
            fieldId : 'custrecord_birthday',
            label : 'Birthday'
        });
        let emailCol = dataset.createColumn({
            fieldId : 'custrecord_email',
            label : 'Email'
        });
        let verifiedCol = dataset.createColumn({
            fieldId : 'custrecord_verify',
            label : 'Verified'
        });

        // Creating the Custom People Dataset with the Filter Condition for Verify Field
        const CUSTOM_PEOPLE_DATASET = dataset.create({
            type : 'customrecord_custom_people',
            columns : [fnameCol, lnameCol, bdayCol, emailCol, verifiedCol],
            condition : dataset.createCondition({
                column : verifiedCol,
                operator : query.Operator.IS,
                values : [true]
            })
        });
        log.debug('Dataset Creation', 'Creating Verified Custom People Dataset.');
        
        try {
            // Saving the Dataset
            CUSTOM_PEOPLE_DATASET.save({
                id : 'custdataset_custom_people_verified',
                name : 'Verified Custom People Dataset'
            });
            log.debug('Dataset Creation', 'Verified Custom People Dataset has been saved.');
        } catch (error) {
            log.error('Dataset Error', error);
        }
    }

    return {
        execute : execute
    };
});