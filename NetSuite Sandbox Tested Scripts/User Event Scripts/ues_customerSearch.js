/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */

/**
 * This User Event Script adds a Text Area Field to the Customer Entry Form on the CREATE context
 * and creates a Search to populate the its default value with existing Customer Records
 */
define(['N/search', 'N/ui/serverWidget'], function(search, serverWidget) {
    function beforeLoad(context) {
        // Accessing the current Customer Entry Form
        log.debug('Current Form', 'Accessing current form');
        var entryForm = context.form;

        // Adding the Text Area Field
        log.debug('Form Operation', 'Creating Text Area');
        var listArea = entryForm.addField({
            id : 'custpage_resultarea',
            type : serverWidget.FieldType.TEXTAREA,
            label : 'Existing Customers'
        });
        listArea.updateLayoutType({
            layoutType : serverWidget.FieldLayoutType.NORMAL
        });
    
        // Creating Search for Customers filtered by their Sales Rep
        log.debug('Search Operation', 'Creating Customer Search using search.create(options)');
        var cSearch = search.create({
            type : search.Type.CUSTOMER,
            columns : ['entityid', 'firstname', 'lastname', 'title', 'salesrep'],
            filters : search.createFilter({
                name : 'salesrep',
                operator : 'anyof',
                values: 289
            })
        });
    
        var textAreaDefault = '';

        // Running the created Search
        log.debug('Search Operation', 'Running Customer Search');
        cSearch.run().each(function(result) {
            var customerId = result.getValue({
                name : 'entityid'
            });
    
            var fname = result.getValue({
                name : 'firstname'
            });
            var lname = result.getValue({
                name : 'lastname'
            });
    
            var title = result.getValue({
                name : 'title'
            });

            // Displaying the Search Results in the Execution Log
            log.debug('Search Data', 'Customer Id: #' + customerId
            + '\n Customer Name: ' + fname + ' ' + lname
            + '\n Job Title: ' + title + '\n');

            // Adding all Search Results in a string
            textAreaDefault += 'Customer Id: #' + customerId
            + '\n Customer Name: ' + fname + ' ' + lname
            + '\n Job Title: ' + title + '\n';

            return true;
        });

        // Setting the default value of the Text Area with all the Search Results
        listArea.defaultValue = textAreaDefault;
    }

    return {
        beforeLoad : beforeLoad
    };
});