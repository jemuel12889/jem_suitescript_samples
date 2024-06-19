/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */

define(['N/search',], function(s) {
    s.create({
        type : s.Type.EMPLOYEE,
        filters : [
            ["hiredate", s.Operator.WITHIN, "lastRollingYear"],
            ["isinactive", s.Operator.IS, "F"]
        ]
    }).run().each(processResult);

    function processResult(result) {
        return true;
    }
    
});