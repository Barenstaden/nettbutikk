## Nettbutikk

En nettbutikk hvor alt er gratis og varene aldri dukker opp i posten.

## Installasjon
### Frontend
`$ cd frontend`
`$ npm i`
`$ npm run serve`

### Strapi
`$ cd strapi`
`$ npm i`
`$ npm run dev`

### Kan også startes med PM2 med ecosystem.config.js på root
`$ pm2 start ecosystem.config.js`
     
### Legge til produkter
1. Gå til localhost:1337/admin og opprett en bruker
2. Gå til Collection types -> Products -> Add new products
3. Legg til product_id, name, price og minimum ett bilde for hvert produkt
4. Trykk "Save" og "Publish"
5. Gå til Settings -> User and permissions plugin -> Roles -> Public -> huk av for "find" under "product"
6. Trykk save
7. Gå til localhost:8080 for å se produkter
                
