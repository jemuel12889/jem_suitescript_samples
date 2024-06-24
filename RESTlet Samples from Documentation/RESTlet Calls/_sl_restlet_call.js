/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/https'], (https) => {
    function onRequest(context) {
        let myRestletHeaders = {
            myHeaderType : 'Test',
            myHeaderStuff : 'This is my header',
            myHeaderId : 3
        };

        let myUrlParameters = {
            myFirstParameter : 'firstparam',
            mySecondParameter : 'secondparam'
        };
        
        let myRestletResponse = https.requestRestlet({
            body : 'My Restlet body',
            deploymentId : 'deploy1',
            headers : myRestletHeaders,
            method : 'GET',
            scriptId : 99,
            urlparams : myUrlParameters
        });
    }
});