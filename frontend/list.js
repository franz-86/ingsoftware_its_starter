const apiUrl = 'http://localhost:3000';
const list = document.querySelector('#facility-list');
const status = document.querySelector('#list-status');
const retryButton = document.querySelector('#retry-button');

function showStatus(message, canRetry = false) {
  status.textContent = message;
  status.hidden = false;
  list.hidden = true;
  retryButton.hidden = !canRetry;
}

function createFacilityCard(facility) {
  const item = document.createElement('li');
  const article = document.createElement('article');
  const link = document.createElement('a');
  const number = document.createElement('span');
  const type = document.createElement('span');
  const name = document.createElement('h3');
  const description = document.createElement('p');
  const action = document.createElement('span');

  article.className = 'facility-card';
  link.className = 'facility-card-link';
  link.href = `/facility.html?id=${facility.id}`;
  number.className = 'facility-number';
  number.textContent = String(facility.id).padStart(2, '0');
  type.className = 'tag';
  type.textContent = facility.type;
  name.textContent = facility.name;
  description.textContent = facility.description;
  action.className = 'card-action';
  action.textContent = 'Scopri l’impianto →';

  link.append(number, type, name, description, action);
  article.append(link);
  item.append(article);
  return item;
}

async function loadFacilities() {
  showStatus('Caricamento degli impianti in corso…');

  try {
    const response = await fetch(`${apiUrl}/facilities`);
    if (!response.ok) throw new Error('Risposta del server non valida');

    const facilities = await response.json();
    if (facilities.length === 0) {
      showStatus('Al momento non ci sono impianti da mostrare.');
      return;
    }

    list.replaceChildren(...facilities.map(createFacilityCard));
    status.hidden = true;
    list.hidden = false;
  } catch (error) {
    showStatus('Non riusciamo a caricare gli impianti. Verifica che il backend sia avviato e riprova.', true);
  }
}

retryButton.addEventListener('click', loadFacilities);
loadFacilities();
