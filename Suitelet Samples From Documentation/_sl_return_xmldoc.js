/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define([], function() {
    function onRequest(context) {
        var xml = '<?xml version="1.0" encoding="utf-8" ?>' +
            '<message>' + 'Hello World' + '</message>';
        context.response.write(xml);
        context.response.setHeader({
            name : 'Custom-Header-Demo',
            value : 'Demo'
        });
    }    
    return{
        onRequest : onRequest
    };
});