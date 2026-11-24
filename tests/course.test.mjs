import test from 'node:test';
import assert from 'node:assert/strict';
import {CHAPTERS,TASKS,TEST,ALL_TASKS,grade,expectedValue,earnedXp,wallet,newProgress,SHOP} from '../course-data.js';

test('inhaltlich gewichtete Kapitel mit insgesamt 40 regulären Aufgaben, Bonus und Abschlusstest',()=>{
 assert.equal(CHAPTERS.length,5);
 assert.equal(TASKS.filter(t=>!t.bonus).length,40);
 assert.equal(TASKS.filter(t=>t.bonus).length,5);
 assert.equal(TEST.length,10);
 const distribution=[4,6,9,10,11];
 CHAPTERS.forEach((c,i)=>{const items=TASKS.filter(t=>t.chapter===c.id&&!t.bonus);assert.equal(items.length,distribution[i]);for(const a of [1,2,3])assert.ok(items.some(t=>t.afb===a),c.id+' AFB '+a);});
 assert.deepEqual([1,2,3].map(a=>TASKS.filter(t=>!t.bonus&&t.afb===a).length),[10,20,10]);
 assert.deepEqual(CHAPTERS.map(c=>TASKS.filter(t=>t.chapter===c.id&&t.bonus).length),[0,1,1,1,2]);
});
test('alle vorgegebenen korrekten Antworten werden als korrekt erkannt',()=>{
 for(const task of ALL_TASKS){if(task.type==='text')assert.equal(grade(task,'Eine Begründung'),null);else assert.equal(grade(task,expectedValue(task)),true,task.id);}
});
test('fehlerhafte Antworten werden nicht versehentlich als korrekt erkannt',()=>{
 for(const task of ALL_TASKS){
  if(task.type==='text')continue;
  let wrong;
  if(task.type==='single')wrong=(task.correct+1)%task.options.length;
  if(task.type==='multi')wrong=task.correct.slice(0,Math.max(0,task.correct.length-1));
  if(task.type==='tf')wrong=!task.correct;
  if(task.type==='numeric')wrong=task.correct+5;
  if(task.type==='match'||task.type==='category')wrong={...expectedValue(task),0:'ganz-falsch'};
  if(task.type==='order')wrong=[...task.correct].reverse();
  assert.equal(grade(task,wrong),false,task.id);
 }
});
test('XP entstehen nur durch gelöste Aufgaben und Shopkauf verringert nur verfügbares Guthaben',()=>{
 const p=newProgress();assert.equal(earnedXp(p),0);assert.equal(wallet(p),0);
 p.answers.g1={checked:true,correct:true,value:1};p.answers.a1={checked:true,correct:true,value:0};
 assert.equal(earnedXp(p),40);assert.equal(wallet(p),40);
 const item=SHOP.find(x=>x.id==='outfit-cap');p.owned=[item.id];
 assert.equal(earnedXp(p),40);assert.equal(wallet(p),0);
});
test('kein versehentliches automatisches Freitext-Scoring',()=>{
 const f=TASKS.find(t=>t.type==='text');assert.equal(grade(f,f.solution),null);
});
