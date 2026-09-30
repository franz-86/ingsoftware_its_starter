import { createRoot } from 'react-dom/client';
import HomePage from './HomePage.jsx';
import FacilityPage from './FacilityPage.jsx';

function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <a className="brand" href="/" aria-label="SportHub, pagina iniziale">
          <span className="brand-symbol" aria-hidden="true">S</span>
          <span>SportHub</span>
        </a>
        <nav aria-label="Navigazione principale">
          <ul className="nav-list">
            <li><a className="nav-link current" href="/#impianti" aria-current="page">Impianti</a></li>
            <li><a className="nav-link" href="/#centro">Il centro</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return <footer className="site-footer"><div className="container">SportHub · Il centro sportivo a portata di mano</div></footer>;
}

createRoot(document.getElementById('root')).render(
  <>
    <Header />
    {window.location.pathname === '/facility.html' ? <FacilityPage /> : <HomePage />}
    <Footer />
  </>
);
