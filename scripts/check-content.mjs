import { TASKS, TEST, CHAPTERS, grade, expectedValue } from '../course-data.js';
const ids = new Set(), errors=[];
for(const t of [...TASKS,...TEST]){
 if(ids.has(t.id)) errors.push('Doppelte ID '+t.id); ids.add(t.id);
 if(![1,2,3].includes(t.afb)) errors.push('AFB '+t.id);
 if(!t.solution) errors.push('Musterlösung fehlt '+t.id);
 if(t.type!=='text' && !grade(t,expectedValue(t))) errors.push('Korrekte Antwort wird nicht erkannt: '+t.id);
 if(t.type==='single' && (t.correct<0 || t.correct>=t.options.length)) errors.push('Index '+t.id);
}
for(const c of CHAPTERS){const ts=TASKS.filter(t=>t.chapter===c.id&&!t.bonus);for(let afb=1;afb<=3;afb++){ if(ts.filter(t=>t.afb===afb).length<1)errors.push('Zu wenige Aufgaben in '+c.id+' AFB '+afb); }}
const counts=[1,2,3].map(afb=>TASKS.filter(t=>!t.bonus&&t.afb===afb).length);
const distribution=CHAPTERS.map(ch=>TASKS.filter(t=>t.chapter===ch.id&&!t.bonus).length);
if(distribution.join(',')!=='4,6,9,10,11')errors.push('Kapitelzahlen entsprechen nicht der differenzierten Gewichtung: '+distribution);
if(counts.join(',')!=='10,20,10')errors.push('AFB-Verteilung muss 25/50/25 sein: '+counts);
console.log('Kursaufgaben:',TASKS.length,'Test:',TEST.length,'Verteilung [nur Autorenprüfung]:',counts,'Kapitel:',CHAPTERS.length,'Aufgaben pro Kapitel:',distribution);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('Inhaltsprüfung bestanden.');
