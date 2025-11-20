function init()
{
    document.getElementById('addPart').addEventListener('click', () => addParticipantRow());
    document.getElementById('Calculate').addEventListener('click', onCalcClick);
    document.getElementById('Save').addEventListener('click', onSaveClick);
    addParticipantRow();
    addParticipantRow();
}

function addParticipantRow(name = "", paid="")
{
    const row = document.createElement('div');
    row.className = 'partRow';
    row.dataset.id = generateID();
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'partName';
    nameInput.placeholder = 'Vardenis';
    nameInput.value = name;

    const paidInput = document.createElement('input');
    paidInput.type = 'number';
    paidInput.className = 'partPaid';
    paidInput.step = '0.01';
    paidInput.placeholder = 'Sumokėjo???';
    paidInput.value = paid;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'removePart';
    removeBtn.textContent = 'X';
    removeBtn.addEventListener('click', () => row.remove());

    row.appendChild(nameInput);
    row.appendChild(paidInput);
    row.appendChild(removeBtn);

    document.getElementById('participantList').appendChild(row);
}

function generateID()
{
    return 'p-' + Math.random().toString(36).substring(2,9);
}


function readParticipantsFromDOM()
{

}

function computeTotals()
{
   
}

function renderSummary(total,share)
{

}

function renderTransfers(transfersArray)
{

}

function onCalcClick()
{

}

function onSaveClick()
{

}

document.addEventListener('DOMContentLoaded',()=> {init();});
