/*
 * CBB 68-Team Tournament Rankings — Placeholder Data
 *
 * TO SWAP IN REAL DATA:
 * 1. Place your CSV at public/data/cbb-rankings.csv
 * 2. Parse with Papaparse and map rows to CbbTeam[]
 * 3. Or just replace this array with your real data
 *
 * CSV columns expected:
 *   rank, name, mascot, conf, seed, record, cmbki, offEff, defEff, netEff, sos, tempo, q1Record
 */

export interface CbbTeam {
  rank:    number;
  prev:    number;   // previous rank for ▲▼ indicator
  name:    string;
  mascot:  string;
  conf:    string;
  seed:    number;
  record:  string;   // e.g. "28-5"
  cmbki:   number;   // CMBKi+ composite
  offEff:  number;   // offensive efficiency (pts/100 poss)
  defEff:  number;   // defensive efficiency (pts allowed/100 poss)
  netEff:  number;   // off - def
  sos:     number;   // strength of schedule
  tempo:   number;   // possessions per game
  q1Record: string;  // quad 1 record e.g. "8-3"
}

export const CBB_CONFS: string[] = [
  'ACC', 'Big 12', 'Big East', 'Big Ten', 'Pac-12', 'SEC',
  'AAC', 'A-10', 'MWC', 'WCC', 'MVC', 'CAA', 'Horizon',
  'MAAC', 'Patriot', 'Southern', 'MEAC', 'NEC', 'OVC', 'SWAC',
];

export const CBB_CONF_COLORS: Record<string, string> = {
  'ACC':      'rgba(0,87,184,0.12)',
  'Big 12':   'rgba(207,16,45,0.12)',
  'Big East': 'rgba(224,58,62,0.12)',
  'Big Ten':  'rgba(0,51,160,0.12)',
  'Pac-12':   'rgba(0,100,175,0.12)',
  'SEC':      'rgba(0,51,102,0.12)',
  'AAC':      'rgba(0,56,147,0.12)',
  'A-10':     'rgba(0,83,159,0.12)',
  'MWC':      'rgba(0,60,113,0.12)',
  'WCC':      'rgba(12,35,68,0.12)',
  'MVC':      'rgba(0,40,85,0.12)',
  'CAA':      'rgba(0,56,101,0.12)',
};

/* ── Placeholder 68 teams ── */
export const cbbTeams: CbbTeam[] = [
  { rank:1,  prev:1,  name:'Duke',          mascot:'Blue Devils',   conf:'ACC',      seed:1,  record:'30-3',  cmbki:24.8, offEff:122.4, defEff:88.2,  netEff:34.2, sos:18.4, tempo:69.2, q1Record:'11-2' },
  { rank:2,  prev:2,  name:'Kansas',        mascot:'Jayhawks',      conf:'Big 12',   seed:1,  record:'29-4',  cmbki:23.1, offEff:120.8, defEff:89.7,  netEff:31.1, sos:19.2, tempo:68.8, q1Record:'10-3' },
  { rank:3,  prev:4,  name:'Marquette',     mascot:'Golden Eagles', conf:'Big East',  seed:2,  record:'28-5',  cmbki:21.4, offEff:118.2, defEff:88.6,  netEff:29.6, sos:16.9, tempo:67.4, q1Record:'9-4' },
  { rank:4,  prev:3,  name:'North Carolina', mascot:'Tar Heels',    conf:'ACC',      seed:2,  record:'27-6',  cmbki:21.6, offEff:119.2, defEff:90.4,  netEff:28.8, sos:17.8, tempo:71.6, q1Record:'9-5' },
  { rank:5,  prev:5,  name:'Kentucky',      mascot:'Wildcats',      conf:'SEC',      seed:1,  record:'28-5',  cmbki:20.9, offEff:118.7, defEff:91.0,  netEff:27.7, sos:18.9, tempo:70.2, q1Record:'10-4' },
  { rank:6,  prev:7,  name:'Houston',       mascot:'Cougars',       conf:'Big 12',   seed:2,  record:'27-5',  cmbki:19.4, offEff:116.9, defEff:87.8,  netEff:29.1, sos:16.4, tempo:65.8, q1Record:'8-4' },
  { rank:7,  prev:6,  name:'Northwestern',  mascot:'Wildcats',      conf:'Big Ten',  seed:1,  record:'27-6',  cmbki:18.2, offEff:115.4, defEff:89.1,  netEff:26.3, sos:17.1, tempo:66.4, q1Record:'8-5' },
  { rank:8,  prev:8,  name:'Arizona',       mascot:'Wildcats',      conf:'Pac-12',   seed:3,  record:'26-7',  cmbki:17.7, offEff:117.1, defEff:92.3,  netEff:24.8, sos:15.8, tempo:70.8, q1Record:'7-5' },
  { rank:9,  prev:10, name:'Florida',       mascot:'Gators',        conf:'SEC',      seed:3,  record:'26-7',  cmbki:16.3, offEff:114.8, defEff:90.8,  netEff:24.0, sos:16.0, tempo:68.2, q1Record:'8-5' },
  { rank:10, prev:9,  name:'Michigan St.',  mascot:'Spartans',      conf:'Big Ten',  seed:4,  record:'25-8',  cmbki:14.9, offEff:113.6, defEff:91.4,  netEff:22.2, sos:16.2, tempo:67.0, q1Record:'7-6' },
  { rank:11, prev:11, name:'Purdue',        mascot:'Boilermakers',  conf:'Big Ten',  seed:4,  record:'25-8',  cmbki:14.3, offEff:115.2, defEff:93.1,  netEff:22.1, sos:16.8, tempo:66.2, q1Record:'7-6' },
  { rank:12, prev:12, name:'Baylor',        mascot:'Bears',         conf:'Big 12',   seed:3,  record:'25-7',  cmbki:18.6, offEff:116.4, defEff:90.2,  netEff:26.2, sos:17.4, tempo:68.6, q1Record:'8-5' },
  { rank:13, prev:14, name:'Arizona St.',   mascot:'Sun Devils',    conf:'Pac-12',   seed:2,  record:'26-6',  cmbki:20.2, offEff:117.8, defEff:91.8,  netEff:26.0, sos:15.4, tempo:69.4, q1Record:'8-4' },
  { rank:14, prev:13, name:'Creighton',     mascot:'Bluejays',      conf:'Big East',  seed:6,  record:'24-9',  cmbki:7.3,  offEff:112.8, defEff:94.2,  netEff:18.6, sos:15.2, tempo:66.8, q1Record:'6-6' },
  { rank:15, prev:15, name:'Wisconsin',     mascot:'Badgers',       conf:'Big Ten',  seed:4,  record:'25-8',  cmbki:15.8, offEff:113.2, defEff:89.6,  netEff:23.6, sos:16.6, tempo:64.2, q1Record:'7-5' },
  { rank:16, prev:16, name:'Indiana',       mascot:'Hoosiers',      conf:'Big Ten',  seed:4,  record:'24-8',  cmbki:13.1, offEff:114.6, defEff:93.8,  netEff:20.8, sos:16.4, tempo:67.8, q1Record:'6-6' },
  { rank:17, prev:18, name:'Ohio St.',      mascot:'Buckeyes',      conf:'Big Ten',  seed:5,  record:'24-9',  cmbki:10.2, offEff:113.4, defEff:94.6,  netEff:18.8, sos:17.0, tempo:68.4, q1Record:'7-7' },
  { rank:18, prev:17, name:'Illinois',      mascot:'Fighting Illini',conf:'Big Ten',  seed:5,  record:'23-9',  cmbki:8.2,  offEff:112.6, defEff:93.8,  netEff:18.8, sos:16.8, tempo:69.6, q1Record:'6-7' },
  { rank:19, prev:19, name:'St. Mary\'s',   mascot:'Gaels',         conf:'WCC',      seed:5,  record:'27-5',  cmbki:9.1,  offEff:111.4, defEff:92.4,  netEff:19.0, sos:11.2, tempo:63.8, q1Record:'4-2' },
  { rank:20, prev:21, name:'Marquette',     mascot:'Golden Eagles', conf:'Big East',  seed:3,  record:'25-7',  cmbki:17.1, offEff:116.2, defEff:92.6,  netEff:23.6, sos:15.6, tempo:67.2, q1Record:'7-5' },
  { rank:21, prev:20, name:'Dayton',        mascot:'Flyers',        conf:'A-10',     seed:7,  record:'26-6',  cmbki:7.1,  offEff:111.8, defEff:93.0,  netEff:18.8, sos:12.4, tempo:66.6, q1Record:'5-3' },
  { rank:22, prev:22, name:'Texas A&M',     mascot:'Aggies',        conf:'SEC',      seed:7,  record:'23-10', cmbki:5.9,  offEff:110.4, defEff:93.2,  netEff:17.2, sos:17.6, tempo:67.4, q1Record:'6-7' },
  { rank:23, prev:24, name:'Missouri',      mascot:'Tigers',        conf:'SEC',      seed:7,  record:'22-10', cmbki:6.4,  offEff:111.2, defEff:94.0,  netEff:17.2, sos:17.2, tempo:68.0, q1Record:'5-7' },
  { rank:24, prev:23, name:'Mississippi',   mascot:'Rebels',        conf:'SEC',      seed:8,  record:'22-11', cmbki:4.2,  offEff:109.8, defEff:94.6,  netEff:15.2, sos:17.8, tempo:69.2, q1Record:'5-8' },
  { rank:25, prev:25, name:'St. John\'s',   mascot:'Red Storm',     conf:'Big East',  seed:6,  record:'24-8',  cmbki:7.8,  offEff:112.4, defEff:93.8,  netEff:18.6, sos:15.0, tempo:67.8, q1Record:'6-5' },
  { rank:26, prev:27, name:'Memphis',       mascot:'Tigers',        conf:'AAC',      seed:8,  record:'23-9',  cmbki:5.1,  offEff:110.6, defEff:94.2,  netEff:16.4, sos:13.8, tempo:70.4, q1Record:'4-5' },
  { rank:27, prev:26, name:'Penn St.',      mascot:'Nittany Lions', conf:'Big Ten',  seed:7,  record:'22-11', cmbki:6.6,  offEff:111.0, defEff:93.6,  netEff:17.4, sos:16.4, tempo:66.2, q1Record:'5-7' },
  { rank:28, prev:28, name:'Michigan',      mascot:'Wolverines',    conf:'Big Ten',  seed:8,  record:'21-12', cmbki:4.4,  offEff:109.4, defEff:94.8,  netEff:14.6, sos:16.6, tempo:65.8, q1Record:'4-8' },
  { rank:29, prev:30, name:'TCU',           mascot:'Horned Frogs',  conf:'Big 12',   seed:9,  record:'22-11', cmbki:5.3,  offEff:110.2, defEff:93.4,  netEff:16.8, sos:16.0, tempo:68.8, q1Record:'5-7' },
  { rank:30, prev:29, name:'Rutgers',       mascot:'Scarlet Knights',conf:'Big Ten',  seed:5,  record:'23-9',  cmbki:8.9,  offEff:112.0, defEff:92.8,  netEff:19.2, sos:16.2, tempo:65.4, q1Record:'6-6' },
  { rank:31, prev:31, name:'Gonzaga',       mascot:'Bulldogs',      conf:'WCC',      seed:6,  record:'25-7',  cmbki:6.8,  offEff:114.2, defEff:96.2,  netEff:18.0, sos:10.8, tempo:71.2, q1Record:'3-3' },
  { rank:32, prev:33, name:'VCU',           mascot:'Rams',          conf:'A-10',     seed:11, record:'26-7',  cmbki:7.2,  offEff:111.6, defEff:93.4,  netEff:18.2, sos:11.6, tempo:68.4, q1Record:'4-3' },
  { rank:33, prev:32, name:'NC State',      mascot:'Wolfpack',      conf:'ACC',      seed:11, record:'22-12', cmbki:5.1,  offEff:109.8, defEff:93.6,  netEff:16.2, sos:16.2, tempo:67.6, q1Record:'4-8' },
  { rank:34, prev:34, name:'Clemson',       mascot:'Tigers',        conf:'ACC',      seed:6,  record:'23-10', cmbki:6.1,  offEff:110.8, defEff:93.8,  netEff:17.0, sos:15.8, tempo:66.4, q1Record:'5-6' },
  { rank:35, prev:36, name:'BYU',           mascot:'Cougars',       conf:'Big 12',   seed:10, record:'22-11', cmbki:6.2,  offEff:110.4, defEff:93.2,  netEff:17.2, sos:15.6, tempo:67.0, q1Record:'4-7' },
  { rank:36, prev:35, name:'Oklahoma',      mascot:'Sooners',       conf:'SEC',      seed:8,  record:'21-12', cmbki:4.8,  offEff:109.6, defEff:93.8,  netEff:15.8, sos:17.4, tempo:68.6, q1Record:'4-8' },
  { rank:37, prev:37, name:'Utah St.',      mascot:'Aggies',        conf:'MWC',      seed:10, record:'26-7',  cmbki:5.8,  offEff:110.2, defEff:93.6,  netEff:16.6, sos:10.4, tempo:66.8, q1Record:'3-3' },
  { rank:38, prev:39, name:'Boise St.',     mascot:'Broncos',       conf:'MWC',      seed:9,  record:'24-9',  cmbki:3.7,  offEff:108.8, defEff:94.4,  netEff:14.4, sos:10.8, tempo:65.2, q1Record:'2-4' },
  { rank:39, prev:38, name:'Drake',         mascot:'Bulldogs',      conf:'MVC',      seed:11, record:'27-5',  cmbki:5.6,  offEff:109.4, defEff:92.8,  netEff:16.6, sos:9.8,  tempo:64.6, q1Record:'3-2' },
  { rank:40, prev:40, name:'Iowa St.',      mascot:'Cyclones',      conf:'Big 12',   seed:9,  record:'21-12', cmbki:4.1,  offEff:108.6, defEff:93.8,  netEff:14.8, sos:16.4, tempo:65.0, q1Record:'3-8' },
  { rank:41, prev:42, name:'W. Virginia',   mascot:'Mountaineers',  conf:'Big 12',   seed:10, record:'21-12', cmbki:4.8,  offEff:109.2, defEff:93.4,  netEff:15.8, sos:15.8, tempo:67.8, q1Record:'4-7' },
  { rank:42, prev:41, name:'Nevada',        mascot:'Wolf Pack',     conf:'MWC',      seed:10, record:'25-8',  cmbki:5.4,  offEff:109.8, defEff:93.2,  netEff:16.6, sos:10.2, tempo:66.4, q1Record:'3-3' },
  { rank:43, prev:43, name:'Toledo',        mascot:'Rockets',       conf:'MAC',      seed:9,  record:'27-6',  cmbki:4.6,  offEff:108.4, defEff:92.6,  netEff:15.8, sos:8.4,  tempo:67.2, q1Record:'2-2' },
  { rank:44, prev:44, name:'UAB',           mascot:'Blazers',       conf:'AAC',      seed:12, record:'26-7',  cmbki:1.2,  offEff:107.2, defEff:94.8,  netEff:12.4, sos:9.6,  tempo:66.0, q1Record:'2-3' },
  { rank:45, prev:46, name:'Akron',         mascot:'Zips',          conf:'MAC',      seed:12, record:'27-6',  cmbki:2.1,  offEff:107.8, defEff:94.2,  netEff:13.6, sos:8.2,  tempo:65.4, q1Record:'1-3' },
  { rank:46, prev:45, name:'Liberty',       mascot:'Flames',        conf:'CUSA',     seed:12, record:'28-5',  cmbki:0.8,  offEff:106.4, defEff:94.6,  netEff:11.8, sos:7.8,  tempo:64.8, q1Record:'1-2' },
  { rank:47, prev:47, name:'Furman',        mascot:'Paladins',      conf:'Southern', seed:13, record:'27-7',  cmbki:-2.4, offEff:105.8, defEff:96.2,  netEff:9.6,  sos:8.0,  tempo:65.6, q1Record:'1-3' },
  { rank:48, prev:48, name:'Bradley',       mascot:'Braves',        conf:'MVC',      seed:14, record:'26-8',  cmbki:-5.8, offEff:104.6, defEff:97.4,  netEff:7.2,  sos:8.6,  tempo:64.2, q1Record:'0-3' },
  { rank:49, prev:50, name:'Colgate',       mascot:'Raiders',       conf:'Patriot',  seed:13, record:'28-5',  cmbki:-3.8, offEff:105.2, defEff:96.8,  netEff:8.4,  sos:6.4,  tempo:66.0, q1Record:'0-2' },
  { rank:50, prev:49, name:'Samford',       mascot:'Bulldogs',      conf:'Southern', seed:14, record:'27-7',  cmbki:-5.6, offEff:104.8, defEff:97.8,  netEff:7.0,  sos:7.2,  tempo:65.8, q1Record:'0-3' },
  { rank:51, prev:51, name:'N. Kentucky',   mascot:'Norse',         conf:'Horizon',  seed:13, record:'26-7',  cmbki:-3.2, offEff:105.4, defEff:96.4,  netEff:9.0,  sos:6.8,  tempo:67.4, q1Record:'0-2' },
  { rank:52, prev:52, name:'Vermont',       mascot:'Catamounts',    conf:'AEC',      seed:15, record:'27-6',  cmbki:-5.3, offEff:104.2, defEff:97.2,  netEff:7.0,  sos:5.8,  tempo:64.6, q1Record:'0-2' },
  { rank:53, prev:53, name:'Morehead St.',  mascot:'Eagles',        conf:'OVC',      seed:14, record:'26-8',  cmbki:-5.9, offEff:104.4, defEff:98.0,  netEff:6.4,  sos:6.2,  tempo:66.2, q1Record:'0-3' },
  { rank:54, prev:55, name:'UCSB',          mascot:'Gauchos',       conf:'Big West', seed:14, record:'25-8',  cmbki:-6.2, offEff:103.8, defEff:97.6,  netEff:6.2,  sos:7.0,  tempo:65.4, q1Record:'0-2' },
  { rank:55, prev:54, name:'Longwood',      mascot:'Lancers',       conf:'Big South',seed:15, record:'26-7',  cmbki:-6.8, offEff:103.4, defEff:98.2,  netEff:5.2,  sos:5.4,  tempo:64.8, q1Record:'0-2' },
  { rank:56, prev:56, name:'Youngstown',    mascot:'Penguins',      conf:'Horizon',  seed:13, record:'25-8',  cmbki:-4.1, offEff:105.0, defEff:97.0,  netEff:8.0,  sos:6.6,  tempo:65.2, q1Record:'0-2' },
  { rank:57, prev:57, name:'Montana St.',   mascot:'Bobcats',       conf:'Big Sky',  seed:16, record:'24-9',  cmbki:-9.8, offEff:101.8, defEff:99.4,  netEff:2.4,  sos:5.2,  tempo:66.8, q1Record:'0-3' },
  { rank:58, prev:58, name:'Norfolk St.',   mascot:'Spartans',      conf:'MEAC',     seed:16, record:'23-10', cmbki:-8.1, offEff:102.4, defEff:98.8,  netEff:3.6,  sos:4.8,  tempo:67.6, q1Record:'0-3' },
  { rank:59, prev:60, name:'SIUE',          mascot:'Cougars',       conf:'OVC',      seed:16, record:'22-11', cmbki:-9.2, offEff:101.4, defEff:99.2,  netEff:2.2,  sos:4.6,  tempo:65.4, q1Record:'0-3' },
  { rank:60, prev:59, name:'FDU',           mascot:'Knights',       conf:'NEC',      seed:16, record:'21-13', cmbki:-10.1,offEff:100.8, defEff:99.6,  netEff:1.2,  sos:4.2,  tempo:66.0, q1Record:'0-4' },
  { rank:61, prev:61, name:'Fairleigh D.',  mascot:'Knights',       conf:'NEC',      seed:15, record:'23-10', cmbki:-7.1, offEff:103.0, defEff:98.4,  netEff:4.6,  sos:4.4,  tempo:64.4, q1Record:'0-3' },
  { rank:62, prev:62, name:'Colgate',       mascot:'Raiders',       conf:'Patriot',  seed:15, record:'24-9',  cmbki:-6.4, offEff:103.6, defEff:97.8,  netEff:5.8,  sos:5.0,  tempo:65.0, q1Record:'0-2' },
  { rank:63, prev:63, name:'Youngstown',    mascot:'Penguins',      conf:'Horizon',  seed:13, record:'24-9',  cmbki:-4.1, offEff:104.8, defEff:97.2,  netEff:7.6,  sos:6.0,  tempo:64.6, q1Record:'0-2' },
  { rank:64, prev:64, name:'Vermont',       mascot:'Catamounts',    conf:'AEC',      seed:12, record:'25-8',  cmbki:-1.8, offEff:106.2, defEff:95.8,  netEff:10.4, sos:5.6,  tempo:63.8, q1Record:'0-2' },
  { rank:65, prev:65, name:'SIUE',          mascot:'Cougars',       conf:'OVC',      seed:16, record:'20-14', cmbki:-11.4,offEff:100.2, defEff:100.2, netEff:0.0,  sos:4.0,  tempo:66.6, q1Record:'0-4' },
  { rank:66, prev:66, name:'Montana St.',   mascot:'Bobcats',       conf:'Big Sky',  seed:16, record:'20-13', cmbki:-10.8,offEff:100.6, defEff:100.0, netEff:0.6,  sos:4.4,  tempo:67.2, q1Record:'0-3' },
  { rank:67, prev:67, name:'Norfolk St.',   mascot:'Spartans',      conf:'MEAC',     seed:16, record:'19-14', cmbki:-11.2,offEff:100.4, defEff:100.4, netEff:0.0,  sos:4.0,  tempo:68.0, q1Record:'0-4' },
  { rank:68, prev:68, name:'FDU',           mascot:'Knights',       conf:'NEC',      seed:16, record:'18-15', cmbki:-12.4,offEff:99.6,  defEff:101.2, netEff:-1.6, sos:3.8,  tempo:65.8, q1Record:'0-5' },
];
