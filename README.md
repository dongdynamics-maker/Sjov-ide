# Hvad nu?

En lille dansk app til de øjeblikke, hvor du gerne vil lave noget, men ikke ved hvad. Find en overskuelig mission, start en timer, og få noget rart eller nyttigt ud af din pause.

- Find blandt 40 missioner med filtre for tid, energi, budget, sted og selskab.
- Få inspiration fra dagens kort, eller vælg en mission selv.
- Gem favoritter og markér missioner som gennemført.
- Brug timeren til at holde fokus på én ting ad gangen.

Favoritter, gennemførte missioner og timeren gemmes kun i din browsers lokale lager. En timer på pause overlever genindlæsning, og åbne faner synkroniserer dine fremskridt. Appen henter ingen eksterne aktivitetsdata og bruger ingen tracking. Når den kører fra den lokale server, kan den bruges uden internet eller en konto.

## Kom i gang

Du skal have **Node.js 24 eller nyere**. Der er ingen pakker, der skal installeres.

```sh
node scripts/serve.mjs
```

Åbn [http://127.0.0.1:4173](http://127.0.0.1:4173) i din browser. Stop serveren med `Ctrl+C`. Du kan vælge en anden port med `node scripts/serve.mjs 4174`.

Hvis du har npm, kan du også bruge:

```sh
npm run dev
```

## Kontrol og tests

```sh
node scripts/check.mjs
node --test
```

De samme kommandoer findes som `npm run check` og `npm test`. Kontrollen tjekker, at appfilerne findes, og at JavaScript kan parses. De 10 tests kontrollerer blandt andet 1.944 filterkombinationer, datakvalitet, tilfældige valg og dagens mission.

## Gør projektet til dit eget

Tilføj eller ret missioner i `dist/domain.mjs`; følg strukturen fra de eksisterende missioner. Brugerfladen ligger i `dist/index.html`, udseendet i `dist/styles.css`, og appens interaktioner i `dist/app.mjs`.

`dist/` er selve appen og er med i repositoryet. Den lokale server serverer kun filer fra den mappe og lytter kun på din egen computer.
