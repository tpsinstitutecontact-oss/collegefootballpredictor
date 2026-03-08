'use client';

import { useState, useEffect, useRef } from 'react';
import NavBar from '@/components/cfbpredictor-rankings/NavBar';
import { useTheme } from '@/components/cfbpredictor-rankings/ThemeProvider';

/* ══════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════ */
const REGIONS = ['East', 'West', 'South', 'Midwest'] as const;
type Region = typeof REGIONS[number];
interface Team { seed: number; name: string; abbr: string; delta: string; deltaPos: boolean; score: number; }
interface Game  { label: string; prob: string; top: Team; bot: Team; winnerTop: boolean; upset?: boolean; }

/* ══════════════════════════════════════════════
   BRACKET DATA
══════════════════════════════════════════════ */
const data = {
  East: {
    venue: 'Albany, NY · Mar 20–23',
    r64: [
      { label:'G1 · 1v16', prob:'94.2%', winnerTop:true,  top:{seed:1,  name:'Duke',       abbr:'Duke',    delta:'+24.8', deltaPos:true,  score:82}, bot:{seed:16, name:'Norfolk St.', abbr:'Norf St', delta:'−8.1',  deltaPos:false, score:54} },
      { label:'G2 · 8v9',  prob:'52.1%', winnerTop:true,  top:{seed:8,  name:'Mississippi',abbr:'Ole Miss',delta:'+4.2',  deltaPos:true,  score:71}, bot:{seed:9,  name:'Boise St.',  abbr:'BSU',     delta:'+3.7',  deltaPos:true,  score:65} },
      { label:'G3 · 5v12', prob:'71.3%', winnerTop:true,  top:{seed:5,  name:"St. Mary's", abbr:'St Marys',delta:'+9.1',  deltaPos:true,  score:74}, bot:{seed:12, name:'UAB',        abbr:'UAB',     delta:'+1.2',  deltaPos:true,  score:61} },
      { label:'G4 · 4v13', prob:'81.7%', winnerTop:true,  top:{seed:4,  name:'Purdue',     abbr:'Purdue',  delta:'+14.3', deltaPos:true,  score:78}, bot:{seed:13, name:'Colgate',    abbr:'Colgate', delta:'−3.8',  deltaPos:false, score:59} },
      { label:'G5 · 6v11', prob:'61.8%', winnerTop:true,  top:{seed:6,  name:'Creighton',  abbr:'Creigh',  delta:'+7.3',  deltaPos:true,  score:73}, bot:{seed:11, name:'NC State',   abbr:'NC St',   delta:'+5.1',  deltaPos:true,  score:66} },
      { label:'G6 · 3v14', prob:'88.4%', winnerTop:true,  top:{seed:3,  name:'Baylor',     abbr:'Baylor',  delta:'+18.6', deltaPos:true,  score:80}, bot:{seed:14, name:'UCSB',       abbr:'UCSB',    delta:'−6.2',  deltaPos:false, score:52} },
      { label:'G7 · 7v10', prob:'57.9%', winnerTop:true,  top:{seed:7,  name:'Missouri',   abbr:'Mizzou',  delta:'+6.4',  deltaPos:true,  score:69}, bot:{seed:10, name:'Utah St.',   abbr:'Utah St', delta:'+5.8',  deltaPos:true,  score:62} },
      { label:'G8 · 2v15', prob:'91.2%', winnerTop:true,  top:{seed:2,  name:'Marquette',  abbr:'Marq',    delta:'+21.4', deltaPos:true,  score:76}, bot:{seed:15, name:'Vermont',    abbr:'Vermont', delta:'−5.3',  deltaPos:false, score:55} },
    ],
    r32: [
      { label:'G1 · 1v8', prob:'80.6%', winnerTop:true, top:{seed:1,name:'Duke',     abbr:'Duke',    delta:'+24.8',deltaPos:true, score:75}, bot:{seed:8, name:'Mississippi',abbr:'Ole Miss',delta:'+4.2', deltaPos:true, score:63} },
      { label:'G2 · 4v5', prob:'56.4%', winnerTop:true, top:{seed:4,name:'Purdue',   abbr:'Purdue',  delta:'+14.3',deltaPos:true, score:69}, bot:{seed:5, name:"St. Mary's", abbr:'St Marys',delta:'+9.1', deltaPos:true, score:64} },
      { label:'G3 · 3v6', prob:'66.2%', winnerTop:true, top:{seed:3,name:'Baylor',   abbr:'Baylor',  delta:'+18.6',deltaPos:true, score:74}, bot:{seed:6, name:'Creighton',  abbr:'Creigh',  delta:'+7.3', deltaPos:true, score:67} },
      { label:'G4 · 2v7', prob:'72.1%', winnerTop:true, top:{seed:2,name:'Marquette',abbr:'Marq',    delta:'+21.4',deltaPos:true, score:71}, bot:{seed:7, name:'Missouri',   abbr:'Mizzou',  delta:'+6.4', deltaPos:true, score:65} },
    ],
    s16: [
      { label:'G1 · 1v4', prob:'73.8%', winnerTop:true,  top:{seed:1,name:'Duke',     abbr:'Duke', delta:'+24.8',deltaPos:true,score:80}, bot:{seed:4,name:'Purdue',   abbr:'Purdue',delta:'+14.3',deltaPos:true,score:70} },
      { label:'G2 · 2v3', prob:'57.9%', winnerTop:false, top:{seed:2,name:'Marquette',abbr:'Marq', delta:'+21.4',deltaPos:true,score:73}, bot:{seed:3,name:'Baylor',   abbr:'Baylor',delta:'+18.6',deltaPos:true,score:69} },
    ],
    e8: [{ label:'E8 · 1v2', prob:'61.2%', winnerTop:true, top:{seed:1,name:'Duke',abbr:'Duke',delta:'+24.8',deltaPos:true,score:77}, bot:{seed:2,name:'Marquette',abbr:'Marq',delta:'+21.4',deltaPos:true,score:68} }],
  },
  West: {
    venue: 'San Francisco, CA · Mar 20–23',
    r64: [
      { label:'G1 · 1v16', prob:'92.1%', winnerTop:true,  top:{seed:1,  name:'Kansas',   abbr:'Kansas',  delta:'+23.1',deltaPos:true,  score:80}, bot:{seed:16,name:'SIUE',        abbr:'SIUE',   delta:'−9.2', deltaPos:false,score:58} },
      { label:'G2 · 8v9',  prob:'55.3%', winnerTop:true,  top:{seed:8,  name:'Memphis',  abbr:'Memphis', delta:'+5.1', deltaPos:true,  score:68}, bot:{seed:9, name:'Toledo',      abbr:'Toledo', delta:'+4.6', deltaPos:true, score:64} },
      { label:'G3 · 5v12', prob:'68.4%', winnerTop:true,  top:{seed:5,  name:'Illinois', abbr:'Illini',  delta:'+8.2', deltaPos:true,  score:72}, bot:{seed:12,name:'Akron',       abbr:'Akron',  delta:'+2.1', deltaPos:true, score:60} },
      { label:'G4 · 4v13', prob:'79.2%', winnerTop:true,  top:{seed:4,  name:'Indiana',  abbr:'Indiana', delta:'+13.1',deltaPos:true,  score:76}, bot:{seed:13,name:'Furman',      abbr:'Furman', delta:'−2.4', deltaPos:false,score:58} },
      { label:'G5 · 6v11', prob:'58.6%', winnerTop:false, upset:true, top:{seed:6,name:'Gonzaga',abbr:'Gonzaga',delta:'+6.8',deltaPos:true,score:71}, bot:{seed:11,name:'VCU',abbr:'VCU',delta:'+7.2',deltaPos:true,score:74} },
      { label:'G6 · 3v14', prob:'86.1%', winnerTop:true,  top:{seed:3,  name:'Arizona',  abbr:'Arizona', delta:'+17.7',deltaPos:true,  score:78}, bot:{seed:14,name:'Bradley',     abbr:'Bradley',delta:'−5.8', deltaPos:false,score:54} },
      { label:'G7 · 7v10', prob:'54.2%', winnerTop:true,  top:{seed:7,  name:'Texas A&M',abbr:'TX A&M',  delta:'+5.9', deltaPos:true,  score:67}, bot:{seed:10,name:'W. Virginia', abbr:'WVU',    delta:'+4.8', deltaPos:true, score:63} },
      { label:'G8 · 2v15', prob:'93.4%', winnerTop:true,  top:{seed:2,  name:'UNC',      abbr:'UNC',     delta:'+21.6',deltaPos:true,  score:81}, bot:{seed:15,name:'Fairleigh D.',abbr:'FDU',    delta:'−7.1', deltaPos:false,score:52} },
    ],
    r32: [
      { label:'G1 · 1v8',  prob:'77.4%', winnerTop:true, top:{seed:1,name:'Kansas', abbr:'Kansas', delta:'+23.1',deltaPos:true,score:74}, bot:{seed:8, name:'Memphis', abbr:'Memphis',delta:'+5.1', deltaPos:true,score:62} },
      { label:'G2 · 4v5',  prob:'61.8%', winnerTop:true, top:{seed:4,name:'Indiana',abbr:'Indiana',delta:'+13.1',deltaPos:true,score:71}, bot:{seed:5, name:'Illinois',abbr:'Illini', delta:'+8.2', deltaPos:true,score:66} },
      { label:'G3 · 3v11', prob:'62.4%', winnerTop:true, top:{seed:3,name:'Arizona',abbr:'Arizona',delta:'+17.7',deltaPos:true,score:75}, bot:{seed:11,name:'VCU',     abbr:'VCU',    delta:'+7.2', deltaPos:true,score:68} },
      { label:'G4 · 2v7',  prob:'69.8%', winnerTop:true, top:{seed:2,name:'UNC',    abbr:'UNC',    delta:'+21.6',deltaPos:true,score:73}, bot:{seed:7, name:'Texas A&M',abbr:'TX A&M',delta:'+5.9', deltaPos:true,score:66} },
    ],
    s16: [
      { label:'G1 · 1v4', prob:'70.2%', winnerTop:true, top:{seed:1,name:'Kansas', abbr:'Kansas', delta:'+23.1',deltaPos:true,score:78}, bot:{seed:4,name:'Indiana',abbr:'Indiana',delta:'+13.1',deltaPos:true,score:69} },
      { label:'G2 · 2v3', prob:'54.6%', winnerTop:true, top:{seed:2,name:'UNC',    abbr:'UNC',    delta:'+21.6',deltaPos:true,score:74}, bot:{seed:3,name:'Arizona',abbr:'Arizona',delta:'+17.7',deltaPos:true,score:71} },
    ],
    e8: [{ label:'E8 · 1v2', prob:'58.4%', winnerTop:true, top:{seed:1,name:'Kansas',abbr:'Kansas',delta:'+23.1',deltaPos:true,score:72}, bot:{seed:2,name:'UNC',abbr:'UNC',delta:'+21.6',deltaPos:true,score:68} }],
  },
  South: {
    venue: 'Charlotte, NC · Mar 21–24',
    r64: [
      { label:'G1 · 1v16', prob:'91.8%', winnerTop:true,  top:{seed:1,  name:'Kentucky',  abbr:'UK',   delta:'+20.9', deltaPos:true,  score:83}, bot:{seed:16, name:'Montana St.', abbr:'MT St', delta:'−9.8',  deltaPos:false, score:56} },
      { label:'G2 · 8v9',  prob:'53.4%', winnerTop:false, top:{seed:8,  name:'Oklahoma',  abbr:'OU',   delta:'+4.8',  deltaPos:true,  score:65}, bot:{seed:9,  name:'TCU',         abbr:'TCU',  delta:'+5.3',  deltaPos:true,  score:68} },
      { label:'G3 · 5v12', prob:'74.1%', winnerTop:true,  top:{seed:5,  name:'Ohio St.',  abbr:'OSU',  delta:'+10.2', deltaPos:true,  score:76}, bot:{seed:12, name:'Liberty',      abbr:'Lib',  delta:'+0.8',  deltaPos:true,  score:61} },
      { label:'G4 · 4v13', prob:'83.6%', winnerTop:true,  top:{seed:4,  name:'Wisconsin', abbr:'Wis',  delta:'+15.8', deltaPos:true,  score:79}, bot:{seed:13, name:'Youngstown',   abbr:'YSU',  delta:'−4.1',  deltaPos:false, score:57} },
      { label:'G5 · 6v11', prob:'47.2%', upset:true, winnerTop:false, top:{seed:6, name:'Clemson', abbr:'Clem', delta:'+6.1', deltaPos:true, score:64}, bot:{seed:11, name:'VCU', abbr:'VCU', delta:'+7.4', deltaPos:true, score:67} },
      { label:'G6 · 3v14', prob:'87.3%', winnerTop:true,  top:{seed:3,  name:'Florida',   abbr:'UF',   delta:'+16.3', deltaPos:true,  score:81}, bot:{seed:14, name:'Samford',      abbr:'Sam',  delta:'−5.6',  deltaPos:false, score:53} },
      { label:'G7 · 7v10', prob:'59.2%', winnerTop:true,  top:{seed:7,  name:'Dayton',    abbr:'Day',  delta:'+7.1',  deltaPos:true,  score:70}, bot:{seed:10, name:'BYU',          abbr:'BYU',  delta:'+6.2',  deltaPos:true,  score:65} },
      { label:'G8 · 2v15', prob:'90.4%', winnerTop:true,  top:{seed:2,  name:'Houston',   abbr:'Hou',  delta:'+19.4', deltaPos:true,  score:77}, bot:{seed:15, name:'Longwood',     abbr:'Long', delta:'−6.8',  deltaPos:false, score:55} },
    ],
    r32: [
      { label:'G1 · 1v9',  prob:'76.2%', winnerTop:true, top:{seed:1,name:'Kentucky',abbr:'UK',  delta:'+20.9',deltaPos:true,score:73}, bot:{seed:9, name:'TCU',     abbr:'TCU', delta:'+5.3', deltaPos:true,score:62} },
      { label:'G2 · 4v5',  prob:'58.1%', winnerTop:true, top:{seed:4,name:'Wisconsin',abbr:'Wis', delta:'+15.8',deltaPos:true,score:70}, bot:{seed:5, name:'Ohio St.',abbr:'OSU', delta:'+10.2',deltaPos:true,score:65} },
      { label:'G3 · 3v11', prob:'64.8%', winnerTop:true, top:{seed:3,name:'Florida',  abbr:'UF',  delta:'+16.3',deltaPos:true,score:76}, bot:{seed:11,name:'VCU',     abbr:'VCU', delta:'+7.4', deltaPos:true,score:69} },
      { label:'G4 · 2v7',  prob:'71.4%', winnerTop:true, top:{seed:2,name:'Houston',  abbr:'Hou', delta:'+19.4',deltaPos:true,score:72}, bot:{seed:7, name:'Dayton',  abbr:'Day', delta:'+7.1', deltaPos:true,score:64} },
    ],
    s16: [
      { label:'G1 · 1v4', prob:'68.4%', winnerTop:true, top:{seed:1,name:'Kentucky',abbr:'UK',  delta:'+20.9',deltaPos:true,score:76}, bot:{seed:4,name:'Wisconsin',abbr:'Wis',delta:'+15.8',deltaPos:true,score:69} },
      { label:'G2 · 2v3', prob:'56.2%', winnerTop:true, top:{seed:2,name:'Houston',  abbr:'Hou', delta:'+19.4',deltaPos:true,score:73}, bot:{seed:3,name:'Florida',  abbr:'UF', delta:'+16.3',deltaPos:true,score:68} },
    ],
    e8: [{ label:'E8 · 1v2', prob:'56.8%', winnerTop:true, top:{seed:1,name:'Kentucky',abbr:'UK',delta:'+20.9',deltaPos:true,score:74}, bot:{seed:2,name:'Houston',abbr:'Hou',delta:'+19.4',deltaPos:true,score:70} }],
  },
  Midwest: {
    venue: 'Detroit, MI · Mar 21–24',
    r64: [
      { label:'G1 · 1v16', prob:'93.6%', winnerTop:true,  top:{seed:1,  name:'Northwestern', abbr:'NW',   delta:'+18.2', deltaPos:true,  score:84}, bot:{seed:16, name:'FDU',          abbr:'FDU',  delta:'−10.1', deltaPos:false, score:52} },
      { label:'G2 · 8v9',  prob:'51.8%', winnerTop:true,  top:{seed:8,  name:'Michigan',     abbr:'Mich', delta:'+4.4',  deltaPos:true,  score:70}, bot:{seed:9,  name:'Iowa St.',     abbr:'ISU',  delta:'+4.1',  deltaPos:true,  score:66} },
      { label:'G3 · 5v12', prob:'69.8%', winnerTop:true,  top:{seed:5,  name:'Rutgers',      abbr:'RU',   delta:'+8.9',  deltaPos:true,  score:73}, bot:{seed:12, name:'Vermont',      abbr:'UVM',  delta:'+1.8',  deltaPos:true,  score:62} },
      { label:'G4 · 4v13', prob:'82.4%', winnerTop:true,  top:{seed:4,  name:'Michigan St.', abbr:'MSU',  delta:'+14.9', deltaPos:true,  score:77}, bot:{seed:13, name:'N. Kentucky',  abbr:'NKU',  delta:'−3.2',  deltaPos:false, score:57} },
      { label:'G5 · 6v11', prob:'64.2%', winnerTop:true,  top:{seed:6,  name:"St. John's",   abbr:'SJU',  delta:'+7.8',  deltaPos:true,  score:72}, bot:{seed:11, name:'Drake',        abbr:'Drake',delta:'+5.6',  deltaPos:true,  score:64} },
      { label:'G6 · 3v14', prob:'85.8%', winnerTop:true,  top:{seed:3,  name:'Marquette',    abbr:'MU',   delta:'+17.1', deltaPos:true,  score:79}, bot:{seed:14, name:'Morehead St.', abbr:'More', delta:'−5.9',  deltaPos:false, score:51} },
      { label:'G7 · 7v10', prob:'56.4%', winnerTop:true,  top:{seed:7,  name:'Penn St.',     abbr:'PSU',  delta:'+6.6',  deltaPos:true,  score:68}, bot:{seed:10, name:'Nevada',       abbr:'Nev',  delta:'+5.4',  deltaPos:true,  score:63} },
      { label:'G8 · 2v15', prob:'92.1%', winnerTop:true,  top:{seed:2,  name:'Arizona St.',  abbr:'ASU',  delta:'+20.2', deltaPos:true,  score:80}, bot:{seed:15, name:'Colgate',      abbr:'Colg', delta:'−6.4',  deltaPos:false, score:53} },
    ],
    r32: [
      { label:'G1 · 1v8', prob:'78.6%', winnerTop:true, top:{seed:1,name:'Northwestern',abbr:'NW',  delta:'+18.2',deltaPos:true,score:76}, bot:{seed:8, name:'Michigan',   abbr:'Mich',delta:'+4.4', deltaPos:true,score:64} },
      { label:'G2 · 4v5', prob:'59.4%', winnerTop:true, top:{seed:4,name:'Michigan St.',abbr:'MSU', delta:'+14.9',deltaPos:true,score:72}, bot:{seed:5, name:'Rutgers',    abbr:'RU',  delta:'+8.9', deltaPos:true,score:67} },
      { label:'G3 · 3v6', prob:'67.1%', winnerTop:true, top:{seed:3,name:'Marquette',   abbr:'MU',  delta:'+17.1',deltaPos:true,score:75}, bot:{seed:6, name:"St. John's",abbr:'SJU', delta:'+7.8', deltaPos:true,score:68} },
      { label:'G4 · 2v7', prob:'70.8%', winnerTop:true, top:{seed:2,name:'Arizona St.', abbr:'ASU', delta:'+20.2',deltaPos:true,score:74}, bot:{seed:7, name:'Penn St.',   abbr:'PSU', delta:'+6.6', deltaPos:true,score:66} },
    ],
    s16: [
      { label:'G1 · 1v4', prob:'71.6%', winnerTop:true, top:{seed:1,name:'Northwestern',abbr:'NW',  delta:'+18.2',deltaPos:true,score:79}, bot:{seed:4,name:'Michigan St.',abbr:'MSU',delta:'+14.9',deltaPos:true,score:71} },
      { label:'G2 · 2v3', prob:'55.8%', winnerTop:true, top:{seed:2,name:'Arizona St.', abbr:'ASU', delta:'+20.2',deltaPos:true,score:75}, bot:{seed:3,name:'Marquette',   abbr:'MU', delta:'+17.1',deltaPos:true,score:70} },
    ],
    e8: [{ label:'E8 · 1v2', prob:'59.4%', winnerTop:true, top:{seed:1,name:'Northwestern',abbr:'NW',delta:'+18.2',deltaPos:true,score:76}, bot:{seed:2,name:'Arizona St.',abbr:'ASU',delta:'+20.2',deltaPos:true,score:71} }],
  },
};

const FF_DATA = {
  f4: [
    { label:'FF · East vs West',     prob:'56.2%', winnerTop:true,  top:{seed:1,name:'Duke',        abbr:'Duke',delta:'+24.8',deltaPos:true,score:81}, bot:{seed:1,name:'Kansas',      abbr:'KU', delta:'+23.1',deltaPos:true,score:74} },
    { label:'FF · South vs Midwest', prob:'53.8%', winnerTop:false, top:{seed:1,name:'Kentucky',    abbr:'UK', delta:'+20.9',deltaPos:true,score:72}, bot:{seed:1,name:'Northwestern',abbr:'NW', delta:'+18.2',deltaPos:true,score:75} },
  ],
  championship: { label:'Championship', prob:'54.1%', winnerTop:true, top:{seed:1,name:'Duke',abbr:'Duke',delta:'+24.8',deltaPos:true,score:76}, bot:{seed:1,name:'Northwestern',abbr:'NW',delta:'+18.2',deltaPos:true,score:68} },
  champion: { name:'Duke', abbr:'Duke', seed:1, delta:'+24.8', cmbki:'94.2', score:76, conf:'ACC' },
};

const RANKINGS = [
  { rank:1,  logo:'DUKE', name:'Duke',         conf:'ACC',     seed:1, cmbki:'+24.8', off:'122.4', def:'88.2', sos:'18.4', logoColor:'rgba(220,50,50,0.1)' },
  { rank:2,  logo:'KU',   name:'Kansas',       conf:'Big 12',  seed:1, cmbki:'+23.1', off:'120.8', def:'89.7', sos:'19.2', logoColor:'rgba(74,163,255,0.1)' },
  { rank:3,  logo:'UNC',  name:'N. Carolina',  conf:'ACC',     seed:2, cmbki:'+21.6', off:'119.2', def:'90.4', sos:'17.8', logoColor:'rgba(212,175,55,0.1)' },
  { rank:4,  logo:'UK',   name:'Kentucky',     conf:'SEC',     seed:1, cmbki:'+20.9', off:'118.7', def:'91.0', sos:'18.9', logoColor:'rgba(61,220,132,0.1)' },
  { rank:5,  logo:'UH',   name:'Houston',      conf:'Big 12',  seed:2, cmbki:'+19.4', off:'116.9', def:'87.8', sos:'16.4', logoColor:'rgba(255,140,66,0.1)' },
  { rank:6,  logo:'NW',   name:'Northwestern', conf:'Big Ten', seed:1, cmbki:'+18.2', off:'115.4', def:'89.1', sos:'17.1', logoColor:'rgba(160,120,255,0.1)' },
  { rank:7,  logo:'ARIZ', name:'Arizona',      conf:'Pac-12',  seed:2, cmbki:'+17.7', off:'117.1', def:'92.3', sos:'15.8', logoColor:'rgba(74,163,255,0.1)' },
  { rank:8,  logo:'FLA',  name:'Florida',      conf:'SEC',     seed:3, cmbki:'+16.3', off:'114.8', def:'90.8', sos:'16.0', logoColor:'rgba(255,182,30,0.1)' },
  { rank:9,  logo:'MU',   name:'Marquette',    conf:'Big East',seed:2, cmbki:'+21.4', off:'118.2', def:'88.6', sos:'16.9', logoColor:'rgba(212,175,55,0.1)' },
  { rank:10, logo:'MSU',  name:'Michigan St.', conf:'Big Ten', seed:4, cmbki:'+14.9', off:'113.6', def:'91.4', sos:'16.2', logoColor:'rgba(61,220,132,0.1)' },
];

const GAME_PREDICTIONS = [
  { round:'R64 · East',    date:'Mar 20', upset:false, top:{seed:1,  name:'Duke',     pct:'94.2%'}, bot:{seed:16,name:'Norfolk St.',pct:'5.8%'},  spread:'−18.4', margin:'+22.1', variance:'±6.2', score:'Duke 82 · Norfolk St. 54' },
  { round:'R64 · West',    date:'Mar 20', upset:false, top:{seed:1,  name:'Kansas',   pct:'79.6%'}, bot:{seed:16,name:'SIUE',       pct:'20.4%'}, spread:'−15.2', margin:'+18.3', variance:'±7.1', score:'Kansas 78 · SIUE 60' },
  { round:'R64 · South',   date:'Mar 21', upset:true,  top:{seed:11, name:'VCU',      pct:'53.1%'}, bot:{seed:6, name:'Clemson',    pct:'46.9%'}, spread:'+2.1',  margin:'+2.8',  variance:'±9.4', score:'VCU 68 · Clemson 65' },
  { round:'R64 · Midwest', date:'Mar 21', upset:false, top:{seed:2,  name:'Houston',  pct:'76.8%'}, bot:{seed:15,name:'Longwood',   pct:'23.2%'}, spread:'−13.8', margin:'+16.4', variance:'±7.8', score:'Houston 74 · Longwood 58' },
  { round:'R64 · East',    date:'Mar 20', upset:false, top:{seed:2,  name:'Marquette',pct:'91.2%'}, bot:{seed:15,name:'Vermont',    pct:'8.8%'},  spread:'−16.8', margin:'+20.2', variance:'±6.8', score:'Marquette 76 · Vermont 55' },
  { round:'R64 · West',    date:'Mar 20', upset:false, top:{seed:2,  name:'UNC',      pct:'93.4%'}, bot:{seed:15,name:'Fairleigh D.',pct:'6.6%'}, spread:'−17.4', margin:'+21.1', variance:'±6.1', score:'UNC 81 · Fairleigh D. 52' },
];

const ODDS = [
  { rank:1,logo:'DUKE',name:'Duke',        conf:'ACC · Seed 1',     logoColor:'rgba(220,50,50,0.1)',   r32:'96.2%',s16:'84.1%',e8:'68.4%',f4:'52.1%',final:'38.4%',champ:'28.6%',bar:100 },
  { rank:2,logo:'KU',  name:'Kansas',      conf:'Big 12 · Seed 1',  logoColor:'rgba(74,163,255,0.1)',  r32:'94.8%',s16:'80.2%',e8:'62.1%',f4:'44.8%',final:'30.2%',champ:'21.2%',bar:74  },
  { rank:3,logo:'UNC', name:'N. Carolina', conf:'ACC · Seed 2',     logoColor:'rgba(212,175,55,0.1)',  r32:'91.4%',s16:'74.6%',e8:'54.8%',f4:'38.2%',final:'24.1%',champ:'15.8%',bar:55  },
  { rank:4,logo:'UK',  name:'Kentucky',    conf:'SEC · Seed 1',     logoColor:'rgba(61,220,132,0.1)',  r32:'93.1%',s16:'76.8%',e8:'58.2%',f4:'40.6%',final:'26.8%',champ:'17.2%',bar:60  },
  { rank:5,logo:'UH',  name:'Houston',     conf:'Big 12 · Seed 2',  logoColor:'rgba(255,140,66,0.1)',  r32:'88.6%',s16:'68.4%',e8:'48.2%',f4:'32.4%',final:'18.6%',champ:'11.4%',bar:40  },
  { rank:6,logo:'NW',  name:'Northwestern',conf:'Big Ten · Seed 1', logoColor:'rgba(160,120,255,0.1)', r32:'90.2%',s16:'72.1%',e8:'54.6%',f4:'38.8%',final:'22.4%',champ:'13.6%',bar:48  },
  { rank:7,logo:'MU',  name:'Marquette',   conf:'Big East · Seed 2',logoColor:'rgba(212,175,55,0.1)',  r32:'92.4%',s16:'77.8%',e8:'60.4%',f4:'42.6%',final:'28.8%',champ:'19.4%',bar:68  },
  { rank:8,logo:'ARIZ',name:'Arizona',     conf:'Pac-12 · Seed 2',  logoColor:'rgba(74,163,255,0.1)',  r32:'87.4%',s16:'66.2%',e8:'46.8%',f4:'30.1%',final:'17.2%',champ:'10.1%',bar:35  },
];

/* ══════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════ */

function GameCard({ game, elite=false, fullName=false, T }: { game: Game; elite?: boolean; fullName?: boolean; T: any }) {
  const teams = [{t:game.top,win:game.winnerTop},{t:game.bot,win:!game.winnerTop}];
  return (
    <div style={{ background:elite ? T.cardElite : T.surface, border:`1px solid ${elite ? T.goldBorder : T.border}`, borderRadius:8, overflow:'hidden', width:'100%' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'5px 10px', borderBottom:`1px solid ${T.border2}`, background: T.isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.02)' }}>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'1px', color:T.textMuted, textTransform:'uppercase' }}>{game.label}</span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:elite ? T.gold : T.blue }}>{game.prob}</span>
      </div>
      {teams.map(({t,win},i) => (
        <div key={i}>
          {i===1 && <div style={{ height:1, background:T.border2 }} />}
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 10px', background:win ? T.winnerBg : 'transparent' }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:T.accent, width:14, textAlign:'right', flexShrink:0 }}>{t.seed}</span>
            <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:fullName?15:13, fontWeight:700, flex:1, color:win ? T.text : T.textMuted, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{fullName ? t.name : t.abbr}</span>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, width:38, textAlign:'right', flexShrink:0, color:t.deltaPos ? T.accent : T.textMuted }}>{t.delta}</span>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, width:22, textAlign:'right', flexShrink:0, color:win ? T.text : T.textMuted }}>{t.score}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChampionCard({ c, T }: { c: typeof FF_DATA.champion; T: any }) {
  return (
    <div style={{ background:`linear-gradient(145deg,${T.goldSub.replace('0.07','0.18')} 0%,${T.goldSub} 100%)`, border:`1.5px solid ${T.goldBorder}`, borderRadius:10, textAlign:'center', padding:'18px 20px', position:'relative', margin:'0 64px' }}>
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 50% 0%,${T.goldSub.replace('0.07','0.14')} 0%,transparent 70%)`, pointerEvents:'none' }} />
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:'2.5px', color:T.gold, textTransform:'uppercase', marginBottom:8 }}>National Champion</div>
      <div style={{ fontSize:28, lineHeight:1, marginBottom:8 }}>🏆</div>
      <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:32, letterSpacing:'2px', textTransform:'uppercase', marginBottom:4, color: T.isDark ? '#F5D67A' : '#7A4E00' }}>{c.name}</div>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:T.gold, opacity:0.7, letterSpacing:'1.5px', marginBottom:12 }}>SEED #{c.seed} · {c.conf}</div>
      <div style={{ display:'flex', justifyContent:'center', gap:20, borderTop:`1px solid ${T.goldBorder}`, paddingTop:12 }}>
        {[['CMBKi+', c.cmbki, T.accent],['Score', String(c.score), T.gold]].map(([label, val, color]) => (
          <div key={label}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:T.textMuted, textTransform:'uppercase', letterSpacing:'1px', marginBottom:3 }}>{label}</div>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:20, color }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoundPill({ label, elite, T }: { label: string; elite?: boolean; T: any }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, margin:'20px 0 10px' }}>
      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'1.5px', textTransform:'uppercase', padding:'5px 14px', borderRadius:20, whiteSpace:'nowrap', border:elite ? `1px solid ${T.goldBorder}` : `1px solid ${T.accentBorder}`, background:elite ? T.goldSub : T.accentSub, color:elite ? T.gold : T.accent, fontWeight:600 }}>{label}</span>
      <div style={{ flex:1, height:1, background:elite ? T.goldBorder : T.accentBorder }} />
    </div>
  );
}

function MobileBracket({ region, T }: { region: Region; T: any }) {

  const d = data[region];
  const s = { padding:'0 64px' };
  return (
    <div>
      <div style={s}><RoundPill label="Round of 64" T={T} /></div>
      <div style={{ display:'flex', flexDirection:'column', gap:8, ...s }}>{d.r64.map((g,i)=><GameCard key={i} game={g} fullName T={T} />)}</div>
      <div style={s}><RoundPill label="Round of 32" T={T} /></div>
      <div style={{ display:'flex', flexDirection:'column', gap:8, ...s }}>{d.r32.map((g,i)=><GameCard key={i} game={g} fullName T={T} />)}</div>
      <div style={s}><RoundPill label="Sweet 16" T={T} /></div>
      <div style={{ display:'flex', flexDirection:'column', gap:8, ...s }}>{d.s16.map((g,i)=><GameCard key={i} game={g} fullName T={T} />)}</div>
      <div style={s}><RoundPill label="Elite 8" elite T={T} /></div>
      <div style={{ display:'flex', flexDirection:'column', gap:8, ...s }}>
        {d.e8.map((g,i)=><GameCard key={i} game={g} elite fullName T={T} />)}
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:'2.5px', color:T.gold, textTransform:'uppercase', textAlign:'center', paddingTop:6 }}>Regional Champion</div>
      </div>
    </div>
  );
}

const CARD_W    = 172;
const CONN_W    = 18;
const ROW_H     = 68;
const NATURAL_W = CARD_W * 7 + CONN_W * 6;

function BracketConnector({ slots, mirrored, totalH, T }: { slots:number; mirrored:boolean; totalH:number; T: any }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current; if (!svg) return;
    const draw = () => {
      svg.innerHTML = '';
      const w = CONN_W; const h = totalH;
      const mk = (d: string) => { const p = document.createElementNS('http://www.w3.org/2000/svg','path'); p.setAttribute('d',d); p.setAttribute('fill','none'); p.setAttribute('stroke',T.connStroke); p.setAttribute('stroke-width','1'); p.setAttribute('stroke-linecap','round'); svg.appendChild(p); };
      if (slots===1) { mk(`M 0 ${h/2} H ${w}`); return; }
      const sH = h/slots;
      for(let i=0;i<slots/2;i++){
        const ty=sH*(i*2)+sH/2, by=sH*(i*2+1)+sH/2, my=(ty+by)/2;
        mk(mirrored ? `M ${w} ${ty} H ${w*.38} V ${my} M ${w} ${by} H ${w*.38} V ${my} M ${w*.38} ${my} H 0` : `M 0 ${ty} H ${w*.62} V ${my} M 0 ${by} H ${w*.62} V ${my} M ${w*.62} ${my} H ${w}`);
      }
    };
    draw();
  }, [slots, mirrored, T.connStroke]);
  return <svg ref={ref} width={CONN_W} height={totalH} style={{ flexShrink:0 }} />;
}

function col(games: Game[], label: string, flex: number[], totalH: number, T: any, elite?: boolean) {
  return (
    <div style={{ width:CARD_W, flexShrink:0, display:'flex', flexDirection:'column', height:totalH+28 }}>
      <div style={{ height:28, display:'flex', alignItems:'flex-end', justifyContent:'center', paddingBottom:5 }}>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:'1.5px', color:elite ? T.gold : T.textMuted, textTransform:'uppercase' }}>{label}</span>
      </div>
      <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
        {games.map((g,i) => (
          <div key={i} style={{ flex:flex[i], display:'flex', alignItems:'center', padding:'2px 0' }}>
            <GameCard game={g} elite={elite} T={T} />
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopBracket({ region, scale, T }: { region: Region; scale: number; T: any }) {
  const d = data[region];
  const totalH = ROW_H * 8;
  return (
    <div style={{ transformOrigin:'top left', transform:`scale(${scale})`, width:NATURAL_W, height:(totalH+28) }}>
      <div style={{ display:'flex', alignItems:'flex-start', width:NATURAL_W }}>
        {col(d.r64.slice(0,4),'Round of 64',[1,1,1,1],totalH, T)}
        <BracketConnector slots={4} mirrored={false} totalH={totalH} T={T} />
        {col(d.r32.slice(0,2),'Round of 32',[2,2],totalH, T)}
        <BracketConnector slots={2} mirrored={false} totalH={totalH} T={T} />
        {col([d.s16[0]],'Sweet 16',[4],totalH, T)}
        <BracketConnector slots={1} mirrored={false} totalH={totalH} T={T} />
        <div style={{ width:CARD_W, flexShrink:0, display:'flex', flexDirection:'column', height:totalH+28 }}>
          <div style={{ height:28, display:'flex', alignItems:'flex-end', justifyContent:'center', paddingBottom:5 }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:'1.5px', color:T.gold, textTransform:'uppercase' }}>Elite 8</span>
          </div>
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8 }}>
            <div style={{ width:'100%' }}><GameCard game={d.e8[0]} elite T={T} /></div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:'1.5px', color:T.gold, textTransform:'uppercase' }}>Regional Champion</div>
          </div>
        </div>
        <BracketConnector slots={1} mirrored={true} totalH={totalH} T={T} />
        {col([d.s16[1]],'Sweet 16',[4],totalH, T, true)}
        <BracketConnector slots={2} mirrored={true} totalH={totalH} T={T} />
        {col(d.r32.slice(2,4),'Round of 32',[2,2],totalH, T)}
        <BracketConnector slots={4} mirrored={true} totalH={totalH} T={T} />
        {col(d.r64.slice(4,8),'Round of 64',[1,1,1,1],totalH, T)}
      </div>
    </div>
  );
}

function ScaledBracket({ region, T }: { region: Region; T: any }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => { if (wrapRef.current) setScale(Math.min(1, wrapRef.current.getBoundingClientRect().width / NATURAL_W)); };
    update();
    const ro = new ResizeObserver(update);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={wrapRef} style={{ width:'100%', overflow:'hidden', height:(ROW_H*8+28)*scale }}>
      <DesktopBracket region={region} scale={scale} T={T} />
    </div>
  );
}

function FinalFourSection({ isMobile, T }: { isMobile: boolean; T: any }) {
  return (
    <div style={{ marginBottom:isMobile?48:60 }}>
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24, paddingBottom:14, borderBottom:`1px solid ${T.goldBorder}` }}>
        <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:18, letterSpacing:'2px', textTransform:'uppercase', color: T.isDark ? '#F5D67A' : T.gold }}>Final Four &amp; Championship</span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:T.textMuted, letterSpacing:'1.5px', textTransform:'uppercase' }}>Glendale, AZ · Apr 5–7</span>
      </div>
      {isMobile ? (
        <div>
          <div style={{ padding:'0 64px' }}><RoundPill label="Final Four" elite T={T} /></div>
          <div style={{ display:'flex', flexDirection:'column', gap:8, padding:'0 64px' }}>{FF_DATA.f4.map((g,i)=><GameCard key={i} game={g} elite fullName T={T} />)}</div>
          <div style={{ padding:'0 64px' }}><RoundPill label="Championship" elite T={T} /></div>
          <div style={{ display:'flex', flexDirection:'column', gap:8, padding:'0 64px' }}><GameCard game={FF_DATA.championship} elite fullName T={T} /></div>
          <div style={{ marginTop:24 }}><ChampionCard c={FF_DATA.champion} T={T} /></div>
        </div>
      ) : (
        <div style={{ display:'flex', alignItems:'center', gap:0 }}>
          <div style={{ flexShrink:0, display:'flex', flexDirection:'column', gap:10, width:CARD_W }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:'1.5px', color:T.gold, textTransform:'uppercase', marginBottom:2 }}>Final Four</div>
            <GameCard game={FF_DATA.f4[0]} elite T={T} />
            <GameCard game={FF_DATA.f4[1]} elite T={T} />
          </div>
          {(() => {
            const cH=68, gap=10, total=cH*2+gap, mid=total/2, y1=cH/2, y2=cH+gap+cH/2, w=32;
            return (
              <svg width={w} height={total} style={{ flexShrink:0 }}>
                <path d={`M 0 ${y1} H ${w*.5} V ${mid} M 0 ${y2} H ${w*.5} V ${mid} M ${w*.5} ${mid} H ${w}`} fill="none" stroke={T.connStroke} strokeWidth="1" strokeLinecap="round"/>
              </svg>
            );
          })()}
          <div style={{ flexShrink:0, width:CARD_W+20, alignSelf:'center' }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:'1.5px', color:T.gold, textTransform:'uppercase', marginBottom:6 }}>Championship</div>
            <GameCard game={FF_DATA.championship} elite T={T} />
          </div>
          <div style={{ width:32, flexShrink:0 }} />
          <div style={{ width:196, flexShrink:0, position:'relative', borderRadius:10, background:`linear-gradient(145deg,${T.goldSub.replace('0.07','0.18')} 0%,${T.goldSub} 100%)`, border:`1.5px solid ${T.goldBorder}`, padding:'16px', textAlign:'center', alignSelf:'center' }}>
            <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 50% 0%,${T.goldSub.replace('0.07','0.14')} 0%,transparent 70%)`, pointerEvents:'none', borderRadius:10 }} />
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:'2px', color:T.gold, textTransform:'uppercase', marginBottom:8 }}>National Champion</div>
            <div style={{ fontSize:26, lineHeight:1, marginBottom:8 }}>🏆</div>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:26, letterSpacing:'2px', textTransform:'uppercase', marginBottom:4, color: T.isDark ? '#F5D67A' : '#7A4E00' }}>{FF_DATA.champion.name}</div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:T.gold, opacity:0.7, letterSpacing:'1.5px', marginBottom:12 }}>SEED #{FF_DATA.champion.seed} · {FF_DATA.champion.conf}</div>
            <div style={{ display:'flex', justifyContent:'center', gap:20, borderTop:`1px solid ${T.goldBorder}`, paddingTop:10 }}>
              {[['CMBKi+', FF_DATA.champion.cmbki, T.accent],['Score', String(FF_DATA.champion.score), T.gold]].map(([label,val,color])=>(
                <div key={String(label)}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:T.textMuted, textTransform:'uppercase', letterSpacing:'1px', marginBottom:3 }}>{label}</div>
                  <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:18, color: color as string }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex:1, minWidth:0, marginLeft:32, alignSelf:'stretch', display:'flex', flexDirection:'column', justifyContent:'center', borderLeft:`1px solid ${T.border}`, paddingLeft:32 }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'2px', color:T.textMuted, textTransform:'uppercase', marginBottom:16 }}>Tournament At-a-Glance</div>
            {[{label:'Avg Win Margin',value:'+14.2',color:T.blue},{label:'Upsets Called',value:'4 / 8',color:T.accent},{label:'Chalk Picks',value:'63 / 67',color:T.blue},{label:'Model Conf.',value:'74.1%',color:T.gold}].map(({label,value,color})=>(
              <div key={label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:`1px solid ${T.border2}` }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:T.textMuted, letterSpacing:'1px', textTransform:'uppercase' }}>{label}</span>
                <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:18, color }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RegionBlock({ region, isMobile, T }: { region: Region; isMobile: boolean; T: any }) {
  const d = data[region];
  return (
    <div style={{ marginBottom:isMobile?48:60 }}>
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:18, paddingBottom:14, borderBottom:`1px solid ${T.border}` }}>
        <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:18, letterSpacing:'2px', textTransform:'uppercase', color:T.text }}>{region} Regional</span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:T.textMuted, letterSpacing:'1.5px', textTransform:'uppercase' }}>{d.venue}</span>
      </div>
      {isMobile ? <MobileBracket region={region} T={T} /> : <ScaledBracket region={region} T={T} />}
    </div>
  );
}

function SectionHeader({ num, title, T }: { num: string; title: string; T: any }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:28 }}>
      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:T.accent, letterSpacing:'2px', background:T.accentSub, border:`1px solid ${T.accentBorder}`, padding:'4px 10px', borderRadius:6 }}>{num}</span>
      <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:20, letterSpacing:'1.5px', textTransform:'uppercase', color:T.text }}>{title}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function MarchMadnessPage() {
  const [section, setSection] = useState<'bracket'|'rankings'|'predictions'|'odds'>('bracket');
  const [isMobile, setIsMobile] = useState(false);

  // ALL hooks must be called before any early returns (Rules of Hooks)
  const { themeObj } = useTheme();
  const T = themeObj;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ background:T.bg, color:T.text, minHeight:'100vh', fontFamily:"'DM Sans',sans-serif", transition:'background .25s, color .25s' }}>
        <NavBar active="march-madness" />

        {/* HERO — always dark */}
        <div style={{ position:'relative', overflow:'hidden', background:'linear-gradient(145deg,#0a0e1a 0%,#140820 45%,#0c1a14 100%)', padding:isMobile?'48px 20px 40px':'72px 40px 56px', borderBottom:'1px solid rgba(255,140,66,0.15)' }}>
          <div style={{ position:'absolute', right:'-40px', top:'-40px', fontSize:isMobile?200:400, opacity:0.04, transform:'rotate(15deg)', pointerEvents:'none', lineHeight:1 }}>🏀</div>
          <div style={{ position:'absolute', bottom:'-100px', right:'10%', width:600, height:400, background:'radial-gradient(ellipse,rgba(255,100,0,0.12) 0%,transparent 65%)', pointerEvents:'none' }} />
          <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,140,66,0.1)', border:'1px solid rgba(255,140,66,0.25)', color:'#FF8C42', fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:'2px', textTransform:'uppercase', padding:'5px 14px', borderRadius:20, marginBottom:20 }}>
              <span style={{ width:6, height:6, background:'#FF8C42', borderRadius:'50%', display:'inline-block', animation:'pulse 2s infinite' }} />
              CMBKi+ Model · 2026 NCAA Tournament
            </div>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:isMobile?'clamp(48px,12vw,72px)':'clamp(64px,8vw,96px)', lineHeight:0.9, letterSpacing:'2px', textTransform:'uppercase', marginBottom:20 }}>
              <div style={{ color:'#F5F7FA' }}>MARCH</div>
              <div style={{ background:'linear-gradient(90deg,#FF8C42,#FF4444)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>MADNESS</div>
            </div>
            <p style={{ color:'#B8C4D4', fontSize:15, lineHeight:1.75, maxWidth:560, marginBottom:36 }}>
              The <span style={{ color:'#FF8C42', fontWeight:600 }}>CMBKi+</span> efficiency index combines tempo-free efficiency, strength of schedule, talent composite, and momentum to rank all 68 tournament teams.
            </p>
            <div style={{ display:'flex', gap:isMobile?24:40, flexWrap:'wrap' }}>
              {[['68','Teams'],['67','Games'],['CMBKi+','Model'],["'26",'Tournament']].map(([v,l])=>(
                <div key={l}>
                  <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:28, color:'#FF8C42', letterSpacing:1 }}>{v}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'#5A6480', textTransform:'uppercase', letterSpacing:'1.5px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION NAV */}
        <div style={{ background:T.navBg, borderBottom:`1px solid ${T.borderStrong}`, position:'sticky', top:64, zIndex:90, overflowX:'auto', boxShadow: T.isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', padding:isMobile?'0 16px':'0 40px' }}>
            {([['bracket','Bracket'],['rankings','Power Rankings'],['predictions','Predictions'],['odds','Champ Odds']] as const).map(([k,label])=>(
              <button key={k} onClick={()=>setSection(k)} style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:600, fontSize:isMobile?11:13, letterSpacing:'1.5px', textTransform:'uppercase', padding:isMobile?'12px 10px':'14px 20px', color:section===k ? T.accent : T.textMuted, cursor:'pointer', border:'none', background:'transparent', borderBottom:section===k ? `2px solid ${T.accent}` : '2px solid transparent', marginBottom:-1, whiteSpace:'nowrap', transition:'color .2s' }}>{label}</button>
            ))}
          </div>
        </div>

        <div style={{ maxWidth:1280, margin:'0 auto', padding:isMobile?'32px 16px 80px':'40px 40px 80px' }}>

          {section==='bracket' && (
            <div>
              <SectionHeader num="01" title="CMBKi+ Chalk Bracket — 2026 NCAA Tournament" T={T} />
              {REGIONS.map(r=><RegionBlock key={r} region={r} isMobile={isMobile} T={T} />)}
              <FinalFourSection isMobile={isMobile} T={T} />
            </div>
          )}

          {section==='rankings' && (
            <div>
              <SectionHeader num="02" title="CMBKi+ Power Rankings — All 68 Teams" T={T} />
              <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, overflow:'hidden' }}>
                <div style={{ display:'grid', gridTemplateColumns:isMobile?'40px 1fr 64px 64px':'44px 40px 1fr 64px 80px 80px 80px 64px', padding:'10px 16px', borderBottom:`1px solid ${T.border}`, background:T.surface2 }}>
                  {(isMobile?['#','Team','CMBKi+','Seed']:['#','','Team','Seed','CMBKi+','Off Eff','Def Eff','SOS']).map((h,i)=>(
                    <span key={i} style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:T.textMuted, textTransform:'uppercase', letterSpacing:'1.5px', textAlign:i<=2?'left':'right' }}>{h}</span>
                  ))}
                </div>
                {RANKINGS.map((t,i)=>(
                  <div key={i} style={{ display:'grid', gridTemplateColumns:isMobile?'40px 1fr 64px 64px':'44px 40px 1fr 64px 80px 80px 80px 64px', padding:'10px 16px', borderBottom:`1px solid ${T.border2}`, alignItems:'center', borderLeft:i<3?`3px solid ${T.accent}`:'3px solid transparent' }}>
                    <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:18, color:T.text }}>{t.rank}</span>
                    {!isMobile && <div style={{ width:28,height:28,borderRadius:'50%',background:t.logoColor,border:`1px solid ${T.border}`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:8,color:T.textMuted }}>{t.logo}</div>}
                    <div>
                      <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:600, fontSize:13, letterSpacing:'0.8px', textTransform:'uppercase', color:T.text }}>{t.name}</div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:T.textMuted }}>{t.conf}</div>
                    </div>
                    <span style={{ textAlign:'right' }}><span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, padding:'2px 5px', borderRadius:4, background:T.accentSub, color:T.accent, border:`1px solid ${T.accentBorder}` }}>{t.seed}</span></span>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:T.accent, textAlign:'right' }}>{t.cmbki}</span>
                    {!isMobile && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:T.blue, textAlign:'right' }}>{t.off}</span>}
                    {!isMobile && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:T.textSub, textAlign:'right' }}>{t.def}</span>}
                    {!isMobile && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:T.textSub, textAlign:'right' }}>{t.sos}</span>}
                  </div>
                ))}
                <div style={{ textAlign:'center', padding:'14px 0', fontFamily:"'DM Mono',monospace", fontSize:9, color:T.textMuted, letterSpacing:'1.5px' }}>SHOWING 10 OF 68 TEAMS</div>
              </div>
            </div>
          )}

          {section==='predictions' && (
            <div>
              <SectionHeader num="03" title="Game-by-Game Predictions" T={T} />
              <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(auto-fill,minmax(340px,1fr))', gap:14 }}>
                {GAME_PREDICTIONS.map((g,i)=>(
                  <div key={i} style={{ background:T.surface, border:`1px solid ${g.upset ? T.red+'55' : T.border}`, borderRadius:12, overflow:'hidden' }}>
                    <div style={{ background:g.upset ? (T.isDark?'rgba(255,68,68,0.06)':'rgba(192,57,43,0.05)') : T.surface2, padding:'8px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:`1px solid ${T.border2}` }}>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:T.textMuted, letterSpacing:'1.5px', textTransform:'uppercase' }}>{g.round}</span>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:g.upset?T.red:T.accent }}>{g.upset?'⚡ UPSET ALERT':g.date}</span>
                    </div>
                    <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:10 }}>
                      {[g.top,g.bot].map((t,ti)=>(
                        <div key={ti} style={{ display:'flex', alignItems:'center', gap:12 }}>
                          <div style={{ width:22,height:22,borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'DM Mono',monospace",fontSize:9,fontWeight:700,flexShrink:0,background:ti===0?(g.upset?T.isDark?'rgba(255,68,68,0.12)':'rgba(192,57,43,0.1)':T.accentSub):(T.isDark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.04)'),color:ti===0?(g.upset?T.red:T.accent):T.textMuted,border:`1px solid ${ti===0?(g.upset?T.red+'55':T.accentBorder):T.border}` }}>{t.seed}</div>
                          <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:600, fontSize:14, letterSpacing:'0.8px', textTransform:'uppercase', flex:1, color:ti===0?T.text:T.textMuted }}>{t.name}</span>
                          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:700, color:ti===0?(g.upset?T.red:T.accent):T.textMuted }}>{t.pct}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding:'0 16px 10px' }}>
                      <div style={{ height:3, background:T.barTrack, borderRadius:2, overflow:'hidden' }}>
                        <div style={{ height:'100%', width:g.top.pct, background:g.upset?`linear-gradient(90deg,${T.red},${T.red}aa)`:`linear-gradient(90deg,${T.accent},${T.red})`, borderRadius:2 }} />
                      </div>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', padding:'10px 16px', gap:8, borderTop:`1px solid ${T.border2}` }}>
                      {[['Spread',g.spread,true],['Margin',g.margin,false],['Variance',g.variance,false]].map(([l,v,hi])=>(
                        <div key={String(l)} style={{ textAlign:'center' }}>
                          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:8, color:T.textMuted, textTransform:'uppercase', letterSpacing:'1px', marginBottom:3 }}>{l}</div>
                          <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:15, color:hi?T.accent:T.textSub }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding:'10px 16px', background:T.accentSub, borderTop:`1px solid ${T.accentBorder}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:T.textMuted, letterSpacing:'1.5px', textTransform:'uppercase' }}>Score Pick</span>
                      <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:15, color:g.upset?T.red:T.accent, letterSpacing:'1px' }}>{g.score}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign:'center', paddingTop:20, fontFamily:"'DM Mono',monospace", fontSize:9, color:T.textMuted, letterSpacing:'1.5px' }}>SHOWING 6 OF 67 GAMES</div>
            </div>
          )}

          {section==='odds' && (
            <div>
              <SectionHeader num="04" title="Advancement Odds — Every Round to Champion" T={T} />
              <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, overflow:'hidden' }}>
                <div style={{ display:'grid', gridTemplateColumns:isMobile?'36px 1fr 80px 70px':'44px 1fr 70px 70px 70px 70px 70px 90px', background:T.surface2, borderBottom:`1px solid ${T.border}`, padding:'10px 16px' }}>
                  {(isMobile?['#','Team','F4','Champion']:['#','Team','R32','S16','E8','F4','Final','Champion']).map((h,i)=>(
                    <span key={i} style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:T.textMuted, textTransform:'uppercase', letterSpacing:'1.5px', textAlign:i<=1?'left':'right' }}>{h}</span>
                  ))}
                </div>
                {ODDS.map((t,i)=>(
                  <div key={i} style={{ display:'grid', gridTemplateColumns:isMobile?'36px 1fr 80px 70px':'44px 1fr 70px 70px 70px 70px 70px 90px', padding:'10px 16px', borderBottom:`1px solid ${T.border2}`, alignItems:'center' }}>
                    <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:16, color:T.textMuted }}>{t.rank}</span>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:28,height:28,borderRadius:'50%',background:t.logoColor,border:`1px solid ${T.border}`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:8,color:T.textMuted,flexShrink:0 }}>{t.logo}</div>
                      <div>
                        <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:600, fontSize:13, letterSpacing:'0.8px', textTransform:'uppercase', color:T.text }}>{t.name}</div>
                        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:T.textMuted }}>{t.conf}</div>
                      </div>
                    </div>
                    {!isMobile && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:T.blue, textAlign:'right' }}>{t.r32}</span>}
                    {!isMobile && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:T.blue, textAlign:'right' }}>{t.s16}</span>}
                    {!isMobile && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:T.blue, textAlign:'right' }}>{t.e8}</span>}
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:T.blue, textAlign:'right' }}>{t.f4}</span>
                    {!isMobile && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:T.accent, textAlign:'right' }}>{t.final}</span>}
                    <div style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'flex-end' }}>
                      <div style={{ width:48, height:4, background:T.barTrack, borderRadius:2, overflow:'hidden', flexShrink:0 }}>
                        <div style={{ height:'100%', width:`${t.bar}%`, background:`linear-gradient(90deg,${T.accent},${T.red})`, borderRadius:2 }} />
                      </div>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:T.accent, minWidth:36, textAlign:'right' }}>{t.champ}</span>
                    </div>
                  </div>
                ))}
                <div style={{ textAlign:'center', padding:'14px 0', fontFamily:"'DM Mono',monospace", fontSize:9, color:T.textMuted, letterSpacing:'1.5px' }}>SHOWING 8 OF 68 TEAMS</div>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div style={{ borderTop:`1px solid ${T.border}`, padding:isMobile?'24px 20px':'28px 40px' }}>
          <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:17, color:T.textMuted, letterSpacing:'1.5px', textTransform:'uppercase' }}>CFBPredictor<span style={{ color:T.gold }}>.com</span></div>
            <p style={{ fontSize:11, color:T.textMuted, maxWidth:580, lineHeight:1.6 }}>CMBKi+ predictions are model-generated projections. Not intended as betting advice.</p>
          </div>
        </div>

        <style>{`
          @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
          button:hover{opacity:.85;}
        `}</style>
      </div>
  );
}