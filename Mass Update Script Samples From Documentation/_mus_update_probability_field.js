/**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(['N/record'], (record) => {
    function each(params) {
        // Load the Opportunity Record
        let recOpportunity = record.load({
            type : params.type,
            id : params.id
        });

        // Set the Probability Field value to 61%
        recOpportunity.setValue('probability', 61);
        recOpportunity.save();
    }

    return {
        each : each
    };
});