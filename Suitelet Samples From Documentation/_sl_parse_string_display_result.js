/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/format'], (serverWidget, format) => {
    function parseAndFormatDateString() {
        var initialFormattedDateString = "06/14/2024";
        var parseDateStringAsRawDateObject = format.parse({
            value : initialFormattedDateString,
            type : format.Type.DATE
        });
        var formattedDateString = format.format({
            value : parseDateStringAsRawDateObject,
            type : format.Type.DATE
        });
        return [parseDateStringAsRawDateObject, formattedDateString];
    }
    function onRequest(context) {
        var date = parseAndFormatDateString();
        var form = serverWidget.createForm({
            title : 'Date'
        });

        var fldDate = form.addField({
            id : 'date',
            type : serverWidget.FieldType.DATE,
            label : 'Date'
        });
        fldDate.defaultValue = data[0];

        var fldString = form.addField({
            id : 'dateastext',
            type : serverWidget.FieldType.TEXT,
            label : 'Date as text'
        });

        context.response.writePage(form);
    }
    return {
        onRequest : onRequest
    };
})