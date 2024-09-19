/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */

/** This User Event Script creates a new Sales Order Record based on the submitted Customer Record */
define(['N/record'], (record) => {

    // The submission of the new Customer Record triggers the afterSubmit Entry Point, then starts the creation of the Sales Order Record
    function afterSubmit(context) {

        // Retrieving the Internal ID of the newly created Customer
        let customerRecord = context.newRecord;
        let customerId = customerRecord.id;

        // Creating a dynamic Sales Order Record
        let salesOrder = record.create({
            type : record.Type.SALES_ORDER,
            isDynamic : true
        });

        // Setting the Customer Internal ID as the value of the Customer('entity') field of the Sales Order Record
        try {
            log.debug('Createing Sales Order', `Creating Sales Order from Customer ID: ${customerId}`);
            salesOrder.setValue({
                fieldId : 'entity',
                value : customerId
            });
        } catch (error) {
            log.error('Customer ID error', error);
        }

        // Setting values of Mandatory fields in the Sales Order Record
        let currentDate = new Date();
        salesOrder.setValue({
            fieldId : 'trandate',
            value : currentDate
        });

        salesOrder.setValue({
            fieldId : 'orderstatus',
            value : 'A'
        });
        salesOrder.setValue({
            fieldId : 'subsidiary',
            value : 1
        });

        // Adding an Item Sublist line for the Sales Order
        salesOrder.selectNewLine({
            sublistId : 'item'
        });
        
        salesOrder.setCurrentSublistValue({
            sublistId : 'item',
            fieldId : 'item',
            value : 158
        });
        salesOrder.setCurrentSublistValue({
            sublistId : 'item',
            fieldId : 'quantity',
            value : 2
        });
        salesOrder.setCurrentSublistValue({
            sublistId : 'item',
            fieldId : 'amount',
            value : 250
        });
        salesOrder.setCurrentSublistValue({
            sublistId : 'item',
            fieldId : 'taxcode',
            value : 14
        });

        // Committing the Sublist line and saving the created Sales Order Record
        try {
            salesOrder.commitLine({
                sublistId : 'item'
            });
            let salesOrderId = salesOrder.save();
            log.debug(`Sales Order #${salesOrderId} is created.`);
        } catch (error) {
            log.error('Creating Sales Order Error\n' + error);
        }
    }

    return {
        afterSubmit : afterSubmit
    }
});
