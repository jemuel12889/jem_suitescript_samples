/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */

define(['N/record', 'N/ui/serverWidget'], (rec, serverWidget) => {
    //BeforeLoad entry point disables text field with ID = 'comments' to restrict editting if user event type is CREATE
    function myBeforeLoad(context) {
        //Checks if User Event Type is CREATE
        if (context.type !== context.UserEventType.CREATE)
            return;

        //Creates variables to reference the current form and 'comments' field
        var form = context.form;
        var notesField = form.getField({
            id : 'comments'
        });

        //Disables 'comments' field to restrict editting
        notesField.updateDisplayType({
            displayType : serverWidget.FieldDisplayType.DIABLED
        });
    }

    //BeforeSubmit sets value for the 'comments' field before record gets inserted to database
    function myBeforeSubmit(context) {
        if (context.type !== context.UserEventType.CREATE)
            return;

        //Value of 'comments' field set to 'Orientation date TBD.'
        var newEmployeeRecord = context.newRecord;
        newEmployeeRecord.setValue({
            fieldId : 'comments',
            value : 'Orientation date TBD.'
        });
    }

    //AfterSubmit creates new Task record with information from newly created Employee record
    function myAfterSubmit(context) {
        if (context.type !== context.UserEventType.CREATE)
            return;

        //Creates variables to store Employee data to pass to the new Task to be created
        var newEmployeeRecord = context.newRecord;

        var newEmployeeFirstName = newEmployeeRecord.getValue({
            fieldId : 'firstname'
        });

        var newEmployeeLastName = newEmployeeRecord.getValue({
            fieldId : 'lastname'
        });

        var newEmployeeSuperVisor = newEmployeeRecord.getValue({
            fieldId : 'supervisor'
        });

        //Checks if 'supervisor' field in the Employee record is not empty
        if (newEmployeeSuperVisor) {
    
            //If 'supervisor' is not empty, script creates a new Task record
            var newTask = rec.create({
                type : rec.Type.TASK,
                isDynamic : true
            });
            newTask.setValue({
                fieldId : 'title',
                value : 'Schedule orientation session for ' + newEmployeeFirstName + ' ' + newEmployeeLastName
            });
            newTask.setValue({
                fieldId : 'assigned',
                value : newEmployeeSuperVisor
            });
            try {
                //Submits newly created Task record to database and logs its ID to check is creation is successful
                var newTaskId = newTask.save();
                log.debug({
                    title : 'Task record created successfully',
                    details : 'New task record ID: ' + newTaskId
                });
            } catch (e) {
                //If new Task creation is unsuccessful, script throws an error message
                log.error ({
                    title : e.name,
                    details : e.message
                });
            }
        }
    }

    //Returns an object to assign each function to respective entry points
    return {
        beforeLoad : myBeforeLoad,
        beforeSubmit : myBeforeSubmit,
        afterSubmit : myAfterSubmit
    };
});