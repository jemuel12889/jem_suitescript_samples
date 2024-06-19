/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */

define(['N/record',], function(rec) {
    function updateShippingItem(context) {
        var customerId = context.newRecord.getValue({
            fieldId : 'entity'
        });

        var shippingItem = getDefaultShippingItem();

        if (!(customerId && shippingItem)) {
            return;
        }

        rec.submitFields({
            type : rec.Type.CUSTOMER,
            id : customerId,
            values : {
                "shippingitem" : shippingItem,
                "comments" : "Default shipping item changed"
            },
            options : {
                enableSourcing : true,
                ignoreMandatoryFields : false
            }
        });
    }

    function getDefaultShippingItem() {

    }

    return {
        afterSubmit : updateShippingItem
    };
});