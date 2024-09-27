/**
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */

/** I copied and pasted a sample HTML from the web as a string value for html property of the Portlet */
define([], () => {
    function render(params) {
        let myPortlet = params.portlet;
        myPortlet.title = 'My Sample HTML Portlet';
        myPortlet.html = '<div style="background-color: antiquewhite; border-radius: 5%; width: 100%;">'
        + '<div style="width: 50%; float: left;">'
        +    '<img src="https://9478562-sb2.app.netsuite.com/core/media/media.nl?id=18534&c=9478562_SB2&h=_p7adYXxl5n6S_oucbvW5lMrRc9HTbjL9c9j9inl_br9BS8U" alt="" style="width: 100%; height: 100%; object-fit: contain;">'
        + '</div>'
        + '<div style="width: 50%; float: left; vertical-align: middle;">'
        +    '<h1>Jemuel Bautista David</h1>'
        +    '<p><b>Date of Birth: </b>May 10, 2001</p>'
        +    '<p><b>Address: </b>Magalang, Pampanga</p>'
        +    '<p><b>Religion: </b>Baptist</p>'
        +    '<p><b>Job: </b>NetSuite Developer</p>'
        +'</div>'
        + '</div>'
    }

    return {
        render : render
    }
});