/**
 * @NApiVersion 2.0
 * @NScriptType ScheduledScript
 */
define(['N/search', 'N/record', 'N/runtime'], (search, record, runtime) => {
    function execute(context) {
        let employeeId = runtime.getCurrentUser().id;
        let currentDate = new Date();

        // Function to search Items filtered with Subsidiary
        const itemsSearch = (itemSubsidiaryId) => {
            let sItem = search.create({
                type : search.Type.ITEM,
                columns : [
                    search.createColumn({ name : 'item', label : 'Item' }),
                    search.createColumn({ name : 'rate', label : 'Rate' })
                ],
                filters : [['subsidiary', search.Operator.IS, itemSubsidiaryId]]
            });
            let sItemsResult = sItem.run();
            return sItemsResult;
        };

        // Create Purchase Order with Vendor ID
        const createPurchaseOrder = (vendorId) => {
            // Search for Subsidiary of given Vendor
            let subsidiaryId;
            let subsidiarySearch = search.create({
                type : search.Type.VENDOR,
                filters : [['entity', search.Operator.IS, vendorId]]
            });
            subsidiarySearch.run.each((result) => {
                subsidiaryId = result.getValue({
                    name : 'subsidiary'
                });
            });

            // Creating new Purchase Order Record
            let purchareOrder = record.create({
                type : record.Type.PURCHASE_ORDER
            });
            purchareOrder.setValue({
                fieldId : 'trandate',
                value : currentDate
            }).setValue({
                fieldId : 'employee',
                value : employeeId
            }).setValue({
                fieldId : 'entity',
                value : vendorId
            }).setValue({
                fieldId : 'subsidiary',
                value : subsidiaryId
            });

            // Call function to search Items filtered with Subsidiary ID
            let itemsResult = itemsSearch(subsidiaryId)
            itemsResult.getRange({
                start : 0,
                end : 10
            });

            // Loop to retrieve and contain Item and Rate in Items
            for (let i = 0; i < itemsResult.length; i++) {
                let itemId = itemsResult[i].getValue({
                    name : 'item'
                });
                let itemRate = itemsResult[i].getValue({
                    name : 'rate'
                });

                // Insert Purchase Order Sublist Lines in Item Sublist
                purchareOrder.insertLine({
                    sublistId : 'item',
                    line : i
                });

                purchareOrder.setSublistValue({
                    sublistId : 'item',
                    fieldId : 'item',
                    value : itemId
                }).setSublistValue({
                    sublistId : 'item',
                    fieldId : 'quantity',
                    value : 3
                }).setSublistValue({
                    sublistId : 'item',
                    fieldId : 'rate',
                    value : itemRate
                });

                purchareOrder.commitLine({
                    sublistId : 'item'
                });
            }
            purchareOrder.save();
        };

        createPurchaseOrder(1);
        createPurchaseOrder(2);
    }
    return {
        execute : execute
    };
});