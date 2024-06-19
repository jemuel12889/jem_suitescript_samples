/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'], (serverWidget) => {
    return {
        onRequest : (context) => {
            var assistant = serverWidget.createAssistant({
                title : 'New Supervisor',
                hideNavBar : true
            });
            var assignment = assistant.addStep({
                id : 'assignment',
                label : 'Select New Supervisor'
            });
            var review = assistant.addStep({
                id : 'review',
                label : 'Review and Submit'
            });

            var writeAssignment = function() {
                assistant.addField({
                    id : 'newsupervisor',
                    type : serverWidget.FieldType.SELECT,
                    label : 'Name',
                    source : 'employee'
                });
                assignment.addField({
                    id : 'assignedemployee',
                    type : serverWidget.FieldType.SELECT,
                    label : 'Employee',
                    source : 'employee'
                });
            }

            var writeReview = function() {
                var supervisor = assistant.addField({
                    id : 'newsupervisor',
                    type : serverWidget.FieldType.TEXT,
                    label : 'Name'
                });
                supervisor.defaultValue = context.request.parameters.inpt_newsupervisor;
                supervisor.updateDisplayType({
                    displayType : serverWidget.FieldDisplayType.INLINE
                });

                var employee = assistant.addField({
                    id : 'assignedemployee',
                    type : serverWidget.FieldType.TEXT,
                    label : 'Emplpoyee'
                });
                employee.defaultValue = context.request.parameters.inpt_assignedemployee;
                employee.updateDisplayType({
                    displayType : serverWidget.FieldDisplayType.INLINE
                });
            }

            var writeResult = function() {
                var supervisor = context.request.parameters.newsupervisor;
                var employee = context.request.parameters.assignedemployee;
                context.response.write('Supervisorr: ' + supervisor + '\nEmployee: ' + employee);
            }

            var writeCancel = function() {
                context.response.write('Assistant was cancelled')
            }

            if (context.request.method === 'GET') {
                writeAssignment();
                assistant.currentStep = assignment;
                context.response.writePage(assistant);
            } else {
                if (context.request.parameters.next === 'Finish')
                    writeResult();
                else if (context.request.parameters.cancel)
                    writeCancel();
                else if (context.request.parameters.stepNumber === 1) {
                    writeReview();
                    assistant.currentStep = assistant.getNextStep();
                    context.response.writePage(assistant);
                }
            }
        }
    };
});