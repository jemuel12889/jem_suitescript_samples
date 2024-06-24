/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
define(['N/task'], (task) => {
    return {
        get : () => {
            let mrTask = task.create({
                taskType : task.TaskType.SCHEDULED_SCRIPT
            });

            // Script ID and Deployment ID are placeholders
            mrTask.scriptId = 488;
            mrTask.deploymentId = 'customdeploy_scheduledscript';
            mrTask.params = {
                custscriptcustom_data : 'data'
            };
            mrTask.submit();
            return 'Scheduled script updated';
        }
    };
});