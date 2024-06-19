/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/https', 'N/url'], (serverWidget, https, url) => {
    function onRequest(context) {
        if (context.request.method === 'GET') {
            const form = serverWidget.createForm({
                title : 'Password Form'
            });

            const credField = form.addCredentialField({
                id : 'password',
                label : 'Password',
                restrictToDomains : ['<accountID>.app.netsuite.com'],
                restrictToCurrentUser : false,
                restrictToScriptIds : 'custom_my_script'
            });

            credField.maxLength = 32;

            form.addSumbitButton();

            context.response.writePage({
                pageObject : form
            });
        } else {
            let passwordGuid = context.request.parameters.password;

            let baseUrl = url.resolveScript({
                scriptId : '<SCRIPTID>',
                deploymentId : '<DEPLOYMENTID>',
                returnExternalURL : true
            });

            let authUrl = baseUrl + '&pwd={' + passwordGuid + '}';

            let secureStringUrl = https.createSecureString({
                input : authUrl
            });

            let headers = ({
                'pwd' : passwordGuid
            });

            let response = https.post({
                credentials : [passwordGuid],
                url : secureStringUrl,
                body : { authorization : ' ' + passwordGuid + '', data : 'anything can be here' },
                headers : headers
            });
        }
    }
    return {
        onRequest : onRequest
    };
});