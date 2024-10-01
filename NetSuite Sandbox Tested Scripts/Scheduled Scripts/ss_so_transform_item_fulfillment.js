/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */

/**
 * A Scheduled Script that takes a Saved Search of Sales Order with Order Status of "Pending Fulfillment"
 * and transform each resulting Sales Order into Item Fulfillment with Status of "Shipped"
 */
define(['N/search', 'N/record'], (search, record) => {
    function execute(context) {
        // Loading a Saved Search created in the User Interface
        // The Saved Search is for Sales Orders with Order Status of "Pending Fulfillment"
        const soSearch = search.load({
            id : 'customsearch_search_so_pending_fulfill'
        });

        // Running the Saved Search
        log.debug('Saved Search', 'Running Sales Order Saved Search');
        soSearch.run().each((result) => {
            // Retrieving the Internal ID of the Sales Order in the current iteration
            let soId = result.getValue({
                name : 'internalid'
            });

            try {
                // Using record.transform(options) to transform Sales Order into Item Fulfillment
                log.debug('Record Transform', `Transforming Sales Order #${soId}.`);
                let fulfilledSo = record.transform({
                    fromType : record.Type.SALES_ORDER,
                    fromId : soId,
                    toType : record.Type.ITEM_FULFILLMENT,
                    isDynamic : true,
                    defaultValues : {
                        inventorylocation : 8
                    }
                });

                // Setting the Ship Status of the newly transformed Item Fulfillment as "Shipped"
                fulfilledSo.setValue({
                    fieldId : 'shipstatus',
                    value : 'C'
                });

                // Saving the new Item Fulfillment Record
                let fulfilledSoId = fulfilledSo.save();
                log.debug('Transformed Sales Order', `Sales Order #${soId} has been fulfilled. Item Fulfillment Record ID is #${fulfilledSoId}`);
            } catch (error) {
                log.error('Problem with Sales Order Record', error)
            }

            return true;
        });
    }

    return {
        execute : execute
    };
});