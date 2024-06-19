/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'], (serverWidget) => {
    function onRequest(context) {
        if (context.request.method === "GET") {
            var list = serverWidget.createList({
                title : 'Purchase History'
            });
            list.style = serverWidget.ListStyle.REPORT;

            list.addButton({
                id : 'buttonid',
                label : 'Test',
                functionName : ''
            });

            var datecol = list.addColumn({
                id : 'column1',
                type : serverWidget.FieldType.DATE,
                label : 'Date',
                align : serverWidget.LayOutJustification.RIGHT
            });

            list.addColumn({
                id : 'column2',
                type : serverWidget.FieldType.TEXT,
                label : 'Product',
                align : serverWidget.LayOutJustification.RIGHT
            });

            list.addColumn({
                id : 'column3',
                type : serverWidget.FieldType.INTEGER,
                label : 'Quantity',
                align : serverWidget.LayOutJustification.RIGHT
            });

            list.addColumn({
                id : 'column4',
                type : serverWidget.FieldType.CURRENCY,
                label : 'Unit Cost',
                align : serverWidget.LayOutJustification.RIGHT
            });

            list.addRow({
                row : { column1: '02/12/2018', column2 : 'Widget', column3 : '4', column4 : '4.50' }
            });

            list.addRows({
                rows : [
                    { column1: '06/02/2024', column2 : 'Candy', column3 : '10', column4 : '8.50' },
                    { column1: '05/10/2001', column2 : 'Chocolate', column3 : '1', column4 : '5.50' },
                    { column1: '11/01/2002', column2 : 'Coffee', column3 : '20', column4 : '10.50' }
                ]
            });

            context.response.writePage(list);
        } else {

        }
    }
    return {
        onRequest : onRequest
    };
});