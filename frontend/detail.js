const apiUrl = 'http://localhost:3000';
const detail = document.querySelector('#facility-detail');
const status = document.querySelector('#detail-status');
const retryButton = document.querySelector('#retry-button');
const id = new URLSearchParams(window.location.search).get('id');

function showStatus(message, canRetry = false) {
  status.textContent = message;
  status.hidden = false;
  detail.hidden = true;
  retryButton.hidden = !canRetry;
}

async function loadFacility() {
  if (!id || !/^[1-9]\d*$/.test(id)) {
    showStatus('Il link a questo impianto non è valido. Torna all’elenco e scegli un impianto.');
    return;
  }

  showStatus('Caricamento del dettaglio in corso…');

  try {
    const response = await fetch(`${apiUrl}/facilities/${id}`);
    if (response.status === 404) {
      showStatus('Questo impianto non è stato trovato. Torna all’elenco per scegliere un altro spazio.');
      return;
    }
    if (!response.ok) throw new Error('Risposta del server non valida');

    const facility = await response.json();
    document.querySelector('#detail-name').textContent = facility.name;
    document.querySelector('#detail-type').textContent = facility.type;
    document.querySelector('#detail-description').textContent = facility.description;
    document.querySelector('#detail-initial').textContent = facility.name.charAt(0);
    document.title = `${facility.name} | SportHub`;

    status.hidden = true;
    detail.hidden = false;
  } catch (error) {
    showStatus('Non riusciamo a caricare il dettaglio. Verifica che il backend sia avviato e riprova.', true);
  }
}

retryButton.addEventListener('click', loadFacility);
loadFacility();
