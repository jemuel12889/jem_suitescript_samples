/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */

define(['N/record'], function(record) {
    function beforeLoad(context) {
        if (context.type !== context.UserEventType.CREATE) {
            return;
        }

        var rec = record.create({
            type : record.Type.CUSTOMER
        });
        
        var customerType = rec.setValue({
            fieldId : 'isperson',
            value : 'T'
        });

        var fName = rec.setValue({
            fieldId : 'firstname',
            value : 'John'
        });

        var lName = rec.setValue({
            fieldId : 'lastname',
            value : 'Doe'
        });

        var mName = rec.setValue({
            fieldId : 'middlename',
            value : 'Cena'
        });

        var subsidiary = rec.setValue({
            fieldId : 'subsidiary',
            value : 1
        });
        rec.save();
    }

    return {
        beforeLoad : beforeLoad
    };
});