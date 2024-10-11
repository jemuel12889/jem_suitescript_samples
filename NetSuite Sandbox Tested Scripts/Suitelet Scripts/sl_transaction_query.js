/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

/**
 * This Suitelet Script takes a Query instead of a Search to Populate a List of Transactions
 */
define(['N/query', 'N/ui/serverWidget'], (query, serverWidget) => {
    function onRequest(context) {
        // The script only triggers with the 'GET' method
        if (context.request.method === 'GET') {

            // Creating the List
            const myQueryList = serverWidget.createList({
                title : 'Transactions Query List'
            });

            // Adding Columns to the List
            let transactionId = myQueryList.addColumn({
                id : 'tranid',
                label : 'Transaction ID',
                type : serverWidget.FieldType.TEXT
            });

            let tranTypeField = myQueryList.addColumn({
                id : 'type',
                label : 'Transaction Type',
                type : serverWidget.FieldType.TEXT
            });

            let approvalStatusField = myQueryList.addColumn({
                id : 'approvalstatus',
                label : 'Approval Status',
                type : serverWidget.FieldType.TEXT
            });

            let customerField = myQueryList.addColumn({
                id : 'altname',
                label : 'Customer',
                type : serverWidget.FieldType.TEXT
            });

            let customerEmailField = myQueryList.addColumn({
                id : 'email',
                label : 'Customer Email',
                type : serverWidget.FieldType.EMAIL
            });

            let salesRepField = myQueryList.addColumn({
                id : 'salesrep',
                label : 'Sales Rep',
                type : serverWidget.FieldType.TEXT
            });

            let totalAmountField = myQueryList.addColumn({
                id : 'foreigntotal',
                label : 'Total Amount',
                type : serverWidget.FieldType.CURRENCY
            });

            // Creating a Query using query.create(options)
            const myTransactionQuery = query.create({
                type : query.Type.TRANSACTION
            });

            // Joining the Transaction Record (Base) to the Customer Record
            let myCustomerJoin = myTransactionQuery.joinTo({
                fieldId : 'entity',
                target : query.Type.CUSTOMER
            });

            // Adding Columns to the Query
            myTransactionQuery.columns = [
                myTransactionQuery.createColumn({
                    fieldId : 'tranId'
                }),
                myTransactionQuery.createColumn({
                    fieldId : 'type'
                }),
                myTransactionQuery.createColumn({
                    fieldId : 'approvalStatus'
                }),
                myCustomerJoin.createColumn({
                    fieldId : 'altName'
                }),
                myCustomerJoin.createColumn({
                    fieldId : 'email'
                }),
                myCustomerJoin.createColumn({
                    fieldId : 'salesRep'
                }),
                myTransactionQuery.createColumn({
                    fieldId : 'foreignTotal'
                })
            ];

            // Adding a Condition to the Query to only retrieve Transactions with the Employee with ID of 289
            myTransactionQuery.condition = myTransactionQuery.createCondition({
                fieldId : 'employee',
                operator : query.Operator.ANY_OF,
                values : 289
            });

            // Running the Query
            let transactionResultSet = myTransactionQuery.run();
            let results = transactionResultSet.results;

            // Iterating through the Query Result Set
            for (let i = 0; i < results.length; i++) {
                // Accessing the Array of Column Values
                let transactions = results[i].values;

                // Adding Query Result Column Values as Rows to the List
                myQueryList.addRow({
                    row : {
                        tranid : transactions[0],
                        type : transactions[1],
                        approvalstatus : transactions[2],
                        altname : transactions[3],
                        email : transactions[4],
                        salesrep : transactions[5],
                        foreigntotal : transactions[6]
                    }
                });
            }

            // Displaying the List as the Suitelet Response
            context.response.writePage(myQueryList);
        }
    }

    return {
        onRequest : onRequest
    };
});