import { activities, categories, filterActivities, chooseActivity, dailyActivity, formatMinutes } from './domain.mjs';

const $ = (selector) => document.querySelector(selector);
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const byId = new Map(activities.map((activity) => [activity.id, activity]));
const categoryById = new Map(categories.map((category) => [category.id, category]));
const STORAGE_KEY = 'hvad-nu:v1';
const dayKey = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
let category = 'all';
let current;
let favorites = new Set();
let history = [];
let timer = null;
let storageAvailable = true;
let toastTimeout;
let view = 'explore';
let renderedDay = dayKey();

function load() {
  favorites = new Set();
  history = [];
  timer = null;
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!saved || typeof saved !== 'object') return;
    favorites = new Set(Array.isArray(saved.favorites) ? saved.favorites.filter((id) => byId.has(id)) : []);
    history = Array.isArray(saved.history) ? saved.history.filter((entry) => entry && byId.has(entry.id) && /^\d{4}-\d{2}-\d{2}$/.test(entry.date)).slice(-10000) : [];
    const t = saved.timer;
    if (t && byId.has(t.id) && typeof t.running === 'boolean' && Number.isFinite(t.remaining) && t.remaining >= 0 && t.remaining <= 7200000 && (!t.running || Number.isFinite(t.deadline))) timer = t;
  } catch { storageAvailable = false; }
}

function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ favorites: [...favorites], history, timer })); }
  catch { storageAvailable = false; }
}

function toast(message) {
  clearTimeout(toastTimeout);
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  toastTimeout = setTimeout(() => $('#toast').classList.remove('visible'), 3500);
}

function filters() {
  const data = new FormData($('#filters'));
  return { minutes: Number(data.get('minutes')), energy: Number(data.get('energy')), budget: Number(data.get('budget')), location: data.get('location'), company: data.get('company'), category };
}

function hasDoneToday(id) { return history.some((entry) => entry.id === id && entry.date === dayKey()); }
function saveButton(activity, extraClass = '') {
  const saved = favorites.has(activity.id);
  return `<button class="save-button ${extraClass}" data-save="${escape(activity.id)}" aria-pressed="${saved}" aria-label="${saved ? 'Fjern' : 'Gem'} ${escape(activity.title)} ${saved ? 'fra' : 'som'} favorit">${icon('heart')}${extraClass ? (saved ? 'Gemt' : 'Gem favorit') : ''}</button>`;
}

function facts(activity) {
  return `<span>${icon('clock')}${escape(formatMinutes(activity.minutes))}</span><span>${activity.cost === 0 ? 'Gratis' : `Op til ${activity.cost} kr.`}</span><span>${({ inside: 'Indenfor', outside: 'Udenfor', either: 'Inde eller ude' })[activity.location]}</span><span>${({ alone: 'Bare dig', together: 'Med andre', either: 'Selv eller sammen' })[activity.company]}</span>`;
}

function renderMission() {
  const card = $('#mission');
  if (!current) {
    card.innerHTML = `<div class="empty-card"><span class="empty-icon" aria-hidden="true">☁</span><h2>Der er lidt for stille her.</h2><p>Ingen missioner passer til alle dine valg. Prøv lidt mere tid, en anden kategori eller et andet sted.</p><button class="button primary" data-reset>Vis flere muligheder ${icon('arrow')}</button></div>`;
    return;
  }
  const c = categoryById.get(current.category);
  const done = hasDoneToday(current.id);
  card.innerHTML = `<div class="mission-top"><span class="category-tag">${icon(current.category)}${escape(c.label)}</span>${saveButton(current)}</div>
    <h2>${escape(current.title)}</h2><p class="mission-description">${escape(current.description)}</p><div class="mission-facts">${facts(current)}</div>
    <details><summary class="steps-toggle">Sådan kommer du i gang</summary><ol class="steps">${current.steps.map((step) => `<li>${escape(step)}</li>`).join('')}</ol><p class="payoff"><strong>Det får du ud af det:</strong> ${escape(current.payoff)}</p></details>
    <div class="mission-actions"><button class="button primary" data-start="${escape(current.id)}">Start min mission ${icon('arrow')}</button><button class="button secondary" data-another>${icon('shuffle')} En anden idé</button><button class="done-button" data-done="${escape(current.id)}" ${done ? 'disabled' : ''}>${icon('check')}${done ? 'Udført i dag' : 'Jeg har gjort det!'}</button></div>`;
  card.classList.remove('fade-in');
  requestAnimationFrame(() => card.classList.add('fade-in'));
}

function miniCard(activity, favoriteView = false) {
  return `<article class="mini-card">${icon(activity.category)}<h3><button class="mini-open" data-open="${escape(activity.id)}">${escape(activity.title)}</button></h3>${favoriteView ? `<p class="mini-description">${escape(activity.description)}</p>` : ''}<div class="mini-bottom"><span>${escape(formatMinutes(activity.minutes))} · ${activity.cost === 0 ? 'Gratis' : `≤ ${activity.cost} kr.`}</span>${icon('arrow')}</div>${favoriteView ? saveButton(activity, 'mini-save') : ''}</article>`;
}

function renderAlternatives(matches) {
  const alternatives = matches.filter((activity) => activity.id !== current?.id).slice(0, 3);
  $('#alternatives').innerHTML = alternatives.length ? alternatives.map((activity) => miniCard(activity)).join('') : `<p class="no-alternatives">${current ? 'Din mission er den eneste, der passer lige nu. Justér dine valg for flere idéer.' : 'Nye muligheder dukker op, når du ændrer dine valg.'}</p>`;
}

function renderCategories() {
  $('#categories').innerHTML = categories.map((c) => `<button class="category-button ${c.id === category ? 'active' : ''}" data-category="${c.id}" aria-pressed="${c.id === category}">${icon(c.id === 'all' ? 'spark' : c.id)}${escape(({ bevaegelse: 'Bevæg dig', sammen: 'Sammen', praktisk: 'Få styr på det' })[c.id] || c.label)}</button>`).join('');
}

function refresh(announce = false) {
  const matches = filterActivities(filters());
  current = chooseActivity(matches, current?.id);
  $('#match-count').textContent = `${matches.length} ${matches.length === 1 ? 'mission passer' : 'missioner passer'} til dig`;
  renderCategories();
  renderMission();
  renderAlternatives(matches);
  if (announce) toast(current ? `Din næste mission: ${current.title}` : 'Ingen match. Prøv at ændre dine valg.');
}

function openActivity(id) {
  const activity = byId.get(id);
  if (!activity) return;
  // A saved or daily mission sets explicit filters so the shown mission always fits.
  category = activity.category;
  const minutes = [15, 30, 60, 120].find((amount) => amount >= activity.minutes);
  const budget = [0, 50, 100].find((amount) => amount >= activity.cost);
  $(`#filters input[name="minutes"][value="${minutes}"]`).checked = true;
  $(`#filters input[name="energy"][value="${activity.energy}"]`).checked = true;
  $(`#filters input[name="budget"][value="${budget}"]`).checked = true;
  $('#location').value = activity.location === 'either' ? 'any' : activity.location;
  $('#company').value = activity.company === 'either' ? 'any' : activity.company;
  current = activity;
  setView('explore');
  const matches = filterActivities(filters());
  $('#match-count').textContent = `${matches.length} ${matches.length === 1 ? 'mission passer' : 'missioner passer'} til dig`;
  renderCategories(); renderMission(); renderAlternatives(matches);
  $('#mission').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
  toast(`Valgt: ${activity.title}`);
}

function renderStats() {
  $('#favorite-count').textContent = favorites.size;
  $('#completed-count').textContent = history.length;
}

function renderFavorites() {
  const saved = activities.filter((activity) => favorites.has(activity.id));
  $('#favorites-list').innerHTML = saved.length ? saved.map((activity) => miniCard(activity, true)).join('') : `<div class="empty-card"><span class="empty-icon" aria-hidden="true">♡</span><h2>Her er plads til dine gode idéer.</h2><p>Tryk på hjertet på en mission for at gemme den. Så ligger den klar til næste gang.</p><button class="button primary" data-explore>Find en mission ${icon('arrow')}</button></div>`;
}

function setView(nextView) {
  view = nextView;
  $('#explore-view').hidden = nextView !== 'explore';
  $('#favorites-view').hidden = nextView !== 'favorites';
  $('#explore-nav').classList.toggle('active', nextView === 'explore');
  $('#favorites-nav').classList.toggle('active', nextView === 'favorites');
  $('#explore-nav').toggleAttribute('aria-current', nextView === 'explore');
  $('#favorites-nav').toggleAttribute('aria-current', nextView === 'favorites');
  const selected = $(nextView === 'explore' ? '#explore-nav' : '#favorites-nav');
  selected.setAttribute('aria-current', 'page');
  if (nextView === 'favorites') renderFavorites();
}

function toggleFavorite(id) {
  if (!byId.has(id)) return;
  const removed = favorites.has(id);
  if (removed) favorites.delete(id); else favorites.add(id);
  persist(); renderStats();
  // Keep focus on the pressed button for keyboard users.
  document.querySelectorAll('[data-save]').forEach((button) => {
    if (button.dataset.save !== id) return;
    button.setAttribute('aria-pressed', String(!removed));
    button.setAttribute('aria-label', `${removed ? 'Gem' : 'Fjern'} ${byId.get(id).title} ${removed ? 'som' : 'fra'} favorit`);
    if (button.classList.contains('mini-save')) button.innerHTML = `${icon('heart')}${removed ? 'Gem favorit' : 'Gemt'}`;
  });
  if (view === 'favorites') renderFavorites();
  toast(storageAvailable ? (removed ? 'Fjernet fra dine favoritter.' : 'Gemt til en anden god dag ♡') : 'Din browser kan ikke gemme. Favoritten gælder i denne session.');
}

function finish(id) {
  if (!byId.has(id) || hasDoneToday(id)) return;
  history.push({ id, date: dayKey() });
  if (timer?.id === id) { timer = null; renderTimer(); }
  persist(); renderStats(); renderMission();
  toast(storageAvailable ? 'Godt gået! Et lille skridt, der tæller ✳' : 'Godt gået! Din browser kan kun gemme fremskridtet i denne session.');
}

function startTimer(id) {
  const activity = byId.get(id);
  if (!activity) return;
  const remaining = activity.minutes * 60000;
  timer = { id, remaining, deadline: Date.now() + remaining, running: true };
  persist(); renderTimer();
  toast(`Din ${formatMinutes(activity.minutes)} pause starter nu.`);
}

function renderTimer() {
  $('#timer-bar').hidden = !timer;
  document.body.classList.toggle('timer-active', Boolean(timer));
  if (!timer) return;
  let remaining = timer.running ? Math.max(0, timer.deadline - Date.now()) : timer.remaining;
  if (remaining === 0 && timer.running) {
    timer.running = false; timer.remaining = 0;
    persist(); toast('Tiden er gået! Klar til at markere missionen som udført?');
  }
  const seconds = Math.ceil(remaining / 1000);
  $('#timer-time').textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  $('#timer-title').textContent = byId.get(timer.id).title;
  $('#timer-label').textContent = remaining === 0 ? 'God pause! Markér missionen som udført.' : timer.running ? 'Din mission er i gang' : 'Tag dig god tid. Timeren er på pause.';
  $('#timer-pause').textContent = remaining === 0 ? 'Udført' : timer.running ? 'Pause' : 'Fortsæt';
}

function toggleTimer() {
  if (!timer) return;
  const remaining = timer.running ? Math.max(0, timer.deadline - Date.now()) : timer.remaining;
  if (remaining === 0) {
    const id = timer.id;
    if (hasDoneToday(id)) { timer = null; persist(); renderTimer(); }
    else finish(id);
    return;
  }
  timer.remaining = remaining;
  timer.running = !timer.running;
  if (timer.running) timer.deadline = Date.now() + timer.remaining;
  persist(); renderTimer();
}

function renderDaily() {
  const daily = dailyActivity(dayKey());
  $('#daily-title').textContent = daily.title;
  $('#daily-description').textContent = daily.description;
  $('#daily-date').textContent = new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'short' }).format(new Date());
  $('#daily-button').dataset.open = daily.id;
}

$('#filters').addEventListener('submit', (event) => { event.preventDefault(); refresh(true); });
$('#filters').addEventListener('change', () => refresh());
$('#explore-nav').addEventListener('click', () => setView('explore'));
$('#favorites-nav').addEventListener('click', () => setView('favorites'));
$('#back-explore').addEventListener('click', () => setView('explore'));
$('#timer-pause').addEventListener('click', toggleTimer);
$('#timer-close').addEventListener('click', () => { timer = null; persist(); renderTimer(); toast('Timeren er stoppet.'); });

document.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.category) { category = button.dataset.category; refresh(); $(`[data-category="${category}"]`).focus(); }
  if (button.dataset.save) toggleFavorite(button.dataset.save);
  if (button.dataset.open) openActivity(button.dataset.open);
  if (button.dataset.start) startTimer(button.dataset.start);
  if (button.dataset.done) finish(button.dataset.done);
  if (button.hasAttribute('data-another')) refresh(true);
  if (button.hasAttribute('data-reset')) { $('#filters').reset(); category = 'all'; refresh(true); }
  if (button.hasAttribute('data-explore')) setView('explore');
});

document.addEventListener('visibilitychange', () => { if (!document.hidden) { renderTimer(); renderDaily(); renderStats(); renderMission(); } });
window.addEventListener('storage', (event) => { if (event.key === STORAGE_KEY || event.key === null) { load(); renderStats(); renderMission(); renderTimer(); if (view === 'favorites') renderFavorites(); } });
load(); refresh(); renderStats(); renderDaily(); renderTimer();
setInterval(() => {
  renderTimer();
  if (renderedDay !== dayKey()) {
    renderedDay = dayKey();
    renderDaily(); renderMission();
  }
}, 1000);
