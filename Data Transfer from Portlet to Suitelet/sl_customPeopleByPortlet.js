/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

/** This is the Suitelet Called by the pl_customPeoplePortletForm.js to pass the data to the Custom People Record */
define(['N/record', 'N/format'], (record, format) => {
    function onRequest(context) {

        // The script will only run on the 'POST' method
        if (context.request.method === 'POST') {

            // Storing the Field Values that are sent by the Custom Form Portlet
            let fnamefield = context.request.parameters.firstname;
            let lnamefield = context.request.parameters.lastname;
            let mnamefield = context.request.parameters.middlename;
            let birthdayfield = context.request.parameters.birthday;
            let phonefield = context.request.parameters.phone;
            
            // Initializing the Custom People Record Creation
            let personRecord = record.create({
                type : 'customrecord_custom_people'
            });

            // Setting Custom People Field Values with Custom Form Portlet Field Values
            personRecord.setValue({
                fieldId : 'custrecord_firstname',
                value : fnamefield
            });
            personRecord.setValue({
                fieldId : 'custrecord_lastname',
                value : lnamefield
            });
            personRecord.setValue({
                fieldId : 'custrecord_middlename',
                value : mnamefield
            });
    
            personRecord.setValue({
                fieldId : 'custrecord_birthday',
                value : format.parse({
                    value : birthdayfield,
                    type : format.Type.DATE
                })
            });
            personRecord.setValue({
                fieldId : 'custrecord_message',
                value : 'This record is submitted by a Portlet form to a Suitelet'
            });
            personRecord.setValue({
                fieldId : 'custrecord_phone',
                value : phonefield
            });
    
            // Try/Catch Block to handle possible errors and log the script's processes
            try {
                let personRecordId = personRecord.save();
                log.debug('Creating Custom People', `Creating ${fnamefield} ${lnamefield} Custom Person with ID: ${personRecordId}`)
                context.response.write(`Custom Person ${fnamefield} ${lnamefield} has been created with ID: ${personRecordId}`);
            } catch (error) {
                log.error('Something went wrong while creating record', error)
                context.response.write('You have encountered an error: ' + error)
            }
    
        }
    }

    return {
        onRequest : onRequest
    };
});