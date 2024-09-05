/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope Public
 */

define([], function(){
    var exports = {};
    function pageInit(context) {
        console.log("Hello, World from a 2.0 Client Script!");
    }
    exports.pageInit = pageInit;
    return exports;
});