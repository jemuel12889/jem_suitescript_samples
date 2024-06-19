// 2.0
require(['N/search'], function (s) {
    s.create({
        type : s.Type.EMPLOYEE,
        filters : [
            ["hiredate", "on", "sameDayLastFiscalYear"],
            "and",
            ["isinactive", "is", "F"]
        ],
        columns : [{
            name : "internalid",
            summary : s.Summary.COUNT
        }
        ]
    }).run().each(processResult);

    function processResult(result) {
        var employeeCount = result.getValue({
            name : "internalid",
            summary : s.Summary.COUNT
        }); 

        log.debug({
            title: "Employees Hired Today Last Year: ",
            message : message
        });
        return true;
    }
});