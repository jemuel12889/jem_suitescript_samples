/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */

define(['N/record', 'N/runtime', 'N/ui/serverWidget', 'N/url'], function(record, runtime, serverWidget, url) {
    function beforeLoad(context) {
        var currentUserID = runtime.getCurrentUser().id;

        if ((runtime.executionContext === runtime.ContextType.USER_INTERFACE) && (context.type === context.UserEventType.EDIT || context.type === context.UserEventType.VIEW)) {
            var SampleTab = context.form.addTab({
                id : 'custpage_sample_tab',
                label : 'Sample Tab'
            });

            var createNewReqLink = context.form.addField({
                id : 'custpage_new_req_link',
                type : 'inlinehtml',
                label : ' ',
                container : 'custpage_sample_tab'
            });

            var linkURL = url.resolveScript({
                scriptId : '{some suitelet script id}',
                deploymentId : '{some deployment id}'
            }) + '&recordid=' + context.newRecord.id;

            createNewReqLink.defaultValue = '<B>Click <A HREF=\"' + linkURL
                + '\">here</A> to create a new document signature request record.'

            var signatureRequestSublist = context.form.addSublist({
                id : 'custpage_sig_req_sublist',
                type : 'list',
                label : 'Document Signature Requests',
                tab : 'custpage_sample_tab'
            });

            signatureRequestSublist.addField({
                id : 'custpage_req_name',
                type : 'text',
                label : 'Name'
            });
            signatureRequestSublist.addField({
                id : 'custpage_req_status',
                type : 'text',
                label : 'Status'
            });
            signatureRequestSublist.addField({
                id : 'custpage_req_created',
                type : 'date',
                label : 'Date Created'
            });
        }
    }
    return {
        beforeLoad : beforeLoad
    };
});