/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */

//Script to create a Customer Record
//Script is practically improper, this is only intended for learning
define(['N/record'], function(record) {
    function beforeLoad(context) {
        if (context.type !== context.UserEventType.CREATE) {
            return;
        }

        var rec = record.create({
            type : record.Type.CUSTOMER
        });

        //This field determines whether the Customer Record instance is a company or an individual
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
