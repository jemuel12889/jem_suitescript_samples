/**
 * @NApiVersion 2.x
 */

require(['N/datasetLink', 'N/dataset'], function(datasetLink, dataset) {
    // Load the datasets to link (from custom scripts)
    var budgetDataset = dataset.create({
        id : 'customscript1772'
    });

    var salesDataset = dataset.create({
        id : 'customscript1773'
    });

    // Create expressions for columns in each dataset
    // The alias parameter value represents the alias set
    // on the associated column in the dataset
    var budgetMachinePeriodExp = budgetDataset.getExpressionFromColumn({
        alias : 'budgetmachineperiod'
    });

    var postingPeriodExp = sales.getExpressionFromColumn({
        alias : 'postingperiod'
    });

    // Link the datasets
    var myDatasetLink = datasetLink.create({
        datasets : [budgetDataset, salesDataset],
        expressions : [budgetMachinePeriodExp, postingPeriodExp],
        id : 'myLinkedDatasetId'
    });
});