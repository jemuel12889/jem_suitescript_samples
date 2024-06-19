/**
 * @NApiVersion 2.1
 */
//Working with N/currentRecord Module in custom module scripts
define(['N/currentRecord'], currentRecord => {
    return ({
        test_set_getValue : () => {
            let myRecord = currentRecord.get();

            myRecord.setValue({
                fieldId : 'custpage_textfield',
                value : 'Body value',
                ignoreFieldChange : true,
                forceSyncSourcing : true
            });

            let actValue = myRecord.getValue({
                fieldId : 'custpage_textfield'
            });

            myRecord.setValue({
                fieldId : 'custpage_resultfield',
                value : actValue,
                ignoreFieldChange : true,
                forceSyncSourcing : true
            });
        },

        test_set_getCurrentSublistValue : () => {
            let myRecord = currentRecord.get();

            myRecord.getCurrentSublistValue({
                sublistId : 'sitecategory',
                fieldId : 'custpage_subtextfield',
                value : 'Sublist Value',
                ignoreFieldChange : true,
                forceSyncSourcing : true
            });
        }
    });
});