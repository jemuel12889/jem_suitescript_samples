/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

/**
 * This is a Suitelet the returns the list of Sales Orders as a response to the "GET" method.
 * It also contains a Select Field of Customers that servers as a Filter Field for Sales Orders
 */
define(['N/search', 'N/ui/serverWidget'], (search, serverWidget) => {
    function onRequest(context) {
        // Creating the Search for Sales Orders
        let salesOrderSearch = search.create({
            type : search.Type.SALES_ORDER,
            columns : ['tranid', 'trandate', 'entity', 'statusref', 'amount']
        });

        // This part of the script will only execute on "GET" method
        if (context.request.method === 'GET') {
            // Creating the form
            let salesOrderList = serverWidget.createForm({
                title : 'Sales Orders'
            });

            // Adding the Customer Select Field as an "Available Filter" for the following list
            let customerField = salesOrderList.addField({
                id : 'customerfield',
                label : 'Customer',
                type : serverWidget.FieldType.SELECT,
                source : 'customer'
            });

            // Adding the Submit Button to trigger the "POST" method to refresh the list with the selected Customer Filter
            salesOrderList.addSubmitButton({
                label : 'Filter'
            });

            // Creating the Sublist to contain the Search Results
            let soSublist = salesOrderList.addSublist({
                id : 'salesordersublist',
                label : 'Sales Orders by Customer',
                type : serverWidget.SublistType.LIST
            });
            let trandidField = soSublist.addField({
                id : 'orderid',
                label : 'Order #',
                type : serverWidget.FieldType.TEXT
            });
            let trandateField = soSublist.addField({
                id : 'date',
                label : 'Date',
                type : serverWidget.FieldType.DATE
            });
            let entityField = soSublist.addField({
                id : 'customerselect',
                label : 'Customer',
                type : serverWidget.FieldType.TEXT
            });
            let statusField = soSublist.addField({
                id : 'status',
                label : 'Status',
                type : serverWidget.FieldType.TEXT
            });
            let amountField = soSublist.addField({
                id : 'totalamount',
                label : 'Amount',
                type : serverWidget.FieldType.CURRENCY
            });

            // Setting the Search Filter for "Main Line" transactions only
            salesOrderSearch.filters = search.createFilter({
                name : 'mainline',
                operator : 'is',
                values : 'T'
            });

            // Running the Search and Iterating through all Search results and set them as Sublist Field Values
            let ctr = 0;
            salesOrderSearch.run().each((result) => {
                let soId = result.getValue({
                    name : 'tranid'
                });
                let date = result.getValue({
                    name : 'trandate'
                });
                let customerId = result.getText({
                    name : 'entity'
                });
                let status = result.getText({
                    name : 'statusref'
                });
                let amount = result.getValue({
                    name : 'amount'
                });

                soSublist.setSublistValue({
                    id : 'orderid',
                    line : ctr,
                    value : soId
                });
                soSublist.setSublistValue({
                    id : 'date',
                    line : ctr,
                    value : date
                });
                soSublist.setSublistValue({
                    id : 'customerselect',
                    line : ctr,
                    value : customerId
                });
                soSublist.setSublistValue({
                    id : 'status',
                    line : ctr,
                    value : status
                });
                soSublist.setSublistValue({
                    id : 'totalamount',
                    line : ctr,
                    value : amount
                });

                ctr++;
                return true;
            });

            // Display the Form as the Response
            context.response.writePage(salesOrderList);

            // This part of the script will run on the "Post" method
        } else {
            // Retrieving the Customer Select Field Value from the request parameters
            let customerId = context.request.parameters.customerfield;

            // Creating the Form
            let salesOrderList = serverWidget.createForm({
                title : 'Sales Orders'
            });

            // Recreating the Customer Select Field with the previously selected value as its default value
            let customerField = salesOrderList.addField({
                id : 'customerfield',
                label : 'Customer',
                type : serverWidget.FieldType.SELECT,
                source : 'customer'
            });
            salesOrderList.updateDefaultValues({
                values : {
                    customerfield : customerId
                }
            });

            // Adding the Submit Button to continue filtering indefinitely
            salesOrderList.addSubmitButton({
                label : 'Filter'
            });

            // Adding the Sublist to contain the new filtered Search results 
            let soSublist = salesOrderList.addSublist({
                id : 'salesordersublist',
                label : 'Sales Orders by Customer',
                type : serverWidget.SublistType.LIST
            });
            let trandidField = soSublist.addField({
                id : 'orderid',
                label : 'Order #',
                type : serverWidget.FieldType.TEXT
            });
            let trandateField = soSublist.addField({
                id : 'date',
                label : 'Date',
                type : serverWidget.FieldType.DATE
            });
            let entityField = soSublist.addField({
                id : 'customerselect',
                label : 'Customer',
                type : serverWidget.FieldType.TEXT
            });
            let statusField = soSublist.addField({
                id : 'status',
                label : 'Status',
                type : serverWidget.FieldType.TEXT
            });
            let amountField = soSublist.addField({
                id : 'totalamount',
                label : 'Amount',
                type : serverWidget.FieldType.CURRENCY
            });

            // Setting the Search filters for "Main Line" transactions and made by Customers that match the Customer Select Field Value
            salesOrderSearch.filters = [
                search.createFilter({
                    name : 'mainline',
                    operator : 'is',
                    values : 'T'
                }),
                search.createFilter({
                    name : 'entity',
                    operator : 'is',
                    values : customerId
                })
            ];

            // Running the Search and Iterating through all Search results and set them as Sublist Field Values
            let ctr = 0;
            salesOrderSearch.run().each((result) => {
                let soId = result.getValue({
                    name : 'tranid'
                });
                let date = result.getValue({
                    name : 'trandate'
                });
                let customerId = result.getText({
                    name : 'entity'
                });
                let status = result.getText({
                    name : 'statusref'
                });
                let amount = result.getValue({
                    name : 'amount'
                });

                soSublist.setSublistValue({
                    id : 'orderid',
                    line : ctr,
                    value : soId
                });
                soSublist.setSublistValue({
                    id : 'date',
                    line : ctr,
                    value : date
                });
                soSublist.setSublistValue({
                    id : 'customerselect',
                    line : ctr,
                    value : customerId
                });
                soSublist.setSublistValue({
                    id : 'status',
                    line : ctr,
                    value : status
                });
                soSublist.setSublistValue({
                    id : 'totalamount',
                    line : ctr,
                    value : amount
                });

                ctr++;
                return true;
            });
            // Display the Form as the Response
            context.response.writePage(salesOrderList);
        }
    }

    return {
        onRequest : onRequest
    };
});