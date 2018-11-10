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
 * Add manufacturer
 */

function processResponse (statusCode) {
    let statusBar = $('#status-msg');
    statusBar.removeClass('fail-msg');
    statusBar.removeClass('success-msg');

    if (statusCode == 409) {
        statusBar.addClass('fail-msg').show();
        statusBar.text('Failed to add manufacturer');
    } else if (statusCode == 200) {
        statusBar.addClass('success-msg').show();
        statusBar.text('Success');
    }
}

function addManufacturer () {
    let form = $('#add-manufacturer-form');

    $.ajax('/addManufacturers', {
        type: 'POST',
        data: {
            name: form.find('#name').val(), 
            country: form.find('#country').val(), 
            founded: form.find('#founded').val()
        },
        statusCode: {
            200: () => processResponse(200),
            409: () => processResponse(409)
        }
    });
}

function loadAddManufacturerForm() {
    $('#content').load('addManufacturerForm.html');
}

/**
 * Page initialization
 */
function main () {
    $(document).ready(init);
}

main();