function init () {
    $('#menubar').load('menuBar.html');
    //$('#content').load('');
    $('#footer').load('footer.html');
}

function main () {
    $(document).ready(init);
}

main();