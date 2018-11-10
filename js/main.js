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
    $('#content').load('browseManufacturers.html',loadManufacturersData);
}

/**
 * Add manufacturer
 */

function processResponse (statusCode, successMsg, failMsg) {
    let statusBar = $('#status-msg');
    statusBar.removeClass('fail-msg');
    statusBar.removeClass('success-msg');

    if (statusCode == 409) {
        statusBar.addClass('fail-msg').show();
        statusBar.text(failMsg);
    } else if (statusCode == 200) {
        statusBar.addClass('success-msg').show();
        statusBar.text(successMsg);
    }
}

function addManufacturer () {
    let form = $('#add-manufacturer-form');
    let successMsg = "Success";
    let failMsg = "Failed to add manufacturer";

    $.ajax('/addManufacturers', {
        type: 'POST',
        data: {
            name: form.find('#name').val(), 
            country: form.find('#country').val(), 
            founded: form.find('#founded').val()
        },
        statusCode: {
            200: () => processResponse(200, successMsg, failMsg),
            409: () => processResponse(409, successMsg, failMsg)
        }
    });
}

function loadAddManufacturerForm() {
    $('#content').load('addManufacturerForm.html');
}


/**
 * Browse cars
 */
function fillCarsTable (data, status) {
    if (status != 'success') {
        return;
    }

    $('#cars-table tbody').empty();

    for (let i in data) {
        $('#cars-table tbody').append(
            `<tr>
                <td>${data[i].name}</td>
                <td>${data[i].consumption}</td>
                <td>${data[i].color}</td>
                <td>${data[i].manufacturer}</td>
                <td>${data[i].year}</td>
                <td>${data[i].available}</td>
                <td>${data[i].horsepower}</td>
            </tr>`
        );
    }
}

function loadAllCars () {
    $.get('/cars', fillCarsTable);
}

function fillManufacturersPicker (data, status) {
    if (status != 'success') {
        return;
    }

    let picker = $('#manufacturer-picker');

    for (let i in data) {
        picker.append(`<option value="${data[i]}">${data[i]}</option>`);
    }
}

function loadAllManufacturersNames () {
    $.get('/manufacturerNames', fillManufacturersPicker);
}

function loadBrowseCars () {
    $('#content').load('browseCars.html', () => {loadAllCars(); loadAllManufacturersNames();});
}

function loadCarsOfManufacturer () {
    let manufacturer = $('#manufacturer-picker :selected').val();

    if (manufacturer == "all") {
        return loadAllCars();
    }

    document.cookie = `name=${manufacturer}`;
    $.get('/manufacturer', fillCarsTable);
}

/**
 * Add car
 */

function loadAddCar () {
    $('#content').load('addCarForm.html', loadAllManufacturersNames);
}

function addCar () {
    let form = $('#add-car-form');
    let successMsg = "Success";
    let failMsg = "Failed to add car";

    $.ajax('/addCar', {
        type: 'POST',
        data: {
            name: form.find('#name').val(),
            consumption: `${form.find('#consumption').val()} l/100km`,
            color: form.find('#color').val(),
            manufacturer: form.find('#manufacturer-picker :selected').val(),
            year: form.find('#year').val(),
            available: form.find('#available').val(),
            horsepower: form.find('#horsepower').val()
        },
        statusCode: {
            200: () => processResponse(200, successMsg, failMsg),
            409: () => processResponse(409, successMsg, failMsg)
        }
    })
}

/**
 * Page initialization
 */
function main () {
    $(document).ready(init);
}

main();