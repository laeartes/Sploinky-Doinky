function init() {
  document
    .getElementById("addPart")
    .addEventListener("click", () => addParticipantRow());
  document
    .getElementById("Calculate")
    .addEventListener("click", () => onCalcClick());
  document.getElementById("Save").addEventListener("click", onSaveClick);
  addParticipantRow();
  addParticipantRow();
}

function addParticipantRow(name = "", paid = "") {
  const row = document.createElement("div");
  row.className = "partRow";
  row.dataset.id = generateID();

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "partName";
  nameInput.placeholder = "Vardenis";
  nameInput.value = name;

  const paidInput = document.createElement("input");
  paidInput.type = "number";
  paidInput.className = "partPaid";
  paidInput.step = "0.01";
  paidInput.placeholder = "Sumokėjo???";
  paidInput.value = paid;

  const removeBtn = document.createElement("button");
  removeBtn.className = "removePart";
  removeBtn.textContent = "X";
  removeBtn.addEventListener("click", () => row.remove());

  row.appendChild(nameInput);
  row.appendChild(paidInput);
  row.appendChild(removeBtn);

  document.getElementById("participantList").appendChild(row);
}

function generateID() {
  return "p-" + Math.random().toString(36).substring(2, 9);
}

function readParticipantsFromDOM() {
  const rows = document.querySelectorAll(".partRow");
  const participants = [];
  rows.forEach((element) => {
    const id = element.dataset.id;
    const name = element.querySelector(".partName").value.trim();
    const paid = parseFloat(element.querySelector(".partPaid").value);

    participants.push({
      id: id,
      name: name || "N/A",
      paid: isNaN(paid) ? 0 : paid,
    });
  });
  return participants;
}

function computeTotals(participants) {
  if (participants.length === 0) return null;

  let total = 0;
  for (let i = 0; i < participants.length; i++) {
    const participant = participants[i];
    total += participant.paid;
  }

  const share = total / participants.length;
  const totals = [];
  for (let i = 0; i < participants.length; i++) {
    const participant = participants[i];
    let total = participant.paid - share;
    totals.push({
      id: participant.id,
      name: participant.name,
      paid: participant.paid,
      balance: total,
    });
  }
  return totals;
}

function computeTransfers(totals) {
  //shiiit cia bus funky
  //pirmiausia pasiimam kas skolingi ir kas pinigingi?
  let pinigingi = [];
  let skolingi = [];
  for (let i = 0; i < totals.length; i++) {
    if (totals[i].balance > 0) {
      pinigingi.push(totals[i]);
    } else if (totals[i].balance < 0) {
      let t = totals[i];
      t.balance = -t.balance;
      skolingi.push(t);
    }
  }
  const transfers = [];
  let i = 0, j = 0;
  while (i < skolingi.length && j < pinigingi.length) {
    const skolingas = skolingi[i];
    const pinigingas = pinigingi[j];
    const kiekis = Math.min(skolingas.balance, pinigingas.balance);

    transfers.push({
      from: skolingas.name,
      to: pinigingas.name,
      amount: parseFloat(kiekis.toFixed(2)),
    });

    skolingas.balance -= kiekis;
    pinigingas.balance -= kiekis;

    if (skolingas.balance < 0.01) i++;
    if (pinigingas.balance < 0.01) j++;
  }
  return transfers;
}

function renderSummary() { } //gal net nereikes sito.. veliau pamastysiu

function renderTransfers(transfers) {
  const container = document.getElementById('transfers');
  container.innerHTML = "";

  const title = document.createElement('h3');
  title.textContent = "Pervedimai";
  container.appendChild(title);

  if (transfers.length === 0) {
    const p = document.createElement('p');
    p.textContent = "allg bro";
    container.appendChild(p);
    return;
  }

  transfers.forEach(t => {

    const div = document.createElement('div');
    div.className = "transferRow";
    div.textContent = `${t.from} → ${t.to}: ${t.amount.toFixed(2)} €`;
    container.appendChild(div);
  });
}

function onCalcClick() {
  const participants = readParticipantsFromDOM();
  const totals = computeTotals(participants);
  const transfers = computeTransfers(totals);
  renderTransfers(transfers);
}

function onSaveClick() { }

document.addEventListener("DOMContentLoaded", () => {
  init();
});
