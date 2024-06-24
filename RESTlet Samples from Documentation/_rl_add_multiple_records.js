/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */

define(['N/record'], function(record) {
    return {
        post : (restletBody) => {
            let restletData = restletBody.data;
            for (let contact in restletData) {
                let objRecord = record.create({
                    type : record.Type.CONTACT,
                    isDynamic : true
                });
                let contactData = restletData[contact];
                for (let key in contactData) {
                    if (contactData.hasOwnProperty(key)) {
                        objRecord.setValue({
                            fieldId : key,
                            value : contactData[key]
                        });
                    }
                }
                let recordId = objRecord.save({
                    enableSourcing : false,
                    ignoreMandatoryFields : false
                });
                log.debug(recordId);
            }
        }
    };
});