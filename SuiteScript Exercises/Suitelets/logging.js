/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

define(['N/record','N/log'], function(rec, log) {
    
    function removeLine(){
        log.audit({ title : "removeLine" });
        var index = red.findSublistLineWithValue({
            sublistId : 'item',
            fieldId : 'item',
            value : 77
        });

        log.debug({ details : "index = " + index });
    
        if (index === -1) {
            log.audit({ details : "Could not find item." });
            return;
        }
    
        try {
            rec.removeLine({
                sublistId : "item",
                line : index
            });
        } catch (e) {
            log.error({
                title : "Error removing line item",
                details : e.message
            });
        }
    }

});