/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 */

/*
Previously, I have only been retrieving Field Values and displaying them in the console
This Suitelet is also intended for the same purpose, but also to practice my Suitelet Creation
This script retrieves field values from an existing Sales Order Record
I do these scripts to determine hidden values like internal IDs to know what values to use in other scripts
*/

define(['N/ui/serverWidget', 'N/record'], function(serverWidget, record) {
    function onRequest(context) {
        if (context.request.method === 'GET') {
            var infoForm = serverWidget.createForm({
                title : 'Information'
            });

            // Loading an existing Sales Order Record with ID 8282
            var salesOrderRecord = record.load({
                type : record.Type.SALES_ORDER,
                id: 8282
            });

            // Retrieving Body Field Values
            var customerNameId = salesOrderRecord.getValue({
                fieldId : 'entity'
            });

            var customerNameText = salesOrderRecord.getText({
                fieldId : 'entity'
            });

            var orderstatus = salesOrderRecord.getValue({
                fieldId : 'orderstatus'
            });

            var orderstatustext = salesOrderRecord.getText({
                fieldId : 'orderstatus'
            });

            var subsidiaryId = salesOrderRecord.getValue({
                fieldId : 'subsidiary'
            });

            var subsidiaryText = salesOrderRecord.getText({
                fieldId : 'subsidiary'
            });

            // Retrieving Item Sublist Values
            var itemNameId = salesOrderRecord.getSublistValue({
                sublistId : 'item',
                fieldId : 'item',
                line : 0
            });

            var itemNameText = salesOrderRecord.getSublistValue({
                sublistId : 'item',
                fieldId : 'item',
                line : 0
            });

            var quantity = salesOrderRecord.getSublistValue({
                sublistId : 'item',
                fieldId : 'quantity',
                line : 0
            });

            var amount = salesOrderRecord.getSublistValue({
                sublistId : 'item',
                fieldId : 'amount',
                line : 0
            });

            var taxcodeId = salesOrderRecord.getSublistValue({
                sublistId : 'item',
                fieldId : 'taxcode',
                line : 0
            });

            var taxcodeText = salesOrderRecord.getSublistValue({
                sublistId : 'item',
                fieldId : 'taxcode',
                line : 0
            });

            // Form body creation to place Field Values
            var bodygoup = infoForm.addFieldGroup({
                id : 'bodyfields',
                label : 'Body Fields'
            });

            var listtab = infoForm.addFieldGroup({
                id : 'listtab',
                label : 'Item List'
            });

            // Body Fields to display retrieved Body Field Values from Sales Order Record Instance
            var customernamefield = infoForm.addField({
                id : 'namefield',
                type : serverWidget.FieldType.TEXT,
                label : 'Customer Name',
                container : 'bodyfields'
            });

            var orderstatusfield = infoForm.addField({
                id : 'statusfield',
                type : serverWidget.FieldType.TEXT,
                label : 'Order Status',
                container : 'bodyfields'
            });

            var subsidiaryfield = infoForm.addField({
                id : 'subsidiaryfield',
                type : serverWidget.FieldType.TEXT,
                label : 'Subsidiary',
                container : 'bodyfields'
            });

            // Fields to display retrieved Item Sublist Field Values from Sales Order Record Instance
            var itemnameField = infoForm.addField({
                id : 'itemnamefield',
                type : serverWidget.FieldType.TEXT,
                label : 'Item Name',
                container : 'listtab'
            });

            var quantityfield = infoForm.addField({
                id : 'quantityfield',
                type : serverWidget.FieldType.FLOAT,
                label : 'Quantity',
                container : 'listtab'
            });

            var amountfield = infoForm.addField({
                id : 'amountfield',
                type : serverWidget.FieldType.CURRENCY,
                label : 'Amount',
                container : 'listtab'
            });

            var taxcodefield = infoForm.addField({
                id : 'taxcodefield',
                type : serverWidget.FieldType.TEXT,
                label : 'Tax Code',
                container : 'listtab'
            });

            // Storing Sales Order Values as Default Values for the Suitelet Fields
            customernamefield.defaultValue = 'Value : ' + customerNameId + 'Text: ' + customerNameText;
            orderstatusfield.defaultValue = 'Value : ' + orderstatus + 'Text: ' + orderstatustext;
            subsidiaryfield.defaultValue = 'Value : ' + subsidiaryId + 'Text: ' + subsidiaryText;
            itemnameField.defaultValue = 'Value : ' + itemNameId + 'Text: ' + itemNameText;
            quantityfield.defaultValue = quantity;
            amountfield.defaultValue = amount;
            taxcodefield.defaultValue = 'Value : ' + taxcodeId + 'Text: ' + taxcodeText;

            context.response.writePage(infoForm);
        }
    }

    return {
        onRequest : onRequest
    };
});
