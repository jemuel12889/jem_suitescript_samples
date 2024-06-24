/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */

define(['N/record', 'N/error'], (record, error) => {
    // 'GET' request method to retrieve a record
    function _get(context) {
        return JSON.stringify(record.load({
            type : context.recordtype,
            id : context.id
        }));
    }

    // 'DELETE' request method to delete selected record
    function _delete(context) {
        record.delete({
            type : context.recordtype,
            id : context.id
        });
        return String(context.id);
    }

    // 'POST' request method to insert a new record
    function _post(context) {
        let rec = record.create({
            type : context.recordtype
        });

        for (let fldName in context) {
            if (context.hasOwnProperty(fldName))
                if (fldName !== 'recordtype')
                    rec.setValue(fldName, context[fldName]);
        }

        let recordId = rec.save();
        return String(recordId);
    }

    // 'PUT' request method to replace field values from selected record
    function _put(context) {
        let rec = record.load({
            type : context.recordtype,
            id : context.id
        });

        for (let fldName in context) {
            if (context.hasOwnProperty(fldName))
                if (fldName !== 'recordtype' && fldName !== 'id')
                    rec.setValue(fldName, context[fldName]);
        }

        rec.save();
        return JSON.stringify(rec);
    }

    return {
        get : _get,
        delete : _delete,
        post : _post,
        put : _put
    };
});