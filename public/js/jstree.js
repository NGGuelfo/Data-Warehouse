let espacio = " ";
let searchId;

$('#jstree').jstree({
    "core": {
        "themes": {
            "variant": "large"
        }
    },
    "checkbox": {
        "keep_selected_style": true
    }
});

$(function () {

    $('#jstree').jstree();


    $('button').on('click', function () {
        $('#jstree').jstree(true).select_node('child_node_1');
        $('#jstree').jstree('select_node', 'child_node_1');
        $.jstree.reference('#jstree').select_node('child_node_1');
    });
});
