define(['N/search', 'N/url', 'N/record'], function(s, url, r) {
    /**
     * Client Script to add a Button to the Suitelet Cases by Priority
     * 
     * @exports suitelet-results/cl
     * 
     * @NApiVersion 2.x
     * @NModuleScope SameAccount
     */

    var exports = {};
    function goToNextCase() {
        console.info("Go to Next Case clicked...");

        var nextCaseId = getNextCase();
        console.log("Next Case ID: " + nextCaseId);

        var caseUrl = getCaseUrl(nextCaseId);
        console.log("Next Case URL: " + caseUrl);

        window.location.pathname = caseUrl;
    }

    function getCaseUrl(caseId) {
        console.info("Generating URL...");

        return url.resolveRecord({
            recordType : r.Type.SUPPORT_CASE,
            recordId : caseId,
            isEditMode : true 
        });
    }

    function getNextCase() {
        console.info("Retrieving next case...");

        return s.load({
            id : "customsearch_cases_by_priority"
        }).run().getRange({ start : 0, end : 1 })[0].id;
    }

    exports.goToNextCase = goToNextCase;
    return exports;
});