/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */

/**
 * This User Event Script creates a Customer Record from a Custom People Record in the "CREATE" Context Type
 * It uses search.lookupFields(options) to lookup Field Values from the Custom People Record Instance
 * and passes them to set values to the new Customer Record
 */
define(['N/search', 'N/record'], (search, record) => {
    function afterSubmit(context) {
        // Retrieving ID of the current Custom People Record
        let personId = context.newRecord.id;

        // Using search.lookupFields(options) to lookup field values of the current Custom People Record
        let currentPersonFields = search.lookupFields({
            type : search.Type.CUSTOM_RECORD + '_custom_people',
            id : personId,
            columns : ['custrecord_firstname', 'custrecord_lastname', 'custrecord_phone']
        });

        // Creating the new Customer Record
        let newCustomer = record.create({
            type : record.Type.CUSTOMER
        });

        // Setting Field Values, some will be using values that come from the Lookup Fields
        newCustomer.setValue({
            fieldId : 'isperson',
            value : 'T'
        });
        newCustomer.setValue({
            fieldId : 'firstname',
            value : currentPersonFields.custrecord_firstname
        });
        newCustomer.setValue({
            fieldId : 'lastname',
            value : currentPersonFields.custrecord_lastname
        });
        newCustomer.setValue({
            fieldId : 'salesrep',
            value : 289
        });
        newCustomer.setValue({
            fieldId : 'email',
            value : `${currentPersonFields.custrecord_firstname.toLowerCase()}.${currentPersonFields.custrecord_lastname.toLowerCase()}@email.com`
        });
        newCustomer.setValue({
            fieldId : 'phone',
            value : currentPersonFields.custrecord_phone
        });
        newCustomer.setValue({
            fieldId : 'subsidiary',
            value : 1
        });

        // Saving the new Customer Record
        let newCustomerId = newCustomer.save();
        log.debug('Creating Record', `Customer Record #${newCustomerId} is created from Custom People ${currentPersonFields.custrecord_firstname} ${currentPersonFields.custrecord_lastname}.`);
    }

    return {
        afterSubmit : afterSubmit
    };
});