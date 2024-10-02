/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */

/**
 * This Map/Reduce Script takes a Saved Search of Sales Orders with the Order Status of "Pending Billing",
 * then transforms the resulting Sales Orders to create Invoices for each record.
 */
define(['N/record', 'N/search'], (record, search) => {
    function getInputData(context) {
        // Loading a Saved Search created in the User Interface
        // The Saved Search is for Sales Orders with Order Status of "Pending Billing"
        let soSearch = search.load({
            id : 'customsearch_search_so_pending_billing'
        });

        // Return the Search as the data to be passed to the Map Stage
        return soSearch;
    }

    function map(context) {
        // Accessing the data from Get Input Stage using the context parameter
        let soId = context.key;
        let salesOrderRec = JSON.parse(context.value);

        let customer = salesOrderRec.values.entity.text;

        try {
            // Using record.transform(options) to transform the current Sales Order using its Internal ID that is retrieved as context.key
            log.debug('Record Transform', `Transforming Sales Order #${soId} into Invoice for ${customer}.`);
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
            log.debug('Invoice Created', `Created Invoice #${invoiceId} from Sales Order #${soId} by ${customer}.`);
            
        } catch (error) {
            log.error('Transform Failure', error);
        }
    }

    return {
        getInputData : getInputData,
        map : map
    };
});
