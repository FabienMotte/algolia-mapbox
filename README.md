# Vue (Vite) + Algolia + Mapbox

Small experiment with Algolia and Mapbox to search for restaurants within a dataset.

## Get started

- Mapbox account with public key
- Algolia account with created index to import data from this project
  - Predefined attributes for search and facets
    - Facets: food_type, name
  
- Copy .env.dev to .env file and add all tokens, ids
  
```bash
    cp .env.dev .dev
```

- Process dataset: sanitize and upload the dataset to Algolia (created index), run:

```bash
npm run task:dataset
```

## Technologies

- [Algolia](https://www.algolia.com/)
- [Mapbox](https://www.mapbox.com/)
- [Vite](https://vitejs.dev/)
- [Vue.js 3](https://v3.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)

## Usage

### Dependencies

Install dependencies

```bash
npm install
```

### Development

Just run and visit http://localhost:3000

```bash
npm run dev
```

### Build

To build the project, run

```bash
npm run build
```


