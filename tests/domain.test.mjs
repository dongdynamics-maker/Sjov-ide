import test from 'node:test';
import assert from 'node:assert/strict';
import { activities, categories, filterActivities, chooseActivity, dailyActivity, formatMinutes } from '../dist/domain.mjs';

test('missions have unique IDs, useful complete instructions, and supported metadata', () => {
  assert.ok(activities.length >= 36);
  assert.equal(new Set(activities.map(({ id }) => id)).size, activities.length);
  assert.deepEqual(categories.map(({ id }) => id), ['all', 'ro', 'kreativ', 'bevaegelse', 'sammen', 'praktisk']);
  const allowedCategories = new Set(categories.slice(1).map(({ id }) => id));
  for (const activity of activities) {
    assert.match(activity.id, /^[a-z0-9-]+$/);
    for (const field of ['title', 'description', 'payoff']) assert.ok(activity[field].length > 8, `${activity.id}: ${field}`);
    assert.ok(allowedCategories.has(activity.category), activity.id);
    assert.ok([10, 15, 20, 30, 45, 60].includes(activity.minutes), activity.id);
    assert.ok([1, 2, 3].includes(activity.energy), activity.id);
    assert.ok(Number.isInteger(activity.cost) && activity.cost >= 0 && activity.cost <= 100, activity.id);
    assert.ok(['inside', 'outside', 'either'].includes(activity.location), activity.id);
    assert.ok(['alone', 'together', 'either'].includes(activity.company), activity.id);
    assert.equal(activity.steps.length, 3, activity.id);
    assert.ok(activity.steps.every((step) => typeof step === 'string' && step.length > 15), activity.id);
  }
  assert.deepEqual([...new Set(activities.map(({ minutes }) => minutes))].sort((a, b) => a - b), [10, 15, 20, 30, 45, 60]);
  assert.deepEqual([...new Set(activities.map(({ energy }) => energy))].sort(), [1, 2, 3]);
  for (const category of allowedCategories) assert.ok(activities.filter((activity) => activity.category === category).length >= 6);
});

const fixture = [
  { id: 'limit', minutes: 15, energy: 1, cost: 0, location: 'inside', company: 'alone', category: 'ro' },
  { id: 'flexible', minutes: 10, energy: 1, cost: 0, location: 'either', company: 'either', category: 'ro' },
  { id: 'too-long', minutes: 20, energy: 1, cost: 0, location: 'inside', company: 'alone', category: 'ro' },
  { id: 'too-tiring', minutes: 15, energy: 2, cost: 0, location: 'inside', company: 'alone', category: 'ro' },
  { id: 'too-expensive', minutes: 15, energy: 1, cost: 25, location: 'inside', company: 'alone', category: 'ro' },
  { id: 'outside', minutes: 15, energy: 1, cost: 0, location: 'outside', company: 'alone', category: 'ro' },
  { id: 'together', minutes: 15, energy: 1, cost: 0, location: 'inside', company: 'together', category: 'ro' },
  { id: 'other-category', minutes: 15, energy: 1, cost: 0, location: 'inside', company: 'alone', category: 'praktisk' },
];

test('filters apply every inclusive limit and support flexible missions', () => {
  const filtered = filterActivities({ minutes: 15, energy: 1, budget: 0, location: 'inside', company: 'alone', category: 'ro' }, fixture);
  assert.deepEqual(filtered.map(({ id }) => id), ['limit', 'flexible']);
  assert.equal(fixture.length, 8);
});

test('location and company flexibility works in both directions', () => {
  const filtered = filterActivities({ minutes: 15, energy: 1, budget: 0, location: 'outside', company: 'together', category: 'ro' }, fixture);
  assert.deepEqual(filtered.map(({ id }) => id), ['flexible']);
  assert.deepEqual(filterActivities({ location: 'any', company: 'any', category: 'all' }, fixture), fixture);
  assert.deepEqual(filterActivities({}, fixture), fixture);
});

test('budget and time upper boundaries are included', () => {
  const items = [
    { id: 'fifty', minutes: 30, energy: 2, cost: 50, location: 'inside', company: 'alone', category: 'praktisk' },
    { id: 'hundred', minutes: 60, energy: 3, cost: 100, location: 'outside', company: 'together', category: 'sammen' },
  ];
  assert.deepEqual(filterActivities({ minutes: 30, energy: 2, budget: 50 }, items).map(({ id }) => id), ['fifty']);
  assert.equal(filterActivities({ minutes: 60, energy: 3, budget: 100 }, items).length, 2);
  assert.equal(filterActivities({ minutes: 120, energy: 3, budget: 0 }, items).length, 0);
});

test('there are several real zero-cost indoor solo missions for a low-energy quarter hour', () => {
  const matches = filterActivities({ minutes: 15, energy: 1, budget: 0, location: 'inside', company: 'alone' });
  assert.ok(matches.length >= 6);
  assert.ok(matches.some((activity) => activity.minutes === 15 && activity.company === 'alone'));
  assert.ok(new Set(matches.map(({ category }) => category)).size >= 3);
});

test('all combinations return only missions that fit the requested constraints', () => {
  for (const minutes of [15, 30, 60, 120]) for (const energy of [1, 2, 3]) for (const budget of [0, 50, 100]) {
    for (const location of ['any', 'inside', 'outside']) for (const company of ['any', 'alone', 'together']) {
      for (const { id: category } of categories) {
        const filters = { minutes, energy, budget, location, company, category };
        const expected = activities.filter((activity) => {
          if (activity.minutes > minutes || activity.energy > energy || activity.cost > budget) return false;
          if (location !== 'any' && ![location, 'either'].includes(activity.location)) return false;
          if (company !== 'any' && ![company, 'either'].includes(activity.company)) return false;
          return category === 'all' || activity.category === category;
        });
        assert.deepEqual(filterActivities(filters), expected);
      }
    }
  }
});

test('choosing supports empty and one-item lists without unnecessary random calls', () => {
  assert.equal(chooseActivity([], null, () => { throw Error('should not sample empty list'); }), undefined);
  assert.equal(chooseActivity([fixture[0]], fixture[0].id, () => 0.5), fixture[0]);
});

test('choosing excludes the previous mission when alternatives exist and respects random boundaries', () => {
  const items = fixture.slice(0, 3);
  assert.equal(chooseActivity(items, 'limit', () => 0).id, 'flexible');
  assert.equal(chooseActivity(items, 'limit', () => 0.999999).id, 'too-long');
  assert.equal(chooseActivity(items, 'missing', () => 0).id, 'limit');
  assert.equal(chooseActivity(items, null, () => 1).id, 'too-long');
  assert.equal(chooseActivity(items, null, () => -0.1).id, 'limit');
  assert.equal(chooseActivity(items, null, () => NaN).id, 'limit');
  assert.deepEqual(items, fixture.slice(0, 3));
});

test('daily missions are repeatable, belong to the catalogue, and vary over a month', () => {
  const results = [];
  for (let day = 1; day <= 31; day += 1) {
    const date = `2026-10-${String(day).padStart(2, '0')}`;
    const selected = dailyActivity(date);
    assert.equal(selected, dailyActivity(date));
    assert.ok(activities.includes(selected));
    results.push(selected.id);
  }
  assert.ok(new Set(results).size >= 10);
  assert.throws(() => dailyActivity(new Date()), TypeError);
  assert.throws(() => dailyActivity('14/10/2026'), TypeError);
});

test('Danish duration labels cover minutes, one hour, and multiple hours', () => {
  assert.equal(formatMinutes(15), '15 min');
  assert.equal(formatMinutes(45), '45 min');
  assert.equal(formatMinutes(60), '1 time');
  assert.equal(formatMinutes(90), '1 time og 30 min');
  assert.equal(formatMinutes(120), '2 timer');
  assert.equal(formatMinutes(135), '2 timer og 15 min');
});
