import { useState } from 'react'
import { studio, company, services, reviews, areas } from './data.js'

function DemoBanner() {
  const hub = import.meta.env.DEV ? studio.hubDev : studio.hubProd
  return (
    <div className="demo-banner">
      Demo website — not a real company.{' '}
      <a href={hub}>More Calgary demos by {studio.name}</a>
    </div>
  )
}

export default function App() {
  const [form, setForm] = useState({ name: '', phone: '', issue: '' })
  const [sent, setSent] = useState(false)
  const [open, setOpen] = useState(false)
  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  return (
    <>
      <DemoBanner />
      <div className="alert-bar">
        <span>24/7 emergency dispatch · SW Calgary</span>
        <a href={company.phoneHref}>{company.phone}</a>
      </div>
      <header className="nav">
        <a href="#top" className="logo">{company.name}<small>{company.suffix}</small></a>
        <button className="menu" type="button" aria-label="Menu" onClick={() => setOpen((v) => !v)}>☰</button>
        <nav className={open ? 'is-open' : ''}>
          <a href="#services" onClick={() => setOpen(false)}>Services</a>
          <a href="#reviews" onClick={() => setOpen(false)}>Reviews</a>
          <a href="#areas" onClick={() => setOpen(false)}>Areas</a>
          <a href="#book" className="nav-cta" onClick={() => setOpen(false)}>Book a tech</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero__copy">
          <p className="eyebrow">Licensed · Insured · SW Calgary</p>
          <h1>Heat when it’s −30. Cool when the Chinook hits 20°.</h1>
          <p>Furnace, AC, and boiler techs who actually show up. Same-day emergency calls across southwest Calgary.</p>
          <div className="hero__actions">
            <a className="btn btn--heat" href={company.phoneHref}>Call {company.phone}</a>
            <a className="btn btn--ghost" href="#book">Request service</a>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80"
          alt="HVAC technician at a rooftop unit"
        />
      </section>

      <section className="stats">
        <div><strong>24/7</strong><span>Emergency line</span></div>
        <div><strong>90 min</strong><span>Typical dispatch window</span></div>
        <div><strong>2011</strong><span>Serving SW Calgary</span></div>
      </section>

      <section className="section" id="services">
        <h2>What we fix</h2>
        <ul className="cards">
          {services.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section section--dark" id="reviews">
        <h2>From houses that actually froze</h2>
        <ul className="quotes">
          {reviews.map((r) => (
            <li key={r.name}>
              <p>“{r.text}”</p>
              <span>{r.name} · {r.area}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" id="areas">
        <h2>Southwest first</h2>
        <ul className="chips">{areas.map((a) => <li key={a}>{a}</li>)}</ul>
      </section>

      <section className="section book" id="book">
        <div>
          <h2>Need a tech?</h2>
          <p>This form is a demo. It does not dispatch a real technician. Call the placeholder number if you are testing the layout.</p>
          <p className="meta">{company.address}<br />{company.hours}</p>
        </div>
        {sent ? (
          <div className="thanks">
            <h3>Demo only — nothing was sent.</h3>
            <p>On a live HVAC site this would hit the dispatch inbox.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (form.name && form.phone) setSent(true) }}>
            <label>Name<input name="name" value={form.name} onChange={update} /></label>
            <label>Phone<input name="phone" value={form.phone} onChange={update} placeholder="(403)" /></label>
            <label>What’s going on?<textarea name="issue" rows="3" value={form.issue} onChange={update} /></label>
            <button className="btn btn--heat" type="submit">Request a callback</button>
          </form>
        )}
      </section>

      <footer>
        <p>© {new Date().getFullYear()} {company.name} {company.suffix}. Fictional demo.</p>
        <a href={import.meta.env.DEV ? studio.hubDev : studio.hubProd}>Built by {studio.name}</a>
      </footer>
    </>
  )
}
