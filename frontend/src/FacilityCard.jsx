export default function FacilityCard({ facility }) {
  return (
    <li>
      <article className="facility-card">
        <a className="facility-card-link" href={`/facility.html?id=${facility.id}`}>
          <span className="facility-number">{String(facility.id).padStart(2, '0')}</span>
          <span className="tag">{facility.type}</span>
          <h3>{facility.name}</h3>
          <p>{facility.description}</p>
          <span className="card-action">Scopri l’impianto →</span>
        </a>
      </article>
    </li>
  );
}
