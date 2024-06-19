/**
 * @NApiVersion 2.1
 * @NSciptType Suitelet
 */

define(['N/ui/serverWidget'], serverWidget => {
    const onRequest = (context) => {
        if (context.request.method === 'GET') {
            let form = serverWidget.createForm({
                title : 'Simple Form'
            });

            let field = form.addField({
                id : 'textfield',
                type : serverWidget.FieldType.TEXT,
                label : 'Text'
            });
            field.layoutType = serverWidget.FieldLayoutType.NORMAL;
            field.updateBreakType({
                breakType : serverWidget.FieldBreakType.STARCOL
            });

            form.addField({
                id : 'datefield',
                type : serverWidget.FieldType.DATE,
                label : 'Date'
            });
            form.addField({
                id : 'currencyfield',
                type : serverWidget.FieldType.CURRENCY,
                label : 'Currency'
            });

            let select = form.addField({
                id : 'selectfield',
                type : serverWidget.FieldType.SELECT,
                label : 'Select'
            });
            select.addSelectOption({
                value : 'a',
                text : 'Albert'
            });
            select.addSelectOption({
                value : 'b',
                text : 'Baron'
            });

            let sublist = form.addSublist({
                id : 'sublist',
                type : serverWidget.SublistType.INLINEEDITOR,
                label : 'Inline Editor Sublist'
            });
            sublist.addField({
                id : 'sublist1',
                type : serverWidget.FieldType.DATE,
                label : 'Date'
            });
            sublist.addField({
                id : 'sublist2',
                type : serverWidget.FieldType.TEXT,
                label : 'Text'
            });

            scriptContext.response.writePage(form);
        } else {
            const delimiter = /\u0001/;
            const textField = context.request.parameters.textfield;
            const dateField = context.request.parameters.datefield;
            const currencyField = context.request.parameters.currencyfield;
            const selectField = context.request.parameters.selectfield;
            const sublistData = context.request.parameters.sublistdate.split(delimiter);
            const sublistField1 = sublistData[0];
            const sublistField2 = sublistData[1];

            context.response.write(`You have entered: ${textField} ${dateField} ${currencyField} ${selectField} ${sublistField1} ${sublistField2}`);
        }
    }

    return {onRequest}
});