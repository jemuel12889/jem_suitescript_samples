/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/file', 'N/keyControl', 'N/runtime'], (serverWidget, file, keyControl, runtime) => {
    function onRequest(context) {
        var request = context.request;
        var response = context.response;

        if (request.method === 'GET') {
            var form = serverWidget.createForm({
                title : 'Enter Password'
            });

            var credField = form.addSecretKeyField({
                id : 'custfield_password',
                label : 'Password',
                restrictToScriptIds : [runtime.getCurrentScript().id],
                restrictToCurrentUser : true
            });

            credField.maxLength = 64;

            form.addSubmitButton();
            response.writePage(form);
        } else {
            var passwordToken = request.parameteres.custfield_password;

            var pem = file.load({
                id : 422
            });

            var key = keyControl.createKey();
            key.file = pem;
            key.name = 'Test';
            key.password = passwordToken;
            key.save();
        }
    }    
    return {
        onRequest : onRequest
    };
});