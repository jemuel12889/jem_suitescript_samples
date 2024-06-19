/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define([], () => {
    return {
        beforeLoad : params => {
            let form = params.form;

            let textfield = form.addField({
                id : 'custpage_textfield',
                type : 'text',
                label : 'Text'
            });
            let resultfield = form.addField({
                id : 'custpage_resultfield',
                type : 'text',
                label : 'Result'
            });
            let sublistResultfield = form.addField({
                id : 'custpage_sublist_resultfield',
                type : 'text',
                label : 'Sublist Result Field'
            });

            let sublistObj = form.getSublist({
                id : 'sitecategory'
            });

            let subtextfield = sublistObj.addField({
                id : 'custpage_subtextfield',
                type : 'text',
                label : 'Sublist Text Field'
            });

            form.clientScriptModulePath = './clientDemo.js';

            form.addButton({
                id : 'custpage_custombutton',
                label : 'SET_GET_VALUE',
                functionName : 'test_set_getValue'
            });
            form.addButton({
                id : 'custpage_custombutton2',
                label : 'test_set_getCurrentSublistValue'
            });
        }
    };
});