/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

/**
 * This is a Suitelet that displays a serverWidget.List
 * The List Data is retrieved using a Saved Search that is created in the User Interface
 */
define(['N/ui/serverWidget', 'N/search'], (serverWidget, search) => {
    function onRequest(context) {
        if (context.request.method === 'GET') {

            // Creation of the List Object
            let myList = serverWidget.createList({
                title : 'Customers Without Email List'
            });
            myList.style = serverWidget.ListStyle.PLAIN;
    
            // Adding Columns that match the Columns created in the Saved Search
            myList.addColumn({
                id : 'idcol',
                label : 'Internal ID',
                type : serverWidget.FieldType.INTEGER
            });
            myList.addColumn({
                id : 'namecol',
                label : 'Name',
                type : serverWidget.FieldType.TEXT
            });
            myList.addColumn({
                id : 'salesrepcol',
                label : 'Sales Rep',
                type : serverWidget.FieldType.TEXT
            });
            myList.addColumn({
                id : 'subsidiarycol',
                label : 'Subsidiary',
                type : serverWidget.FieldType.TEXT
            });
    
            // Loading the Saved Search
            let mySearch = search.load({
                id : 'customsearch_customer_wo_email'
            });

            // Iterating through all Saved Search Results
            mySearch.run().each((result) => {

                // Retrieving Values of Search Columns
                let customerId = result.getValue({
                    name : 'internalid'
                });
                let customerName = result.getValue({
                    name : 'altname'
                });
                let salesRep = result.getText({
                    name : 'salesrep'
                });
                let subsidiary = result.getText({
                    name : 'subsidiary'
                });
    
                // Mapping Saved Search Results into List Rows
                myList.addRow({
                    row : {
                        'idcol' : customerId,
                        'namecol' : customerName,
                        'salesrepcol' : salesRep,
                        'subsidiarycol' : subsidiary
                    }
                });

                return true;
            });

            context.response.writePage(myList);
        }
    }

    return {
        onRequest : onRequest
    };
});