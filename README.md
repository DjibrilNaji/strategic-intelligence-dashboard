# Strategic Intelligence Dashboard

Une application fullstack qui combine les données de 3 APIs publiques pour générer des scores d'intelligence stratégique pour les pays du monde entier.

## Stack Technique

**Backend:** Node.js, TypeScript, Hono, Kysely, PostgreSQL, Zod  
**Frontend:** Next.js, TanStack Query, Tailwind CSS, Shadcn, Recharts  
**Infrastructure:** Docker

## Démarrage

### Prérequis

- Docker & Docker Compose
- Node.js (pour les migrations et seeds)

### Installation

```bash
# Cloner le dépôt
git clone <repo-url>
cd strategic-intelligence-dashboard

# Démarrer tous les services
docker compose up --build

# Lancer le seed
docker compose exec backend node dist/db/seeds/index.js
```

**Frontend** : `http://localhost:3000`  
**Backend :** `http://localhost:3001`

## APIs Utilisées

- **PokéAPI** — Stats et types de Pokémon aléatoires par pays
- **REST Countries** — Population, région et coordonnées des pays
- **Open-Meteo** — Conditions météorologiques actuelles par pays

## Système de Score

### Formule

```
Score Final = Score Pokémon + Score Météo + Score Population
```

### 1. Score Pokémon

Représente la puissance militaire et technologique d'un pays.

```
avgStats  = somme des base stats de 5 Pokémon aléatoires / 5
baseScore = (avgStats / 600) * 100

Bonus type dominant :
  dragon / psychic → +15 (puissance intellectuelle et technologique)
  fire / dark      → +10 (puissance offensive et tactique)
  water / electric → +7  (puissance navale et énergétique)
```

### 2. Score Météo

Représente la productivité économique influencée par le climat.

```
Température :
  15–25°C → +10
  5–15°C  → +5
  < 0°C   → -5

Vent :
  < 20 km/h → +5
  > 60 km/h → -5

Précipitations :
  0 mm    → +5
  > 10 mm → -5

Plage : -15 à +20
```

### 3. Score Population

Représente la force de travail et le marché intérieur.

```
> 100 000 000 → +20
> 10 000 000  → +10
> 1 000 000   → +5
< 1 000 000   → -5
```

> Les scores peuvent dépasser 100 — c'est intentionnel.  
> Le score est un **indice de puissance stratégique**, pas un pourcentage.

## Endpoints API

```
GET /reports/global        → Top 10 pays, moyennes par région, distribution des types
GET /reports/deep-analysis → Analyse complète avec pires pays, impact météo, corrélation population
```

## Axes d'Amélioration

- Remplacer le tableau `pokemon_names` par une table de liaison `country_report_pokemons` pour une meilleure normalisation
- Ajouter le champ `population` directement dans `country_reports` pour éviter les jointures dans la requête de corrélation population
- Ajouter de la pagination sur les endpoints
- Ajouter un cron job pour rafraîchir les données périodiquement
- Ajouter des tests unitaires sur le service de scoring
