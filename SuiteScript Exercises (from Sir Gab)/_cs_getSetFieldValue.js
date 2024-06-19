/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
 define(['N/record', 'N/log'], 
    (rec, log) => {

        const pageInit = (context) => {
            var currentRecord = context.currentRecord;

            currentRecord.setValue({
                fieldId : 'entity',
                value : 1
            });

            var vendorIdFromField = currentRecord.getValue({ fieldId : 'entity' });
            var vendorName = currentRecord.getText({ fieldId : 'entity' });

            currentRecord.setValue({
                fieldId : 'memo',
                value : 'Vendor has been changed'
            });
        }

        return {
            pageInit: pageInit,
        }

    }
)