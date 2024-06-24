/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */

// This is a Client Script calling a Restlet
define(['N/https'], (https) => {
    return {
        pageInit : () => {
            // Restlet URL is a placeholder
            let dataFromRestlet = https.get({
                url : '/app/site/hosting/restlet.nl?script=200&deploy=1'
            });
            console.log(dataFromRestlet.body);
        }
    };
});