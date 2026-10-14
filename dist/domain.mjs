/** Small, useful Danish missions. Costs are an upper estimate per activity. */
export const categories = [
  { id: 'all', label: 'Det hele', icon: '✦' },
  { id: 'ro', label: 'Find ro', icon: '☁' },
  { id: 'kreativ', label: 'Skab noget', icon: '✎' },
  { id: 'bevaegelse', label: 'Kom i gang', icon: '↗' },
  { id: 'sammen', label: 'Vær sammen', icon: '♡' },
  { id: 'praktisk', label: 'Gør livet lettere', icon: '✓' },
];

export const activities = [
  {
    id: 'vinduespause', title: 'Tag en vinduespause', category: 'ro',
    description: 'En lille pause, hvor du ikke behøver nå noget som helst.',
    minutes: 10, energy: 1, cost: 0, location: 'inside', company: 'alone',
    steps: ['Find en behagelig plads ved et vindue.', 'Læg telefonen væk, og læg mærke til fem ting udenfor.', 'Bliv siddende lidt endnu, uden at lave en plan.'],
    payoff: 'Et lille pusterum i en travl dag.',
  },
  {
    id: 'brev-til-dig', title: 'Skriv til dit fremtidige jeg', category: 'ro',
    description: 'Send lidt venlighed videre til dig selv med papir, du allerede har.',
    minutes: 15, energy: 1, cost: 0, location: 'inside', company: 'alone',
    steps: ['Find papir eller åbn en tom note.', 'Skriv, hvad der fylder, og én ting, du glæder dig til.', 'Gem brevet med en dato for, hvornår du vil læse det igen.'],
    payoff: 'En personlig tidskapsel, du kan vende tilbage til.',
  },
  {
    id: 'lyttepause', title: 'Genopdag tre yndlingssange', category: 'ro',
    description: 'Giv tre yndlingsnumre din fulde opmærksomhed.',
    minutes: 15, energy: 1, cost: 0, location: 'inside', company: 'alone',
    steps: ['Vælg tre sange, du allerede kan afspille gratis.', 'Sæt dig godt til rette og læg skærmen væk.', 'Lyt efter en detalje, du ikke har lagt mærke til før.'],
    payoff: 'Du får mere ud af musik, du allerede elsker.',
  },
  {
    id: 'sansetur', title: 'Gå en tur med sanserne', category: 'ro',
    description: 'En rolig tur uden ruteoptimering eller skridtmål.',
    minutes: 20, energy: 1, cost: 0, location: 'outside', company: 'either',
    steps: ['Vælg en kort rute tæt på, hvor du er.', 'Læg mærke til tre lyde, tre farver og tre dufte.', 'Slut turen på et sted, hvor du kan stå stille et øjeblik.'],
    payoff: 'Du opdager lidt mere af dit eget nærområde.',
  },
  {
    id: 'laesehule', title: 'Lav en lille læsehule', category: 'ro',
    description: 'Find en bog, et tæppe og et kapitel, du har lyst til at blive i.',
    minutes: 30, energy: 1, cost: 0, location: 'inside', company: 'alone',
    steps: ['Find en bog, du har hjemme eller har lånt.', 'Lav en behagelig plads og sæt telefonen på lydløs.', 'Læs, til tiden er gået, og læg et bogmærke ved dit yndlingssted.'],
    payoff: 'En god historie og en pause fra skærmen.',
  },
  {
    id: 'baenkepause', title: 'Find din nye yndlingsbænk', category: 'ro',
    description: 'Undersøg et nært grønt område i et tempo, der passer dig.',
    minutes: 45, energy: 2, cost: 0, location: 'outside', company: 'either',
    steps: ['Gå mod en park eller et andet roligt sted i nærheden.', 'Prøv to steder at sidde, og vælg det rareste.', 'Nyd udsigten, og gem stedet i hukommelsen til en anden dag.'],
    payoff: 'Du har fundet et sted at vende tilbage til.',
  },
  {
    id: 'offline-time', title: 'Tag en time offline', category: 'ro',
    description: 'Giv din opmærksomhed plads med en time uden notifikationer.',
    minutes: 60, energy: 1, cost: 0, location: 'inside', company: 'either',
    steps: ['Læg telefonen væk og sluk for unødvendige skærme.', 'Vælg noget roligt: læs, tegn, snak eller kig ud.', 'Skriv én ting ned, du gerne vil gentage.'],
    payoff: 'Du opdager, hvad du selv får lyst til uden små afbrydelser.',
  },
  {
    id: 'te-ritual', title: 'Gør en kop til et ritual', category: 'ro',
    description: 'Brug den kaffe, te eller anden varme drik, du allerede har.',
    minutes: 10, energy: 1, cost: 0, location: 'inside', company: 'either',
    steps: ['Lav en kop af det, du har i køkkenet.', 'Sæt dig et andet sted end din sædvanlige arbejdsplads.', 'Drik langsomt, og lad resten vente et øjeblik.'],
    payoff: 'En hverdagsvane bliver til en rigtig pause.',
  },
  {
    id: 'grim-tegning', title: 'Tegn noget rigtig grimt', category: 'kreativ',
    description: 'Perfektion har fri. Tegn en genstand uden at kigge på papiret.',
    minutes: 10, energy: 1, cost: 0, location: 'inside', company: 'either',
    steps: ['Find papir, en blyant og en genstand i rummet.', 'Tegn genstanden i to minutter uden at kigge ned.', 'Lav to mere, og giv den sjoveste en titel.'],
    payoff: 'Tre skæve tegninger og en lettere vej ind i at skabe.',
  },
  {
    id: 'seks-ord', title: 'Skriv en historie på seks ord', category: 'kreativ',
    description: 'En hel historie kan gemme sig i ganske få ord.',
    minutes: 15, energy: 1, cost: 0, location: 'inside', company: 'alone',
    steps: ['Vælg et tema: en rejse, en hemmelighed eller en helt almindelig tirsdag.', 'Skriv fem historier med præcis seks ord i hver.', 'Vælg din favorit, og giv den en titel.'],
    payoff: 'En lille tekst, der er helt din egen.',
  },
  {
    id: 'farvejagt', title: 'Gå på jagt efter én farve', category: 'kreativ',
    description: 'Se dit kvarter som en fotograf på en hemmelig farvemission.',
    minutes: 20, energy: 2, cost: 0, location: 'outside', company: 'either',
    steps: ['Vælg en farve, før du går ud.', 'Find og fotografér fem ting i den farve uden at fotografere fremmede.', 'Vælg tre billeder, der fungerer godt sammen.'],
    payoff: 'En lille fotoserie fra steder, du ellers går forbi.',
  },
  {
    id: 'papir-zine', title: 'Lav et lille foldet magasin', category: 'kreativ',
    description: 'Et ark papir bliver til en miniudgivelse om noget, du holder af.',
    minutes: 30, energy: 2, cost: 0, location: 'inside', company: 'alone',
    steps: ['Fold et ark papir i halve, så du får fire små sider.', 'Fyld siderne med tegninger, tips eller en kort historie.', 'Lav en forside med et navn og dit eget udgivernavn.'],
    payoff: 'En fysisk lille udgivelse, du kan beholde eller give væk.',
  },
  {
    id: 'omslag', title: 'Lav et omslag til din dag', category: 'kreativ',
    description: 'Hvis i dag var en bog eller en plade, hvordan ville den se ud?',
    minutes: 15, energy: 1, cost: 0, location: 'inside', company: 'alone',
    steps: ['Skriv tre ord, der beskriver dagen indtil nu.', 'Tegn et omslag på papir eller i et tegneprogram, du allerede har.', 'Tilføj en titel og en lille tekst på bagsiden.'],
    payoff: 'En ny og lidt sjovere måde at se din dag på.',
  },
  {
    id: 'genbrugskunst', title: 'Byg et genbrugsvæsen', category: 'kreativ',
    description: 'Giv ren emballage et ekstra liv som en mærkelig lille figur.',
    minutes: 45, energy: 2, cost: 0, location: 'inside', company: 'either',
    steps: ['Saml ren papemballage og materialer, du allerede har.', 'Byg en figur med foldninger og eventuelt tape.', 'Giv den navn, temperament og en plads på hylden.'],
    payoff: 'Et lille væsen, der kun findes hos dig.',
  },
  {
    id: 'lille-film', title: 'Lav en film på 30 sekunder', category: 'kreativ',
    description: 'Fortæl en minihistorie med telefonen og fem korte optagelser.',
    minutes: 60, energy: 3, cost: 0, location: 'either', company: 'either',
    steps: ['Find en idé med en begyndelse, en overraskelse og en slutning.', 'Optag fem korte klip uden at filme nogen uden deres accept.', 'Sæt klippene sammen i et værktøj, du allerede har.'],
    payoff: 'En færdig lille film og erfaring med at fortælle visuelt.',
  },
  {
    id: 'postkort', title: 'Lav et postkort fra din sofa', category: 'kreativ',
    description: 'Skab et hjemmelavet kort, som du kan give til en, du holder af.',
    minutes: 20, energy: 1, cost: 0, location: 'inside', company: 'alone',
    steps: ['Find et stykke papir eller karton, du allerede har.', 'Tegn dit hjem som en ferieattraktion på forsiden.', 'Skriv en varm hilsen på bagsiden, og gem kortet til næste besøg.'],
    payoff: 'En personlig hilsen, der også kan få nogen til at smile.',
  },
  {
    id: 'musikbevaegelse', title: 'Bevæg dig til to sange', category: 'bevaegelse',
    description: 'To sange er nok til en lille bevægelsespause i dit eget tempo.',
    minutes: 10, energy: 1, cost: 0, location: 'inside', company: 'either',
    steps: ['Vælg to sange, du bliver glad af.', 'Bevæg fødder, arme eller skuldre, som det føles rart.', 'Slut med at hente et glas vand.'],
    payoff: 'Lidt mere bevægelse og en god sang på hjernen.',
  },
  {
    id: 'kvartersrute', title: 'Opfind en kvartersrute', category: 'bevaegelse',
    description: 'En kort gåtur med ét sving, du normalt ikke tager.',
    minutes: 15, energy: 2, cost: 0, location: 'outside', company: 'either',
    steps: ['Vælg et kendt sted som start og slutpunkt.', 'Gå en lille runde og prøv én ny sidevej.', 'Notér en detalje eller et sted, du vil huske.'],
    payoff: 'En ny lille rute til næste pause.',
  },
  {
    id: 'blid-straek', title: 'Stræk dig som en søvnig kat', category: 'bevaegelse',
    description: 'En blid pause med bevægelser, der føles behagelige for dig.',
    minutes: 10, energy: 1, cost: 0, location: 'inside', company: 'alone',
    steps: ['Find lidt plads på gulvet eller ved en stol.', 'Bevæg skuldre, arme og ankler roligt uden at presse.', 'Mærk efter, og gentag kun de bevægelser, der føles gode.'],
    payoff: 'En enkel bevægelsespause, du kan gentage i hverdagen.',
  },
  {
    id: 'trappe-detektiv', title: 'Find en ny vej op', category: 'bevaegelse',
    description: 'En kort tur med en bakke eller en trappe og tid til at se sig omkring.',
    minutes: 20, energy: 3, cost: 0, location: 'outside', company: 'either',
    steps: ['Find en offentlig bakke eller trappe tæt på.', 'Gå op i et tempo, hvor du stadig kan tale, og hold pauser efter behov.', 'Nyd udsigten, og gå roligt tilbage.'],
    payoff: 'En lille udfordring og måske en ny udsigt.',
  },
  {
    id: 'rolig-cykeltur', title: 'Tag cyklen til et nyt hjørne', category: 'bevaegelse',
    description: 'Har du en cykel, kan en kort tur gøre en velkendt dag lidt ny.',
    minutes: 30, energy: 2, cost: 0, location: 'outside', company: 'either',
    steps: ['Brug en cykel, du har, og vælg en kort, tryg rute.', 'Cykl til et sted i nærheden, du sjældent besøger.', 'Hold en kort pause, og tag en anden kendt vej hjem.'],
    payoff: 'Et lille nærområdeeventyr med frisk luft.',
  },
  {
    id: 'park-leg', title: 'Genopdag en gammel udendørsleg', category: 'bevaegelse',
    description: 'Hinke, fange eller jonglere med en bold, I allerede har.',
    minutes: 30, energy: 3, cost: 0, location: 'outside', company: 'together',
    steps: ['Find et sikkert, offentligt område med god plads.', 'Vælg en leg, som alle kan være med i, og aftal enkle regler.', 'Spil flere små runder med pauser imellem.'],
    payoff: 'Bevægelse, grin og en leg, I kan bruge igen.',
  },
  {
    id: 'gaa-og-snak', title: 'Tag en tur med et godt spørgsmål', category: 'bevaegelse',
    description: 'Gør en gåtur til en samtale, der får lidt mere plads.',
    minutes: 45, energy: 2, cost: 0, location: 'outside', company: 'together',
    steps: ['Aftal en rolig rute med en person, du er sammen med.', 'Spørg: Hvad har overrasket dig positivt på det sidste?', 'Lad samtalen følge turen, og giv hinanden tid til at svare.'],
    payoff: 'En god samtale og lidt mere bevægelse på samme tid.',
  },
  {
    id: 'timevandring', title: 'Gå på en times ekspedition', category: 'bevaegelse',
    description: 'Et lille eventyr kræver bare en rute tæt på, hvor du bor.',
    minutes: 60, energy: 3, cost: 0, location: 'outside', company: 'either',
    steps: ['Vælg en rute med et interessant vendepunkt cirka 25 minutter væk.', 'Gå i et behageligt tempo, og hold en pause ved vendepunktet.', 'Tag hjem igen, og gem et billede eller en note fra turen.'],
    payoff: 'En lille ekspedition, du faktisk har tid til.',
  },
  {
    id: 'godt-spoergsmaal', title: 'Byt hverdagens bedste øjeblik', category: 'sammen',
    description: 'En kort samtale kan få en ganske almindelig dag til at føles større.',
    minutes: 10, energy: 1, cost: 0, location: 'either', company: 'together',
    steps: ['Find et roligt øjeblik med en person, du er sammen med.', 'Fortæl hver om en god ting fra dagen, også hvis den var lille.', 'Stil ét nysgerrigt opfølgende spørgsmål til hinanden.'],
    payoff: 'I får øje på noget godt og lærer lidt mere om hinanden.',
  },
  {
    id: 'hjemmequiz', title: 'Lav en quiz om jer selv', category: 'sammen',
    description: 'Ingen paratviden nødvendig, bare mærkelige små detaljer fra jeres liv.',
    minutes: 15, energy: 1, cost: 0, location: 'inside', company: 'together',
    steps: ['Skriv hver tre spørgsmål om jer selv på papir.', 'Lad de andre gætte, og fortæl historien bag svaret.', 'Slut med at vælge dagens mest overraskende oplysning.'],
    payoff: 'Seks nye samtalestartere og noget at grine af.',
  },
  {
    id: 'faelles-tegning', title: 'Tegn en figur på skift', category: 'sammen',
    description: 'Ét papir og et par blyanter er nok til at skabe noget helt uventet.',
    minutes: 20, energy: 1, cost: 0, location: 'inside', company: 'together',
    steps: ['Find papir og noget at tegne med.', 'Tegn et hoved, fold det væk, og lad den næste tegne kroppen.', 'Fold ud, giv figuren navn, og lav en ny runde.'],
    payoff: 'En lille samling fælles figurer med hver sin historie.',
  },
  {
    id: 'mini-smagning', title: 'Lav en smagning af det, I har', category: 'sammen',
    description: 'Sammenlign tre ting fra køkkenet uden at købe noget nyt.',
    minutes: 20, energy: 2, cost: 0, location: 'inside', company: 'together',
    steps: ['Vælg tre madvarer eller drikke, I allerede har, og som alle tåler.', 'Smag på dem i små portioner, og find tre ord til hver.', 'Kår hver jeres favorit og forklar hvorfor.'],
    payoff: 'En lille smagsoplevelse og bedre kendskab til jeres favoritter.',
  },
  {
    id: 'kortturnering', title: 'Hold en lille kortturnering', category: 'sammen',
    description: 'Et spil kort eller et spil, I allerede ejer, får en ny anledning.',
    minutes: 30, energy: 1, cost: 0, location: 'inside', company: 'together',
    steps: ['Vælg et kort spil, alle kender eller let kan lære.', 'Aftal tre runder og en helt ufarlig præmie som valg af næste sang.', 'Spil, og lad vinderen udpege dagens bedste træk.'],
    payoff: 'En nem lille tradition til næste aften sammen.',
  },
  {
    id: 'baenke-kaffe', title: 'Tag en kaffe med til en bænk', category: 'sammen',
    description: 'En enkel kaffeaftale i det fri til højst 50 kroner i alt.',
    minutes: 30, energy: 2, cost: 50, location: 'outside', company: 'together',
    steps: ['Vælg en bænk tæt på og aftal at gå derhen sammen.', 'Køb to små drikke til højst 50 kroner i alt, eller tag dem med hjemmefra.', 'Del en historie, den anden ikke har hørt før.'],
    payoff: 'En hyggelig lille aftale uden meget planlægning.',
  },
  {
    id: 'pandekagevaerksted', title: 'Åbn et pandekageværksted', category: 'sammen',
    description: 'Lav en lille portion pandekager sammen med et budget på 50 kroner.',
    minutes: 45, energy: 2, cost: 50, location: 'inside', company: 'together',
    steps: ['Tjek køkkenet, vælg en opskrift, og køb kun det manglende inden for 50 kroner.', 'Fordel blanding, stegning og borddækning imellem jer.', 'Spis sammen, og giv den første pandekage et kælenavn.'],
    payoff: 'Noget lækkert på bordet og lidt fælles køkkentid.',
  },
  {
    id: 'faelles-picnic', title: 'Lav en picnic på rester', category: 'sammen',
    description: 'Giv mad, I allerede har, et lille udendørs eventyr.',
    minutes: 60, energy: 2, cost: 0, location: 'outside', company: 'together',
    steps: ['Pak mad og drikke, I allerede har, i beholdere med låg.', 'Find et nært offentligt sted, hvor I må sidde.', 'Spis, find på en lille leg, og tag alt affald med hjem.'],
    payoff: 'En fælles oplevelse og færre glemte rester i køleskabet.',
  },
  {
    id: 'en-skuffe', title: 'Red én rodet skuffe', category: 'praktisk',
    description: 'En lille oprydning, der kan mærkes allerede næste gang du åbner skuffen.',
    minutes: 15, energy: 1, cost: 0, location: 'inside', company: 'alone',
    steps: ['Vælg én lille skuffe, og læg indholdet på et bord.', 'Sortér i behold, flyt og kassér, uden at åbne nye projekter.', 'Læg det, du bruger mest, lettest tilgængeligt.'],
    payoff: 'Én færdig skuffe og lidt mindre friktion i hverdagen.',
  },
  {
    id: 'skaerm-oprydning', title: 'Ryd din digitale entre', category: 'praktisk',
    description: 'Gør telefonens første skærm lidt mere hjælpsom.',
    minutes: 10, energy: 1, cost: 0, location: 'inside', company: 'alone',
    steps: ['Kig på telefonens startskærm og vælg de apps, du faktisk bruger.', 'Flyt fem distraktioner væk fra den første skærm.', 'Giv din vigtigste hverdagsapp en let tilgængelig plads.'],
    payoff: 'Du finder hurtigere det, du tog telefonen frem for.',
  },
  {
    id: 'madplan-light', title: 'Planlæg tre nemme aftensmåltider', category: 'praktisk',
    description: 'En lille madplan starter med det, du allerede har.',
    minutes: 20, energy: 1, cost: 0, location: 'inside', company: 'either',
    steps: ['Se i køleskab og skabe, og skriv fem brugbare ingredienser ned.', 'Find på tre enkle måltider, der bruger noget af det samme.', 'Skriv kun de manglende varer på en indkøbsliste.'],
    payoff: 'Tre færre beslutninger og en mere målrettet indkøbsliste.',
  },
  {
    id: 'tjek-uge', title: 'Giv næste uge en blød start', category: 'praktisk',
    description: 'Saml de små aftaler og huskesedler, der ellers ligger spredt.',
    minutes: 15, energy: 1, cost: 0, location: 'inside', company: 'alone',
    steps: ['Åbn kalenderen og find de næste syv dage.', 'Saml aftaler og vigtige huskesedler ét sted.', 'Vælg én ting, du kan gøre klar allerede i dag.'],
    payoff: 'Et mere overskueligt blik på den kommende uge.',
  },
  {
    id: 'klar-til-morgen', title: 'Pak en god morgen', category: 'praktisk',
    description: 'En lille gave til den version af dig, der vågner i morgen.',
    minutes: 10, energy: 1, cost: 0, location: 'inside', company: 'alone',
    steps: ['Find tøj, taske eller de ting, du skal bruge i morgen.', 'Stil det samlet et sted, hvor du ser det.', 'Skriv en kort note med morgendagens vigtigste ting.'],
    payoff: 'En lidt lettere morgen med færre små beslutninger.',
  },
  {
    id: 'urter', title: 'Start en lille køkkenhave', category: 'praktisk',
    description: 'En potte med krydderurter kan gøre både vindueskarm og aftensmad rarere.',
    minutes: 45, energy: 2, cost: 50, location: 'inside', company: 'either',
    steps: ['Find en genbrugt beholder med mulighed for dræn og en underskål.', 'Køb en krydderurt og eventuelt lidt jord for højst 50 kroner samlet.', 'Plant, vand, og sæt en lille seddel med plantens navn ved siden af.'],
    payoff: 'Friske krydderurter og noget grønt at følge med i.',
  },
  {
    id: 'reparer-toej', title: 'Giv et stykke tøj en chance til', category: 'praktisk',
    description: 'En løs knap eller en lille syning behøver ikke betyde farvel.',
    minutes: 30, energy: 2, cost: 25, location: 'inside', company: 'alone',
    steps: ['Find ét stykke tøj med en lille, overskuelig skade.', 'Brug nål og tråd, eller skaf et lille sæt for højst 25 kroner.', 'Sy roligt, prøv tøjet, og læg resten af udstyret samlet.'],
    payoff: 'Et stykke tøj, der kan bruges igen.',
  },
  {
    id: 'fryser-mad', title: 'Lav en ekstra portion til en travl dag', category: 'praktisk',
    description: 'En time i køkkenet kan gøre en senere aften meget nemmere.',
    minutes: 60, energy: 3, cost: 100, location: 'inside', company: 'either',
    steps: ['Vælg en enkel suppe eller gryderet, og hold indkøb under 100 kroner.', 'Lav en ekstra portion og fordel den i egnede beholdere.', 'Køl maden ned hurtigt, og stil den på køl eller frys med navn og dato.'],
    payoff: 'Et færdigt måltid til en dag med mindre overskud.',
  },
];

/** All limits are inclusive. Flexible missions match either location/company. */
export function filterActivities(filters = {}, items = activities) {
  const {
    minutes = 120, energy = 3, budget = 100,
    location = 'any', company = 'any', category = 'all',
  } = filters;
  return items.filter((activity) => (
    activity.minutes <= minutes
    && activity.energy <= energy
    && activity.cost <= budget
    && (location === 'any' || activity.location === 'either' || activity.location === location)
    && (company === 'any' || activity.company === 'either' || activity.company === company)
    && (category === 'all' || activity.category === category)
  ));
}

/** Avoid an immediate repeat when there is an alternative; never mutate input. */
export function chooseActivity(items, previousId = null, random = Math.random) {
  if (!items.length) return undefined;
  const alternatives = items.length > 1 ? items.filter((item) => item.id !== previousId) : items;
  const candidates = alternatives.length ? alternatives : items;
  const sample = Number(random());
  const index = Math.min(candidates.length - 1, Math.max(0,
    Number.isFinite(sample) ? Math.floor(sample * candidates.length) : 0));
  return candidates[index];
}

/** A date string, rather than the viewer's timezone, determines the daily pick. */
export function dailyActivity(dateKey) {
  if (typeof dateKey !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
    throw new TypeError('Datoen skal være en tekst i formatet YYYY-MM-DD.');
  }
  let hash = 2166136261;
  for (const character of dateKey) {
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  }
  return activities[hash % activities.length];
}

export function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  const label = hours === 1 ? 'time' : 'timer';
  return `${hours} ${label}${remaining ? ` og ${remaining} min` : ''}`;
}
