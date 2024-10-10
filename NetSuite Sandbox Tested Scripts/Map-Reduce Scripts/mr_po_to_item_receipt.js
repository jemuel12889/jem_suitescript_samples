/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */

/**
 * This Map/Reduce Script takes a Search of Purchase Orders with Status of "Pending Receipt"
 * and transforms all Search results into Item Receipts
 */
define(['N/search', 'N/record'], (search, record) => {
    function getInputData() {
        // Creating Search for Purchase Orders with Status of "Pending Receipt"
        const PURCHASE_ORDER_SEARCH = search.create({
            type : search.Type.PURCHASE_ORDER,
            columns : ['entity', 'status', 'tranid'],
            filters : [
                ['status', 'anyof', 'PurchOrd:B'],
                'and',
                ['mainline', 'is', 'T']
            ]
        });

        return PURCHASE_ORDER_SEARCH;
    }

    function map(context) {
        // Accessing data passed by the Get Input Data Stage
        let poSearchResults = JSON.parse(context.value);
        let poId = poSearchResults.id;
        let vendor = poSearchResults.values.entity.text;
        let tranId = poSearchResults.values.tranid;
        let statusText = poSearchResults.values.status.text;
        let statusVal = poSearchResults.values.status.value;

        try {
            // Using record.transform(options) to transform Purchase Orders into Item Receipts using Internal IDs from the Search
            log.debug('Transform Start', `Transforming Purchase Order #${tranId} from Vendor: ${vendor}. Status: ${statusVal}: ${statusText}.`);
            let receipt = record.transform({
                fromType : record.Type.PURCHASE_ORDER,
                fromId : poId,
                toType : record.Type.ITEM_RECEIPT,
                isDynamic : true,
                defaultValues : {
                    customform : 39
                }
            });

            // Setting Destination for each Item Line
            let lineCount = receipt.getLineCount({
                sublistId : 'item'
            });

            for (let i = 0; i < lineCount; i++) {
                receipt.selectLine({
                    sublistId : 'item',
                    line : i
                });

                receipt.setCurrentSublistValue({
                    sublistId : 'item',
                    fieldId : 'location',
                    value : 8
                });

                receipt.commitLine({
                    sublistId : 'item'
                });
            }

            // Saving newly created Item Receipt
            let receiptId = receipt.save();
            log.debug('Transform Success', `Purchase Order #${poId} has been successfully transformed to Item Receipt #${receiptId}.`);
        } catch (error) {
            log.error('Transform Failure', error);
        }
    }

    return {
        getInputData : getInputData,
        map : map
    };
});