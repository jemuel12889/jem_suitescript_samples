/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/log'], (rec, log) => {
    function myBeforeLoad(context) {
        var salesOrderRec = rec.load({
            type : rec.Type.SALES_ORDER,
            id : 0
        });

        var sublistLineCount = salesOrderRec.getLineCount({
            sublistId : 'item'
        });

        for (var i = 0; i < sublistLineCount; i++) {

            var sublistItem = salesOrderRec.getSublistValue({
                sublistId : 'item',
                fieldId : 'item',
                line : i
            });
    
            var sublistDescription = salesOrderRec.getSublistValue({
                sublistId : 'item',
                fieldId : 'description',
                line : i
            });
    
            var sublistRate = salesOrderRec.getSublistValue({
                sublistId : 'item',
                fieldId : 'rate',
                line : i
            });
    
            var sublistAmount = salesOrderRec.getSublistValue({
                sublistId : 'item',
                fieldId : 'amount',
                line : i
            });
    
            log.debug("Item Name", sublistItem);
            log.debug("Item Description", sublistDescription);
            log.debug("Item Rating", sublistRate);
            log.debug("Item Amount", sublistAmount);
        }

    }

    return {
        beforeLoad : myBeforeLoad
    };
});