/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */

define(['N/search'], function(s) {
    var search = s.load({
        id : "customsearch_emp_hiredthisyear"
    }).run().getRange({
        start : 0,
        end : 1000
    });
    

    for (var i = 0; i < search.length; i++) {
        printEmployeeName(results[i]);    
    }

    function printEmployeeName(result) {
        log.debug({
            title : "Employee Name: ",
            details : result.getValue({
                name : "firstname"
            })
        });
        return true;
    }

});