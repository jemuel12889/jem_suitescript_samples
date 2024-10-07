/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */

/**
 * This User Event Script's function is only to create a Saved Search
 */
define(['N/search'], (search) => {
    function afterSubmit(context) {
        // Creating a Saved Search for Customer Records filtered by their Sales Rep
        log.debug('Search Operation', 'Creating a Search using search.create(options)');
        let myCustomerSearch = search.create({
            type : search.Type.CUSTOMER,
            id : 'customsearch_my_custom_search',
            title : 'Customer Search by Sales Rep'
        });

        // Defining three Search Columns
        log.debug('Search Operation', 'Adding columns to the search');
        myCustomerSearch.columns = ['firstname', 'lastname', 'title', 'salesrep'];

        // Defining the Sales Rep filter for the Saved Search
        log.debug('Search Operation', 'Adding filters to the search');
        myCustomerSearch.filters = search.createFilter({
            name : 'salesrep',
            operator : 'anyof',
            values : 289
        });

        try {
            // Saving the Saved Search so it can be accessed in the User Interface
            let mySearchId = myCustomerSearch.save();
            log.debug('Search Operation', `Custom Customer Search is now saved with ID #${mySearchId}.`);
        } catch (error) {
            log.error('Search Error', error);
        }
    }

    return {
        afterSubmit : afterSubmit
    };
});