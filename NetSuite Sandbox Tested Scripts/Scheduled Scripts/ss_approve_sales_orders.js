/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */

/**
 * This Scheduled Script is responsible for approving Sales Orders
 */
define(['N/search', 'N/record'], (search, record) => {
    function execute(context) {
        // Loading Saved Search for Sales Orders with Order Status of "Pending Approval"
        const SALES_ORDERS = search.load({
            id : 'customsearch_pending_approval_so'
        });

        // Running the Saved Search
        SALES_ORDERS.run().each((result) => {
            // Retrieving Internal ID of the Sales Order in the current iteration
            let soId = result.getValue({
                name : 'internalid'
            });

            // Loading the actual Sales Order Record to access fields
            let salesOrderRec = record.load({
                type : record.Type.SALES_ORDER,
                id : soId
            });

            // Setting the Order Status from "Pending Approval" to "Pending Fulfillment"
            salesOrderRec.setValue({
                fieldId : 'orderstatus',
                value : 'B'
            });

            // Saving the approved Sales Order
            try {
                salesOrderRec.save();
                log.debug('Sales Order Approval', `Sales Order #${soId} has been approved, and is now Pending Fulfillment.`);
            } catch (error) {
                log.error('Error SO Approval', error);
            }

            return true;
        });
    }

    return {
        execute : execute
    };
});