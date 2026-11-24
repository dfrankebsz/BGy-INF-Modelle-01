import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {CHAPTERS,TASKS} from '../course-data.js';

test('Kapitel-Navigation und Kapitel-Fortschritt verwenden dynamische Nenner',async()=>{
 const app=await readFile(new URL('../app.js',import.meta.url),'utf8');
 assert.match(app,/`\$\{done\(ch\.id\)\}\/\$\{chapterTasks\(ch\.id\)\.length\}`/);
 assert.match(app,/\$\{done\(ch\.id\)\}\/\$\{tasks\.length\} gelöst/);
 assert.doesNotMatch(app,/\$\{done\(ch\.id\)\}\/8/);
 assert.deepEqual(CHAPTERS.map(c=>TASKS.filter(t=>t.chapter===c.id&&!t.bonus).length),[4,6,9,10,11]);
});
