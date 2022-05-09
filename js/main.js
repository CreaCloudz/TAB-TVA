let btnAdd = document.querySelector('.button-send');
let btnRemove = document.querySelector('.button-remove')
let btnClearAllInput = document.querySelector('.button-clearAll');
let btnReset = document.querySelector('.button-reset');
let priceHt = document.querySelector('.price-ttc');
let selectElement = document.querySelector('select');

btnAdd.addEventListener('click', function (event) {
    addRow("table");
});

btnRemove.addEventListener('click', function (event) {
    delRow("table");
});

btnClearAllInput.addEventListener('click', function (event) {
    clearAllInput();
});

btnReset.addEventListener('click', function (event) {
    reload();
});

addEventListener('input', function (event) {
    totalPriceTTC();
});

priceHt.addEventListener('input', function (event) {
    calculTTC(this);
});

selectElement.addEventListener('change', function(event) {
    calculHT(this);
});

function addRow(id) {
    let x = document.getElementById(id).tBodies[0];
    let node = x.rows[0].cloneNode(true);
    node.id = '';
    node.querySelector('.name').value = '';
    node.querySelector('.price-ht').value = '';
    node.querySelector('.price-ttc').value = '';

    x.insertBefore(node, x.rows[x.rows.length - 1]);


    node.querySelector('.price-ttc').addEventListener('input', function (event) {
       event.preventDefault();
       calculTTC(event.target);
    });
    node.addEventListener('change', function (event) {
        event.preventDefault();
        calculHT(event.target);
    });
    node.querySelector('.calculHT').addEventListener('click', function (event) {
       event.preventDefault();
       calculHT(event.target);
    });
    node.querySelector('.clearInput').addEventListener('click', function (event) {
       event.preventDefault();
       clearInput(event.target);
    });
    node.querySelector('.remove').addEventListener('click', function (event) {
        event.preventDefault();
        deleteRow(event.target);
    });
    node.addEventListener('input', function (event) {
        event.preventDefault()
        totalPriceTTC();
    });

    sendAlert('success', 'La ligne est bien ajoutée !');
}

function delRow(id) {
    let x = document.getElementById(id).tBodies[0];

    if (x.rows.length <= 2) {
        return sendAlert('danger', 'La ligne n°1 & n°2 ne peuvent etre supprimée');
    }
    x.deleteRow(1);
    totalPriceTTC();
}

function clearAllInput() {
    let elements = document.getElementsByTagName("input");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].type == "text") {
            elements[i].value = "";
        }
    }
    totalPriceTTC();
}

function reload() {
    location.reload();
}

function calculHT(o) {
    let p = o.parentNode.parentNode;
    let priceHT = parseFloat(p.querySelector(".price-ht").value);
    let TVA = getTVA(parseFloat(p.querySelector(".tva").value));
    let TTC = (priceHT + ((priceHT * TVA) / 100));

    if (isNaN(TTC)) {
        p.querySelector(".price-ttc").value = 0;
    } else {
        p.querySelector(".price-ttc").value = TTC.toFixed(2);
    }
    totalPriceTTC();
}

let btnCalcHtLine = document.querySelector('.calculHT');
btnCalcHtLine.addEventListener('click', function (event) {
    event.preventDefault();
    calculHT(event.target);
});


function calculTTC(o) {
    let p = o.parentNode.parentNode;

    let priceTTC = parseFloat(p.querySelector(".price-ttc").value).toFixed(2);
    let TVA = getTVA(parseFloat(p.querySelector(".tva").value).toFixed(2));
    let HT = (100 * priceTTC) / (100 + TVA);

    if (isNaN(HT)) {
        p.querySelector(".price-ht").value = 0;
    } else {
        p.querySelector(".price-ht").value = HT.toFixed(2);
    }
    totalPriceTTC();
}

function clearInput(o) {
    let p = o.parentNode.parentNode;
    let elements = p.querySelectorAll(".form-control");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].type == "text") {
            elements[i].value = "";
        }
    }
    totalPriceTTC();
}

let btnClearInputLine = document.querySelector('.clearInput');
btnClearInputLine.addEventListener('click', function (event){
    event.preventDefault();
    clearInput(event.target);
    return sendAlert('success', 'Les champs de la ligne sont vides !');
});

function deleteRow(o) {
    let p = o.parentNode.parentNode;
    if (p.id == 'first_line') {
        return sendAlert('danger', 'La ligne n°1 & n°2 ne peuvent etre supprimée');
    }
    p.parentNode.removeChild(p);
    totalPriceTTC();
    return sendAlert('warning', 'La ligne demandée est bien supprimée');
}


// EVENT SUPPR LIGNE
let btnRemoveOneline = document.querySelector('.remove');
btnRemoveOneline.addEventListener('click', function (event){
    event.preventDefault();
    deleteRow(event.target);
});

function totalPriceTTC() {
    let allInputs = document.querySelectorAll('.price-ttc');
    console.log(allInputs);
    let total = 0;
    for (let input of allInputs) {
        if (input.value == ''){
            input.value = 0;
        }
        total += parseFloat(input.value);
    }
    document.querySelector('.total-price-ttc').value = total.toFixed(2);
}

function getTVA(tva) {
    if (tva == 1)
        return 5.5;
    else if (tva = 2) {
        return 20.0;
    }
    return null;
}

function sendAlert(_couleur, _contenu){
    let alert = document.createElement('div');
    alert.classList.add('alert', 'alert-' + _couleur, 'my-2', 'mx-2', 'text-center');
    alert.textContent = _contenu;
    let divInfoAlert = document.querySelector('#info-alert');
    divInfoAlert.innerHTML = '';
    divInfoAlert.appendChild(alert);
    window.setTimeout(function () {
        document.querySelector('#info-alert').innerHTML = '';
    }, 2000)
}
