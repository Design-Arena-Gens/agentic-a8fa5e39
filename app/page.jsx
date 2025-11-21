"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(result.blueprint, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (result?.title || "scenario") + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function copyJSON() {
    navigator.clipboard.writeText(JSON.stringify(result.blueprint, null, 2));
  }

  return (
    <main className="main">
      <header className="header">
        <div className="branding">
          <div className="logo">??</div>
          <div>
            <h1>Agent IA ? Sc?narios Make</h1>
            <p className="sub">D?crivez votre besoin en langage naturel. Obtenez un sc?nario Make int?grant une ?tape IA.</p>
          </div>
        </div>
      </header>

      <form className="card" onSubmit={handleGenerate}>
        <label className="label">Votre prompt</label>
        <textarea
          className="textarea"
          placeholder="Ex: Quand un webhook re?oit un ticket, r?sumer avec l'IA puis envoyer sur Slack et email"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={5}
          required
        />
        <button className="btn" disabled={loading}>
          {loading ? "G?n?ration..." : "G?n?rer le sc?nario"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <section className="results">
          <div className="grid">
            <div className="card">
              <h2>Aper?u des ?tapes</h2>
              <ol className="steps">
                {result.steps.map((s, idx) => (
                  <li key={idx} className="step">
                    <span className="badge">{idx + 1}</span>
                    <div>
                      <div className="step-title">{s.title}</div>
                      {s.detail && <div className="muted">{s.detail}</div>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="card">
              <h2>JSON Make (blueprint)</h2>
              <pre className="code"><code>{JSON.stringify(result.blueprint, null, 2)}</code></pre>
              <div className="actions">
                <button className="btn-secondary" onClick={copyJSON}>Copier</button>
                <button className="btn" onClick={downloadJSON}>T?l?charger .json</button>
              </div>
              <p className="muted small">Importez ce blueprint dans Make (Fichier ? Importer blueprint). Les modules IA sont pr?configur?s en tant que placeholders.</p>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <span className="muted">? {new Date().getFullYear()} Agent IA Make</span>
      </footer>
    </main>
  );
}
