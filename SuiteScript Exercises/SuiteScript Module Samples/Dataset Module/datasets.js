/**
 * @NApiVersion 2.x
 */

require(['N/dataset', 'N/query'], function(dataset, query) {
    var myTransactionDateColumn = dataset.createColumn({
        fieldId : 'trandate',
        alias : 'date'
    });

    var myJoin = dataset.createJoin({
        fieldId : 'createdby',
        target : 'entity'
    });

    var myNameColumn = dataset.createColumn({
        fieldId : 'lastname',
        alias : 'name',
        join : myJoin
    });
    
    var myTransactionIdColumn = dataset.createColumn({
        fieldId : 'tranid',
        alias : 'id'
    });

    var myTotalColumn = dataset.createColumn({
        fieldId : 'foreigntotal',
        alias : 'total'
    });

    var myColumns = [myTransactionIdColumn, myNameColumn, myTransactionDateColumn, myTotalColumn];
    var myCondition = dataset.createCondition({
        column : myNameColumn,
        operator : query.Operator.EMPTY
    });

    var myDataset = dataset.create({
        type : 'transaction',
        columns : myColumns,
        condition : myCondition
    });

    var allDatasets = dataset.list();
    log.audit({
        title : 'All Datasets: ',
        details : allDatasets
    });

    log.audit({
        title : 'My Dataset = ',
        details : myDataset
    });

    var runResult = myDataset.run();
    var runPagedResult = myDataset.runPaged({
        pageSize : 2
    });
    log.audit({
        title : 'myDataset runResult: ',
        details : runResult
    });

    log.audit({
        title : 'myDataset runPagedResult: ',
        details : runPagedResult
    });
});