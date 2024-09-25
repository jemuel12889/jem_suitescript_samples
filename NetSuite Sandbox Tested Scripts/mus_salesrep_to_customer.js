/**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */

/**
 * Mass Updating Customer Records to set 'myself' as the Sales Representative
 */
define(['N/record'], (record) => {
    function each(params) {
        // Loading Customer Record using context parameters of each(params) Entry Point
        let customerRec = record.load({
            type : params.type,
            id : params.id
        });

        // Retrieving Customer Name for logging purposes
        let name = customerRec.getValue({
            fieldId : 'altname'
        });

        // Setting the salesrep field value to the Employee Record Internal ID of 'myself'
        customerRec.setValue({
            fieldId : 'salesrep',
            value : 289
        });

        try {
            customerRec.save();
            log.debug('Add Sales Rep', `Added a Sales Representative for ${name}`);

        } catch (error) {
            log.error('Mass Update Error', error);
        }
    }

    return {
        each : each
    };
});