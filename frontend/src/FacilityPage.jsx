import { useEffect, useState } from 'react';

const apiUrl = 'http://localhost:3000';

export default function FacilityPage() {
  const id = new URLSearchParams(window.location.search).get('id');
  const [facility, setFacility] = useState(null);
  const [status, setStatus] = useState('loading');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (!id || !/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
      setStatus('invalid');
      return;
    }

    const controller = new AbortController();
    setStatus('loading');

    async function loadFacility() {
      try {
        const response = await fetch(`${apiUrl}/facilities/${id}`, { signal: controller.signal });
        if (response.status === 404) {
          setStatus('missing');
          return;
        }
        if (!response.ok) throw new Error('Risposta del server non valida');
        const data = await response.json();
        setFacility(data);
        document.title = `${data.name} | SportHub`;
        setStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') setStatus('error');
      }
    }

    loadFacility();
    return () => controller.abort();
  }, [id, retry]);

  return (
    <main className="section detail-page">
      <div className="container">
        <a className="back-link" href="/#impianti"><span aria-hidden="true">←</span> Torna agli impianti</a>

        {status !== 'ready' && (
          <p className="status-message" role="status">
            {status === 'loading' && 'Caricamento del dettaglio in corso…'}
            {status === 'invalid' && 'Il link a questo impianto non è valido. Torna all’elenco e scegli un impianto.'}
            {status === 'missing' && 'Questo impianto non è stato trovato. Torna all’elenco per scegliere un altro spazio.'}
            {status === 'error' && 'Non riusciamo a caricare il dettaglio. Verifica che il backend sia avviato e riprova.'}
          </p>
        )}
        {status === 'error' && <button className="button button-secondary" type="button" onClick={() => setRetry(retry + 1)}>Riprova</button>}
        {status === 'ready' && facility && (
          <article className="detail-card">
            <div className="detail-accent" aria-hidden="true"><span>{facility.name.charAt(0)}</span></div>
            <div className="detail-content">
              <p className="eyebrow">Dettaglio impianto</p>
              <h1>{facility.name}</h1>
              <div className="detail-tags"><span className="tag">{facility.type}</span></div>
              <h2>Informazioni</h2>
              <p>{facility.description}</p>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
