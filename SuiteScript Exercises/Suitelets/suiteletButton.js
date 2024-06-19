define(['N/log', 'N/search', 'N/ui/serverWidget'], function(log, s, ui) {

    /**
     * @exports suitelet-results
     * @NApiVersion 2.x
     * @NModuleScopr SameAccount
     * @NScriptType Suitelet
     */

    var exports = {};

    /**
     * <code>onRequest</code> event handler
     * 
     * @governance 0
     * 
     * @param context
     *        {Object}
     * @param context.request
     *        {ServerRequest} The incoming request object
     * @param context.response
     *        {ServerResponse} The outgoing response object
     * 
     * @return {void}
     * 
     * @static
     * @function onRequest
     */

    function onRequest(context) {
        log.audit({ title : "Request Received." });

        context.response.write({
            output : "High Priority Cases Count = " + findCases().length
        });

        context.response.writePage({
            pageObject : renderList(translate(findCases()))
        });
    }

    function renderList(results) {
        var list = ui.createList({ title : "High Priority Cases" });

        list.addButton({
            id : "custpage_btn_nextcase",
            label : "Go to next case",
            functionName : "goToNextCase"
        });

        list.clientScriptModulePath = "./suiteletButtonCS.js";

        list.addColumns({
            id : "casenumber",
            type : ui.FieldType.TEXT,
            label: "Case Number"
        });
        list.addColumns({
            id : "status",
            type : ui.FieldType.TEXT,
            label: "Status"
        });
        list.addColumns({
            id : "priority",
            type : ui.FieldType.TEXT,
            label: "Priority"
        });
        list.addColumns({
            id : "title",
            type : ui.FieldType.TEXT,
            label: "Subject"
        });

        list.addRows({ rows : results });
        return list;
    }

    function findCases() {
        log.audit({ title : "Finding Cases..." });
        
        return s.create({
            type : s.Type.SUPPORT_CASE,
            filters : [
                ["status", s.Operator.NONEOF, ["5"]], "and",
                ["priority", s.Operator.ANYOF, ["1"]]
            ],
            columns: [
                "casenumber",
                "status",
                "priority",
                "title"
            ]
        }).run().getRange({ start : 0, end : 20 });
    }

    function resultToObject(result) {
        return {
            casenumber : result.getValue({ name : "casenumber" }),
            status : result.getText({ name : "title" }),
            priority : result.getText({ name : "priority" }),
            title : result.getValue({ name : "title"})
        };
    }

    function translate(results) {
        return results.map(resultToObject);
    }

    exports.onRequest = onRequest;
    return exports;

});