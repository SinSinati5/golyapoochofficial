// Freestyle scores follow the original Efe, Amir, Sina column order.
// Each Olympic pair is [points for, points against] from that player's record.
const players = ['Efe', 'Amir', 'Sina'];
const freestyle = [[9,10,11], [11,10,4], [10,11,8], [5,2,11]];
const openingChampion = 'Sina';
const olympic = {
  Sina: [[5,11],[11,5],[11,3],[7,11],[11,5],[3,7]],
  Amir: [[5,11],[5,11],[11,3],[7,11],[11,5],[7,3]]
};
const standings = players.map((name, i) => ({
  name,
  points: freestyle.reduce((sum, row) => sum + row[i], 0),
  titles: Number(name === openingChampion) + freestyle.filter(row => row[i] === Math.max(...row)).length
})).sort((a,b) => b.titles - a.titles || b.points - a.points);

function record(games) {
  const wins = games.filter(([a,b]) => a > b).length;
  const points = games.reduce((sum,[a]) => sum + a, 0);
  const against = games.reduce((sum,[,b]) => sum + b, 0);
  return {wins, losses:games.length-wins, points, against};
}

function showPodium(mode) {
  const isFree = mode === 'free';
  const entries = isFree ? standings.map(({name,titles,points}, i) => ({
    name, rank:i+1, summary:titles+' '+(titles===1?'title':'titles')+' · '+points+' recorded pts'
  })) : Object.entries(olympic).map(([name,games]) => {
    const {wins,losses} = record(games);
    return {name, wins, summary:wins+' wins · '+losses+' losses'};
  }).sort((a,b) => b.wins-a.wins);
  if (!isFree) entries.forEach(entry => {
    entry.rank = 1 + entries.filter(other => other.wins > entry.wins).length;
  });
  document.querySelector('#ranking').textContent = isFree
    ? 'Ranked by titles won. Points from the four scored games break the tie between Efe and Amir.'
    : 'Ranked by wins. Sina and Amir share first place with three wins each.';
  document.querySelector('#podium').innerHTML = entries.map(({name,rank,summary}) => {
    const tied = entries.filter(p => p.rank === rank).length > 1;
    const color = ['#e3c85c','#ced2d2','#dca37a'][rank-1];
    return '<div class="medal '+(rank===1?'gold':'')+'" style="--tone:'+color+'"><em aria-hidden="true">0'+rank+'</em><label>'+ (tied?'Joint ':'')+['first','second','third'][rank-1]+' place</label><strong>'+name+'</strong><span>'+summary+'</span></div>';
  }).join('');
  document.querySelectorAll('[data-mode]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
  });
}

const gestures = {
  Sina: 'Sina fakes a shot with two fingers of his right hand toward his open left palm.',
  Efe: 'Efe shows his empty palm.',
  Amir: 'Amir holds the game token above his cupped palm.'
};

function playerRow({name, titles, points}) {
  let traditional = 'No games recorded';
  if (olympic[name]) {
    const {wins,losses,points:scored,against} = record(olympic[name]);
    traditional = wins+' W / '+losses+' L<span class="sub">'+scored+' scored · '+against+' conceded</span>';
  }
  return '<article class="ro"><img class="player-art" src="assets/'+name.toLowerCase()+'-gol.webp" alt="'+gestures[name]+'"><h3 class="athlete">'+name+'</h3><div class="stat"><small class="discipline">Freestyle</small>'+titles+' '+(titles===1?'title':'titles')+'<span class="sub">'+points+' points in '+freestyle.length+' scored games</span></div><div class="stat"><small class="discipline">Traditional Olympic</small>'+traditional+'</div></article>';
}

function table(label, columns, rows) {
  return '<table aria-label="'+label+'"><thead><tr>'+columns.map(c => '<th scope="col">'+c+'</th>').join('')+'</tr></thead><tbody>'+rows.map((cells,i) => '<tr><th scope="row">'+String(i+1).padStart(2,'0')+'</th>'+cells.join('')+'</tr>').join('')+'</tbody></table>';
}

document.querySelector('#roster').innerHTML = standings.map(playerRow).join('');
const scoredResults = freestyle.map(row => row.map(n =>
  '<td class="'+(n===Math.max(...row)?'win':'')+'">'+n+'</td>'
));
const openingResult = ['<td colspan="3"><strong>'+openingChampion+' won</strong> · Score unavailable</td>'];
document.querySelector('#f-log').innerHTML = table('Freestyle championship scores', ['Game',...players], [openingResult, ...scoredResults]);
document.querySelector('#o-log').innerHTML = table('Traditional Olympic player records',['Game',...Object.keys(olympic)],olympic.Sina.map((_,i) => Object.values(olympic).map(games => {
  const [a,b] = games[i];
  return '<td class="'+(a>b?'win':'')+'">'+a+'–'+b+' <small>'+(a>b?'W':'L')+'</small></td>';
})));
document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => showPodium(button.dataset.mode)));
showPodium('free');
