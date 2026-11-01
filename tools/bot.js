window.bot=function(mode,leadPick,tbPick){
const GOOD={0:3,1:3,2:1,3:0,4:2};const R=n=>Math.floor(Math.random()*n);let cc=0;
const pick=()=>{ if(!SH)return;
  const h=sheet.innerHTML;
  if(h.includes('data-tbl=')){const ids=[...h.matchAll(/data-tbl="(\w+)"/g)].map(x=>x[1]);SH.tbl(ids.includes(tbPick)?tbPick:ids[0]);closeSheet();return}
  if(h.includes('data-lead=')){const ids=[...h.matchAll(/data-lead="(\w+)"/g)].map(x=>x[1]);SH.lead(ids.includes(leadPick)?leadPick:ids[0]);closeSheet();return}
  if(false){SH.lead(leadPick||'darius');closeSheet();return}
  if(h.includes('data-tbg=')){const ids=[...h.matchAll(/data-tbm="(\w+)"/g)].map(x=>x[1]);SH.tbm(ids[R(ids.length)]);pick();return}
  if(h.includes('data-tbo=')){const n=(h.match(/data-tbo=/g)||[]).length;SH.tbo(mode==='rand'?R(Math.min(n,5)):(h.includes('Skambutis')?[0,3,4][cc++%3]:0));closeSheet();return}
  if(h.includes('data-coach=')){SH.coach(mode==='rand'?R(5):(G.people[SH._id||G.lead]&&G.people[G.lead].stress>=60?4:[0,3][cc++%2]));closeSheet();return}
  if(h.includes('data-iq=')){const q=['mot','exp','conf','why'].find(k=>h.includes(`data-iq="${k}"`));SH.iq(q);return}
  if(h.includes('data-onb=')){SH.onb(mode==='rand'?R(3):0);closeSheet();return}
  if(h.includes('data-mi=')){const n=(h.match(/data-mi=/g)||[]).length;SH.mi(mode==='rand'?R(n):0);closeSheet();return}
  if(h.includes('data-ev=')){const n=(h.match(/data-ev=/g)||[]).length;SH.ev(mode==='rand'?R(n):(GOOD[SH._ev]??0));closeSheet();return}
  if(h.includes('data-talk=')){const id=SH._id;const P=G.people[id];SH.talk(P.known?P.mot:'listen');closeSheet();return}
  if(h.includes('data-meet=')){const ks=Object.keys(MEET).filter(k=>h.includes(`data-meet="${k}"`));SH.meet(mode==='rand'?ks[R(ks.length)]:(['risks','open','close','retro'].find(k=>ks.includes(k))||ks[0]));pick();return}
  closeSheet();};
for(let d=0;d<5;d++){
  if(d>0){G.day++;over.hidden=true;RT.ended=false;startDay()}
  let guard=0;
  while(!RT.ended&&guard++<40000){
    if(RT.queue&&RT.queue.length&&!SH)openCons(RT.queue.shift());
    if(SH){pick();continue}
    const ms=RT.markers.filter(m=>mode==='rand'||!m.leadAt);
    if(ms.length){const m=ms[0];
      if(m.kind==='phone'){const ev=m.ev;RT.markers=RT.markers.filter(x=>x!==m);openEvent(ev);SH._ev=ev;continue}
      if(m.who&&(RT.chars[m.who]||m.who==='client')){if(typeof m.ev==='number'){RT.markers=RT.markers.filter(x=>x!==m);openEvent(m.ev,m.who);SH._ev=m.ev;continue}
        doAction({kind:'npc',id:m.who});if(SH&&!SH._id)SH._id=m.who;continue}}
    const t=IDS.find(id=>ok(id)&&!RT.talked[id]&&RT.chars[id].state==='work'&&(G.people[id].stress>=45||!G.people[id].known||RT.time>13*60||id===G.lead));
    if(t&&Math.random()<0.02){if(t===G.lead)openCoach(t);else openPerson(t);SH._id=t;continue}
    if(G.tb&&mode!=='none'&&!RT.markers.length&&RT.time>12*60&&(!RT.tbCoach||(mode==='good'&&!RT.tbVisit&&RT.time>15*60))){openDesk();if(!RT.tbCoach)SH.desk('tbcoach');else SH.desk('tbvisit');continue}
    if(!RT.meetToday&&RT.time>10*60+30&&!RT.markers.length){callMeeting()}
    checkMeeting();
    step(0.05);
  }
  if(G.over)break;
}
showEnd();
return `W${G.week+1} ${mode} lead=${G.lead}${G.prevLead?'(prev '+G.prevLead+')':''} tb=${G.tb?G.tb.lead+(G.tb.gone.length?' gone:'+G.tb.gone:''):''}: ${starsOf().map(x=>x?'★':'·').join('')} auth=${G.auth} skill=${G.lskill}${G.tb?` | B: auth=${G.tb.auth} skill=${G.tb.skill} morale=${G.tb.morale} stress=${Math.round(G.tb.stress)} size=${G.tb.size}`:''} bad=${badN()} q=${IDS.filter(i=>G.people[i].quit).length} out=${Math.round(G.days.reduce((s,d)=>s+d.out,0))}/${G.days.reduce((s,d)=>s+d.plan,0)}`;
};
window.runWeek=(mode,w,lp,tp)=>{S.meta.tutDone=1;newGame('sales',w);RT=null;over.hidden=true;startDay();renderAll();return bot(mode,lp,tp)};
