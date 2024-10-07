/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */

/**
 * Map/Reduce Script that creates a Search as its Data Source for the GetInputData Stage.
 * The Search results are then passed to the Map Stage to be used to load the Custom People Record Type.
 * Column values are then used to create an Email string with the Record's First Name and Last Name
 */
define(['N/search', 'N/record'], (search, record) => {
    function getInputData() {
        // Create a search for the Custom Record Type Custom People
        const PEOPLE_SEARCH = search.create({
            type : search.Type.CUSTOM_RECORD + '_custom_people',
            columns : ['custrecord_firstname', 'custrecord_lastname']
        });

        return PEOPLE_SEARCH;
    }

    function map(context) {
        // Retrieve key/value pairs passed from the GetInputStage
        let searchResults = JSON.parse(context.value);
        let personId = context.key;

        // Get the First Name and Last Name values and convert them to lower case strings
        let fname = searchResults.values.custrecord_firstname.toLowerCase();
        let lname = searchResults.values.custrecord_lastname.toLowerCase();

        // Loading the Custom People Record using its Internal ID from the context.key
        log.debug('Load Record', `Loading Custom People #${personId}: ${fname} ${lname}`);
        let personRecord = record.load({
            type : 'customrecord_custom_people',
            id : personId
        });

        // Check if Email Field is empty
        let email = personRecord.getValue({
            fieldId : 'custrecord_email'
        });

        if (email === '' || !email) {
            // If Email Field is empty, set its value using the First Name and Last Name values
            log.debug('Set Field Value', 'Setting value for Email Field.')
            personRecord.setValue({
                fieldId : 'custrecord_email',
                value : `${fname}.${lname}@email.com`
            });
        }

        // Saving the changes on the Custom People Record
        let recId;
        try {
            recId = personRecord.save();
            log.debug('Save Record', `Saving Custom People Record #${recId}`);
        } catch (error) {
            log.error('Error on Record', error);
        }

        context.write({
            key : recId
        });
    }

    function summarize(context) {
        log.audit({
            title : 'Custom People Success',
            details : `Custom People Email Set`
        });
    }

    return {
        getInputData : getInputData,
        map : map,
        summarize : summarize
    };
});