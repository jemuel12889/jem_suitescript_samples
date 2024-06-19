/**
 * @NApiVersion 2.x
 */

require(['N/currentRecord'], function(currentRecord) {
    var rec = currentRecord.get();
    rec.selectNewLine({
        sublistId : 'item'
    });

    rec.setCurrentSublistValue({
        sublistId : 'item',
        fieldId : 'item',
        value : 39,
        forceSyncSourcing : true
    });
    rec.setCurrentSublistValue({
        sublistId : 'item',
        fieldId : 'quantity',
        value : 1,
        forceSyncSourcing : true
    });
    rec.commitLine({ sublistId : item });
});