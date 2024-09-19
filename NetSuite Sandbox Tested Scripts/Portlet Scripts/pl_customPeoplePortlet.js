/**
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */

/*
 This is a Custom List Portlet displaying a search of type Custom Person
 */

define(['N/search', 'N/ui/serverWidget'], (search, serverWidget) => {
    function render(params) {
        // This is a Custom List Portlet
        let portlet = params.portlet;

        portlet.title = "Custom Persons List";

        // This is the column to contain a formula search that combines First Name and Last Name
        portlet.addColumn({
            id : 'formulatext',
            label : 'Name',
            type : serverWidget.FieldType.TEXT,
            align : serverWidget.LayoutJustification.LEFT
        });

        // Additional columns for other Custom Person Fields
        portlet.addColumn({
            id : 'custrecord_birthday',
            label : 'Date of Birth',
            type : serverWidget.FieldType.DATE,
            align : serverWidget.LayoutJustification.LEFT
        });

        portlet.addColumn({
            id : 'custrecord_phone',
            label : 'Phone',
            type : serverWidget.FieldType.PHONE,
            align : serverWidget.LayoutJustification.LEFT
        });

        // Add Edit/View Column ----- Still studying constructing a dynamic link for each row
        portlet.addEditColumn({
            column : 'formulatext',
            showView : true,
            showHrefCol : 'T',
        });

        // Creating a Custom Person Search containing columns for Name(formula), Birthday, and Phone
        let nameFormula = search.createColumn({
            name : 'formulatext',
            formula : "{custrecord_firstname} || ' ' || {custrecord_lastname}" 
        });

        let date = search.createColumn({
            name : 'custrecord_birthday',
        });

        let phone = search.createColumn({
            name : 'custrecord_phone',
        });

        let mySearch = search.create({
            type : 'customrecord_custom_people',
            columns : [nameFormula, date, phone]
        });

        // Iterates through search results and add each as list rows in the Portlet
        mySearch.run().each((result) => {
            portlet.addRow(result);
            return true;
        });
    }

    return {
        render : render
    };
});
