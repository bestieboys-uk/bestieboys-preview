import { createWorld } from './world3d.js';
import { initUI } from './ui.js';
import { load, save, resetAll } from './save.js';
import { getCharacter } from './characters.js';
import { initAudio, resumeAudio, SFX, setMuted } from './audio.js';

const canvas=document.getElementById('game'), world=createWorld(canvas);
let data=load();data.bestStage=Math.max(1,data.bestStage||1);data.currentStage=Math.max(1,Math.min(3,data.currentStage||1));setMuted(!!data.muted);
let state='menu',run=null,last=performance.now(),displayTime=0,dragId=null,dragX=0;
const BOSS=['ROTTWEILER','PIT BULL','XL BULLY'];
const STAGES=[
 {boss:'rottweiler',bossAt:63,events:[[2,'wall'],[10,'wave','staffy',7,'rows'],[16,'blocker',0,130],[24,'choice','x2','DAMAGE'],[31,'wave','boxer',9,'columns'],[39,'blocker',-2.4,190],[45,'wall'],[52,'wave','doberman',10,'lanes']]},
 {boss:'pitbull',bossAt:72,events:[[2,'wall'],[9,'wave','bulldog',10,'block'],[16,'blocker',2.1,240],[25,'choice','+5','FIRE RATE'],[33,'wave','shepherd',12,'rows'],[42,'blocker',-2,310],[50,'wall'],[58,'wave','staffy',17,'lanes']]},
 {boss:'xlbully',bossAt:80,events:[[2,'wall'],[9,'wave','mastiff',11,'columns'],[17,'blocker',0,360],[27,'choice','x2','SPREAD'],[35,'wave','rottweiler',13,'block'],[45,'blocker',2.1,460],[53,'wall'],[61,'wave','pitbull',16,'rows'],[71,'wave','xlbully',7,'lanes']]}
];
const damageLayer=document.getElementById('damage-layer'),damageSlots=[];
for(let i=0;i<10;i++){const e=document.createElement('span');e.className='float-dmg';damageLayer.appendChild(e);damageSlots.push({el:e,until:0});}
function showDamage(x,y,z,value,crit=false){const slot=damageSlots.find(s=>s.until<performance.now())||damageSlots.reduce((a,b)=>a.until<b.until?a:b);const p=world.project(x,y,z);if(!p.visible)return;slot.el.textContent=(crit?'✦ ':'')+Math.round(value);slot.el.style.left=p.x+'px';slot.el.style.top=p.y+'px';slot.el.classList.toggle('crit',crit);slot.el.classList.remove('pop');void slot.el.offsetWidth;slot.el.classList.add('pop');slot.until=performance.now()+450;}
function resize(){world.resize(innerWidth,innerHeight);}addEventListener('resize',resize);addEventListener('orientationchange',()=>setTimeout(resize,120));resize();
function refresh(){ui.refreshMenuStats(data);}
function buy(id,cost){if(data.currency<cost)return;data.meta[id]=(data.meta[id]||0)+1;data.currency-=cost;save(data);ui.renderShop(data,buy);refresh();}
function select(id){data.selectedCharacter=id;save(data);world.reset(id);ui.renderChars(data,select);refresh();}
function backMenu(){state='menu';run=null;ui.hideAllModals();ui.showMenu();canvas.classList.remove('playing');refresh();}
const ui=initUI({
 onPlay:()=>start(run&&['complete','failed'].includes(state)?run.stage:data.currentStage),onNext:()=>start(run?.stage===3?1:data.currentStage),
 onPause(){if(state==='playing'){state='paused';ui.showPause();}},
 onResume(){if(state==='paused'){state='playing';ui.hidePause();last=performance.now();}},
 onQuit:backMenu,
 onOpenShop(){state='menu';run=null;ui.hideHud();ui.hideAllModals();canvas.classList.remove('playing');ui.renderShop(data,buy);},
 onOpenChars(){state='menu';run=null;ui.hideHud();ui.hideAllModals();canvas.classList.remove('playing');ui.renderChars(data,select);},
 onRefreshMenu:refresh,
 onClearSave(){data=resetAll();data.bestStage=1;data.currentStage=1;save(data);setMuted(false);world.reset(data.selectedCharacter);ui.renderShop(data,buy);refresh();document.getElementById('btn-mute').textContent='🔊';}
});
refresh();ui.showMenu();
const mute=document.getElementById('btn-mute');mute.textContent=data.muted?'🔇':'🔊';mute.addEventListener('click',()=>{data.muted=!data.muted;setMuted(data.muted);mute.textContent=data.muted?'🔇':'🔊';save(data);});

function start(stage){
 resumeAudio();initAudio();ui.show('playing');ui.hideDeath();ui.hideVictory();ui.showHud();canvas.classList.add('playing');
 const c=getCharacter(data.selectedCharacter),meta=data.meta||{},cfg=STAGES[stage-1];world.reset(c.id);
 run={stage,cfg,c,t:0,x:0,targetX:0,hp:Math.round(100*(c.mods.maxHp||1)*(1+(meta.startHp||0)*.12)),maxHp:0,
 squad:Math.min(100,1+(meta.startWeapon||0)),damage:8*(c.mods.damage||1)*(1+(meta.damage||0)*.08),
 fireRate:(c.mods.fireRate||1)*(1+(meta.regen||0)*.06),speed:5.8*(c.mods.moveSpeed||1)*(1+(meta.moveSpeed||0)*.06),
 armour:(c.mods.armour||0)+(meta.armour||0)*.04,spread:meta.pickup||0,gateBonus:Math.floor((meta.xpGain||0)/2),
 bullets:[],enemies:[],gates:[],blockers:[],boss:null,events:0,shotCd:.05,kills:0,score:0,scraps:0,lastHud:0,complete:false};
 run.maxHp=run.hp;data.currentStage=stage;save(data);state='playing';dragId=null;last=performance.now();updateHud();
}
function spawnWall(){for(let i=0;i<5;i++)run.gates.push(world.addGate('+1',-2.8,31+i*4.6));run.gates.push(world.addGate('+3',2.8,47));}
function spawnChoice(a,b){for(const [value,x] of [[a,-2.8],[b,2.8]])run.gates.push(world.addGate(value,x,48));}
function spawnBlocker(x,hp){const e=world.addBlocker(x,50,hp);Object.assign(e,{hp,maxHp:hp,damageAcc:0,accCd:0});run.blockers.push(e);}
function spawnWave(kind,count,pattern){const hp=27+run.stage*12;for(let i=0;i<count;i++){let x,z;if(pattern==='columns'){x=((i%4)-1.5)*2.05;z=52+Math.floor(i/4)*2.6;}else if(pattern==='block'){x=((i%5)-2)*1.5;z=52+Math.floor(i/5)*1.65;}else if(pattern==='lanes'){x=(i%2?2.45:-2.45)+(Math.floor(i/2)%2)*.3;z=52+Math.floor(i/2)*1.6;}else{x=((i%6)-2.5)*1.5;z=52+Math.floor(i/6)*2.3;}const e=world.addEnemy(kind,x,z);Object.assign(e,{hp:hp*(kind==='mastiff'?2:1),maxHp:hp,radius:kind==='mastiff' ? .82 : .57,damageAcc:0,accCd:0});run.enemies.push(e);}}
function spawnBoss(which=run.cfg.boss){if(run.boss)return;const hp=run.stage===1?2300:run.stage===2?4200:6800;const e=world.addEnemy(which,0,57,true);Object.assign(e,{hp,maxHp:hp,radius:run.stage===3?2.8:2.4,damageAcc:0,accCd:0,attackCd:3.8,defeating:0});run.boss=e;SFX.boss();ui.showBossBanner(BOSS[run.stage-1]+' · BOSS');}
function event([,type,a,b,c]){if(type==='wall')spawnWall();if(type==='wave')spawnWave(a,b,c);if(type==='choice')spawnChoice(a,b);if(type==='blocker')spawnBlocker(a,b);}
function gate(value){let n=run.squad;if(value==='+1')n+=1+run.gateBonus;if(value==='+3')n+=3+run.gateBonus;if(value==='+5')n+=5+run.gateBonus;if(value==='x2')n*=2;if(value==='x3')n*=3;if(value==='DAMAGE')run.damage*=1.25;if(value==='FIRE RATE')run.fireRate*=1.25;if(value==='SPREAD')run.spread+=2;run.squad=Math.min(100,Math.max(1,Math.round(n)));ui.showEvolve(['DAMAGE','FIRE RATE','SPREAD'].includes(value)?value:run.c.name+' ×'+run.squad);SFX.level();}
function removeFrom(list,i){world.remove(list[i]);list.splice(i,1);}
function hitTarget(target,bullet,boss=false){const crit=Math.random()<(run.c.mods.critChance||0),dmg=bullet.damage*(crit?1.8:1)*(target.z<10?(run.c.mods.closeRangeDmg||1):1);target.hp-=dmg;target.damageAcc+=dmg;target.accCd+=.04;if(target.accCd>.23){showDamage(target.x,boss?5.5:target.kind==='blocker'?2.8:2.1,target.z,target.damageAcc,crit);target.damageAcc=0;target.accCd=0;}if(Math.random()<.2)world.impact(bullet.x,bullet.z,boss?'#ffb479':'#bdfcff',boss?7:4);return target.hp<=0;}
function fire(dt){run.shotCd-=dt;if(run.shotCd>0)return;run.shotCd+=.30/Math.max(.6,run.fireRate);const streams=Math.min(24,Math.max(1,Math.ceil(run.squad*.48))),width=Math.min(8.6,Math.max(.1,Math.sqrt(run.squad)*.75+run.spread*.28));for(let i=0;i<streams;i++){if(run.bullets.length>=340)break;const spread=streams===1?0:(i/(streams-1)-.5)*width;run.bullets.push({x:Math.max(-4.55,Math.min(4.55,run.x+spread)),z:.75+(i%4)*.18,y:.7+(i%3)*.05,speed:(35+(i%3)*2)*(run.c.mods.projectileSpeed||1),damage:run.damage*(1+Math.min(3,run.squad/18)*.11),w:.021,len:.52});}if(Math.random()<.1)SFX.shoot();}
function bullets(dt){for(let i=run.bullets.length-1;i>=0;i--){const b=run.bullets[i];b.z+=b.speed*dt;let did=false;
 for(let j=run.blockers.length-1;j>=0&&!did;j--){const e=run.blockers[j];if(Math.abs(b.z-e.z)<1.2&&Math.abs(b.x-e.x)<1.45){did=true;if(hitTarget(e,b)){run.scraps+=4;run.score+=100;run.squad=Math.min(100,run.squad+2);world.impact(e.x,e.z,'#ffe0a4',34);removeFrom(run.blockers,j);SFX.kill();ui.showEvolve('BLOCKER BROKEN · +2');}else if(Math.random()<.13)world.setBlockerHp(e,e.hp);}}
 for(let j=run.enemies.length-1;j>=0&&!did;j--){const e=run.enemies[j];if(Math.abs(b.z-e.z)<.85&&Math.abs(b.x-e.x)<e.radius){did=true;if(hitTarget(e,b)){run.kills++;run.score+=25;run.scraps++;world.impact(e.x,e.z,'#ffd1b5',9);removeFrom(run.enemies,j);if(Math.random()<.2)SFX.kill();}}}
 if(run.boss&&!did&&!run.boss.defeating){const e=run.boss;if(Math.abs(b.z-e.z)<e.radius*1.1&&Math.abs(b.x-e.x)<e.radius){did=true;if(hitTarget(e,b,true)){e.defeating=.8;SFX.boss();world.impact(e.x,e.z,'#ffe5a0',65);ui.showBossBanner(BOSS[run.stage-1]+' DOWN');}}}
 if(did||b.z>80)run.bullets.splice(i,1);
 }}
function hurt(amount){run.hp=Math.max(0,run.hp-amount*(1-run.armour));run.squad=Math.max(1,run.squad-1);world.impact(run.x,1,'#ff8e8e',12);SFX.hurt();if(run.hp<=0)fail();}
function updateEntities(dt){const speed=8.7;for(let i=run.gates.length-1;i>=0;i--){const g=run.gates[i];g.z-=speed*dt;if(g.z<1.2){if(Math.abs(g.x-run.x)<1.28)gate(g.text);removeFrom(run.gates,i);}}
 for(let i=run.blockers.length-1;i>=0;i--){const e=run.blockers[i];e.z-=speed*dt;if(e.z<.6){if(Math.abs(e.x-run.x)<1.65)hurt(18);removeFrom(run.blockers,i);}}
 for(let i=run.enemies.length-1;i>=0;i--){const e=run.enemies[i];e.z-=(speed+(e.kind==='doberman'?2.1:0))*dt;if(e.z<1.1){if(Math.abs(e.x-run.x)<1.18)hurt(e.kind==='mastiff'?17:11);removeFrom(run.enemies,i);}}
 if(run.boss){const e=run.boss;if(e.defeating>0){e.defeating-=dt;e.mesh.rotation.z=Math.min(1.2,e.mesh.rotation.z+dt*1.5);if(e.defeating<=0)complete();return;}if(e.z>13)e.z-=speed*.67*dt;else{e.attackCd-=dt;if(e.attackCd<=0){e.attackCd=4.4;world.impact(e.x,e.z,'#ff9a71',28);hurt(15+run.stage*3);}}}
}
function updateHud(){const r=run;ui.updateHud({hp:r.hp,maxHp:r.maxHp,progress:r.boss?100:r.t/r.cfg.bossAt*100,stage:r.stage,time:r.t,kills:r.kills,charName:r.c.name,squad:r.squad,boss:r.boss?{name:BOSS[r.stage-1],hp:Math.max(0,r.boss.hp),maxHp:r.boss.maxHp}:null});}
function finish(victory){if(!run||run.complete)return;run.complete=true;state=victory?'complete':'failed';canvas.classList.remove('playing');data.currency+=run.scraps+(victory?40*run.stage:0);data.highScore=Math.max(data.highScore||0,run.score);data.bestTime=Math.max(data.bestTime||0,run.t);data.totalKills=(data.totalKills||0)+run.kills;data.runs=(data.runs||0)+1;if(victory){data.victories=(data.victories||0)+1;data.bestStage=Math.max(data.bestStage||1,run.stage);data.currentStage=run.stage===3?1:run.stage+1;}save(data);const summary={time:run.t,kills:run.kills,stage:run.stage,level:run.stage,squad:run.squad,score:run.score,currency:run.scraps+(victory?40*run.stage:0),bestTime:data.bestTime,bestStage:data.bestStage,boss:BOSS[run.stage-1]};if(victory)ui.showVictory(summary);else ui.showDeath(summary);ui.hideHud();}
function complete(){finish(true);}function fail(){SFX.death();finish(false);}
function step(dt){run.t+=dt;const cfg=run.cfg;while(run.events<cfg.events.length&&run.t>=cfg.events[run.events][0])event(cfg.events[run.events++]);if(!run.boss&&run.t>=cfg.bossAt)spawnBoss();run.x+=(run.targetX-run.x)*Math.min(1,dt*run.speed*2.2);run.x=Math.max(-4.25,Math.min(4.25,run.x));fire(dt);bullets(dt);updateEntities(dt);world.update(dt,run.t,run.squad,run.x,run.bullets);if(run.t-run.lastHud>.1){run.lastHud=run.t;updateHud();}}
function frame(now){const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;displayTime+=dt;if(state==='playing'&&run)step(dt);else world.update(dt,displayTime,run?run.squad:1,run?run.x:0,run?run.bullets:[]);world.render();requestAnimationFrame(frame);}requestAnimationFrame(frame);
canvas.addEventListener('pointerdown',e=>{if(state!=='playing')return;dragId=e.pointerId;dragX=e.clientX;canvas.setPointerCapture(e.pointerId);e.preventDefault();},{passive:false});
canvas.addEventListener('pointermove',e=>{if(state!=='playing'||e.pointerId!==dragId)return;const dx=e.clientX-dragX;dragX=e.clientX;run.targetX=Math.max(-4.25,Math.min(4.25,run.targetX+dx/innerWidth*10.6));e.preventDefault();},{passive:false});
for(const type of ['pointerup','pointercancel'])canvas.addEventListener(type,e=>{if(e.pointerId===dragId)dragId=null;});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state==='playing'){state='paused';ui.showPause();}});
window.addEventListener('keydown',e=>{if(state!=='playing')return;if(e.key==='ArrowLeft'||e.key==='a')run.targetX=Math.max(-4.25,run.targetX-.9);if(e.key==='ArrowRight'||e.key==='d')run.targetX=Math.min(4.25,run.targetX+.9);if(e.key==='Escape'){state='paused';ui.showPause();}});
