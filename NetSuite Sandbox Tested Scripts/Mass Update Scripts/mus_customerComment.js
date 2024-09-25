/**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */

/**
 * Mass Update Script to insert additional comments to the existing comment in the Customer Record Instances
 */
define(['N/record'], (record) => {
    function each(params) {
        // Loading Customer Record based on context parameters of the each(params) Entry Point
        let customerRec = record.load({
            type : params.type,
            id : params.id
        });

        // Retrieving the current Comments Field Value
        let currComment = customerRec.getValue({
            fieldId : 'comments'
        });

        // Adding additional comments to the current Comments Field Value
        customerRec.setValue({
            fieldId : 'comments',
            value : `${currComment}... Updated comment field through Mass Update Script.`
        });
        try {
            customerRec.save();
            log.debug('Customer Comment Update', 'Mass Update for Customer Record Comment is successful.');
        } catch (error) {
            log.error('Mass Update Error', error);
        }
    }

    return {
        each : each
    };
});
