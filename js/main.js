function init () {
    $('#menubar').load('menuBar.html');
    $('#footer').load('footer.html');
}

/**
 * Browse manufacturers
 */

function fillManufacturersTable (data, status) {
    if (status != "success") {
        return;
    }

    for (let i in data) {
        $('#manufacturers-table').append(
            `<tr>
                <td>${data[i].name}</td>
                <td>${data[i].country}</td>
                <td>${data[i].founded}</td>
            </tr>`
        );
    }
}

function loadManufacturersData () {
    $.get("/manufacturers", fillManufacturersTable)
}

function loadBrowseManufacturers () {
    $('#content').load('browseManufacturers.html');
    loadManufacturersData();
}

/**
 * 
 */


/**
 * Page initialization
 */
function main () {
    $(document).ready(init);
}

main();