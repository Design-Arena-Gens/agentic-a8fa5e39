# Agent IA → Scénarios Make

Application Next.js qui génère des blueprints de scénarios Make à partir d'un prompt en français. Aucun appel à une API externe n'est requis.

- UI simple pour saisir un prompt
- Génération d'un blueprint JSON (avec une étape IA OpenAI placeholder)
- Téléchargement/Copie du JSON

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build && npm start
```

## Déploiement Vercel

La commande:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-a8fa5e39
```

Puis vérifier:

```bash
curl https://agentic-a8fa5e39.vercel.app
```
