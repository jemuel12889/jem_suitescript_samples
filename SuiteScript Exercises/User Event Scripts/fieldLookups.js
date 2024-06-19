/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

define(['N/search', 'N/log'], function(search, log) {
    function beforeLoad(context) {
        var myCase = context.newRecord.id;

        getCaseData(myCase);
    }   
    
    function getCaseData(caseId) {
        var caseData = search.lookupFields({
            type : search.Type.SUPPORT_CASE,
            id : caseId,
            columns : [
                "casenumber",
                "createddate",
                "enddate",
                "email",
                "customer.phone",
                "contact.phone",
                "contact.email"
            ]
        });

        log.debug({
            title : "Case Number",
            details : caseData.casenumber
        });

        log.debug({
            title : "Contact Phone",
            details : caseDate["contact.phone"]
        });

        return caseData;
    }

    return {
        beforeLoad : beforeLoad
    };
});