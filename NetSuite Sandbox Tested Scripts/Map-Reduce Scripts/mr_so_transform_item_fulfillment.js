/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */

/**
 * A Map/Reduce Script that takes a Saved Search of Sales Order with Order Status of "Pending Fulfillment"
 * and transform each resulting Sales Order into Item Fulfillment with Status of "Shipped"
 */
define(['N/record', 'N/search'], (record, search) => {
    function getInputData(context) {
        // Loading a Saved Search created in the User Interface
        // The Saved Search is for Sales Orders with Order Status of "Pending Fulfillment"
        let salesOrderSearch = search.load({
            id : 'customsearch_search_so_pending_fulfill'
        });

        // Return the Search as the data to be passed to the Map Stage
        return salesOrderSearch;
    }

    function map(context) {
        // Accessing the data from Get Input Stage using the context parameter
        let soResults = JSON.parse(context.value);
        let salesOrderId = context.key;

        try {
            // Using record.transform(options) to transform the current Sales Order using its Internal ID that is retrieved as context.key
            log.debug('Record Transform' ,`Transforming Sales Order Internal ID: ${salesOrderId} into Item Fulfillment`);
            let itemFulfillTransform = record.transform({
                fromType : record.Type.SALES_ORDER,
                fromId : salesOrderId,
                toType : record.Type.ITEM_FULFILLMENT,
                isDynamic : true,
                defaultValues : {
                    inventorylocation : 8
                }
            });
    
            // Setting the Ship Status of the new Item Fulfillment record as "Shipped"
            itemFulfillTransform.setValue({
                fieldId : 'shipstatus',
                value : 'C'
            });
    
            // Saving the new Item Fulfillment Record
            let itemFulfillId = itemFulfillTransform.save();
            log.debug('Transform Successful', `Sales Order #${salesOrderId} is transformed to Item Fulfillment #${itemFulfillId}`);
        } catch (error) {
            log.error('Transform Failure', error);
        }
    }

    return {
        getInputData : getInputData,
        map : map
    };
});