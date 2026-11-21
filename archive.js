const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
  menu.textContent = expanded ? 'Menu +' : 'Close −';
});

const scenarios = {
  wrong: {
    label: 'POINT + POSSESSION',
    title: 'The performer scores.',
    description: 'Both challengers miss. The performer earns one point and keeps the gol for the next performance.'
  },
  right: {
    label: 'CHALLENGER DUEL · ZERO POINTS',
    title: 'The challengers duel for the gol.',
    description: 'Both challengers choose the correct hand. They duel each other. The winner takes possession, and nobody scores a point.'
  },
  split: {
    label: 'PERFORMER VS CORRECT CHALLENGER',
    title: 'The performer gets a second chance.',
    description: 'One challenger is correct. That challenger duels the performer. If the performer wins, they earn one point and keep the gol. If the challenger wins, the gol changes hands and nobody scores.'
  }
};

document.querySelectorAll('[data-scenario]').forEach(button => {
  button.addEventListener('click', () => {
    const scenario = scenarios[button.dataset.scenario];
    const panel = document.querySelector('#rule-outcome');
    panel.querySelector('.eyebrow').textContent = scenario.label;
    panel.querySelector('h3').textContent = scenario.title;
    panel.querySelector('p').textContent = scenario.description;
    document.querySelectorAll('[data-scenario]').forEach(option => {
      option.setAttribute('aria-pressed', String(option === button));
    });
  });
});

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let count = 0;
    document.querySelectorAll('#filter-results [data-result]').forEach(row => {
      row.hidden = filter !== 'all' && row.dataset.result !== filter;
      if (!row.hidden) count += 1;
    });
    document.querySelectorAll('[data-filter]').forEach(option => {
      option.setAttribute('aria-pressed', String(option === button));
    });
    document.querySelector('.filter-status').textContent =
      'Showing ' + count + ' scored ' + (filter === 'all' ? 'results' : filter === 'win' ? 'wins' : 'losses') + '.';
  });
});
