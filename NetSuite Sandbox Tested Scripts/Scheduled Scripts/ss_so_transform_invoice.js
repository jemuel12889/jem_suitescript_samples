/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */

/**
 * This Scheduled Script takes a Saved Search of Sales Orders with the Order Status of "Pending Billing",
 * then transforms the resulting Sales Orders to create Invoices for each record.
 */
define(['N/record', 'N/search'], (record, search) => {
    function execute(context) {
        // Loading a Saved Search created in the User Interface
        // The Saved Search is for Sales Orders with Order Status of "Pending Billing"
        let soSearch = search.load({
            id : 'customsearch_search_so_pending_billing'
        });

        // Running the Saved Search
        log.debug('Search', 'Running Sales Order Search');
        soSearch.run().each((result) => {
            // Retrieving the Internal ID of the Sales Order in the current iteration
            let soId = result.getValue({
                name : 'internalid'
            });

            // Retrieving the Customer Name from the Sales Order for logging purposes
            let customer = result.getText({
                name : 'entity'
            });

            try {
                // Using record.transform(options) to transform Sales Order into Invoice
                log.debug('Record Transform', `Creating Invoice for Sales Order #${soId} by Customer: ${customer}`);
                let soInvoice = record.transform({
                    fromType : record.Type.SALES_ORDER,
                    fromId : soId,
                    toType : record.Type.INVOICE,
                    isDynamic : true
                });

                // Setting the value of the Location field because its value is required for a field in the Item Sublist
                soInvoice.setValue({
                    fieldId : 'location',
                    value : 8
                });

                // Setting the value of the Approval Status field of the newly transformed Invoice as "Approved"
                soInvoice.setValue({
                    fieldId : 'approvalstatus',
                    value : 2
                });

                // Saving the new Invoice Record
                let invoiceId = soInvoice.save();
                log.debug('Invoice Created', `An Invoice has been created for Sales Order #${soId}. Invoice ID is #${invoiceId}`);
            } catch (error) {
                log.error('Transform Error', error);
            }

            return true;
        });
    }

    return {
        execute : execute
    };
});
