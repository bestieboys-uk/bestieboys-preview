import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const repoRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const reviewRoot=path.join(repoRoot,'review-v3');
const catalogSource=await fs.readFile(path.join(reviewRoot,'onion-catalog.js'),'utf8');
const context={window:{}};
vm.runInNewContext(catalogSource,context,{filename:'onion-catalog.js'});
const catalog=context.window.BESTIEBOYS_ONION;
const errors=[];
const assert=(condition,message)=>{if(!condition)errors.push(message);};
const sha256=async file=>createHash('sha256').update(await fs.readFile(file)).digest('hex');

assert(catalog?.ordered?.length===9,'Catalog must contain exactly nine ordered scenes.');
assert(new Set(catalog.ordered.map(scene=>scene.slug)).size===9,'Scene slugs must be unique.');
assert(new Set(catalog.ordered.map(scene=>scene.code)).size===9,'Scene codes must be unique.');
assert(catalog.ordered.every((scene,index)=>scene.order===index+1&&scene.row===index),'Scene order and sprite row must stay aligned.');
assert(catalog.ordered.every(scene=>scene.artworks.length===3),'Every scene must contain exactly three artworks.');

const spritePath=path.join(reviewRoot,catalog.sprite.src);
assert(await sha256(spritePath)===catalog.sprite.sha256,'Authoritative sprite SHA-256 mismatch.');

const masterHashes=new Map();
let spriteBacked=0;
for(const scene of catalog.ordered){
  for(const [col,item] of scene.artworks.entries()){
    assert(item.row===scene.row&&item.col===col,`${scene.slug} ${item.id} has incorrect sprite coordinates.`);
    const mockupPath=path.join(reviewRoot,item.mockup);
    try{const stats=await fs.stat(mockupPath);assert(stats.size>20_000,`${item.mockup} is unexpectedly small.`);}catch{errors.push(`Missing mockup: ${item.mockup}`);}
    if(!item.master){spriteBacked+=1;continue;}
    const masterPath=path.join(reviewRoot,item.master.src);
    try{
      const actual=await sha256(masterPath);
      assert(actual===item.master.sha256,`Source hash mismatch: ${item.master.src}`);
      const owners=masterHashes.get(actual)||[];
      owners.push(`${scene.slug}/${item.id}`);
      masterHashes.set(actual,owners);
    }catch{errors.push(`Missing source: ${item.master.src}`);}
  }
}

assert(spriteBacked===9,`Expected nine sprite-backed cells; found ${spriteBacked}.`);
const duplicateGroups=[...masterHashes.values()].filter(owners=>owners.length>1);
assert(duplicateGroups.length===1&&duplicateGroups[0].join('|')==='black-metal/02|doom-metal/01','Only the approved Black Metal 02 / Doom Metal 01 duplicate is allowed.');

if(errors.length){
  console.error(errors.join('\n'));
  process.exitCode=1;
}else{
  console.log(`Validated ${catalog.ordered.length} scenes / ${catalog.ordered.length*3} artworks / ${spriteBacked} sprite-backed cells.`);
}
