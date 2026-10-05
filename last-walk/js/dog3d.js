import * as THREE from './vendor/three.module.js';

// Original purpose-built canine surfaces. Each section describes an anatomical
// cross-section; no stock sphere, capsule, or box geometry is used for bodies.
function longitudinal(sections, sides=12) {
  const p=[], n=[], uv=[], idx=[];
  sections.forEach((s,i)=>{
    for(let j=0;j<sides;j++) {
      const a=j/sides*Math.PI*2, c=Math.cos(a), q=Math.sin(a);
      p.push(s.x+s.rx*c, s.y+s.ry*q, s.z);
      uv.push(j/sides,i/(sections.length-1));
    }
  });
  for(let i=0;i<sections.length-1;i++) for(let j=0;j<sides;j++) {
    const a=i*sides+j,b=i*sides+(j+1)%sides,c=(i+1)*sides+j,d=(i+1)*sides+(j+1)%sides;
    idx.push(a,b,c,b,d,c);
  }
  for(let j=1;j<sides-1;j++) {idx.push(0,j+1,j); const k=(sections.length-1)*sides;idx.push(k,k+j,k+j+1);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g;
}
function vertical(sections,sides=10) {
  const p=[],uv=[],idx=[];
  sections.forEach((s,i)=>{for(let j=0;j<sides;j++){const a=j/sides*Math.PI*2;p.push(s.x+s.rx*Math.cos(a),s.y,s.z+s.rz*Math.sin(a));uv.push(j/sides,i/(sections.length-1));}});
  for(let i=0;i<sections.length-1;i++)for(let j=0;j<sides;j++){const a=i*sides+j,b=i*sides+(j+1)%sides,c=(i+1)*sides+j,d=(i+1)*sides+(j+1)%sides;idx.push(a,c,b,b,c,d);}
  for(let j=1;j<sides-1;j++){idx.push(0,j,j+1);const k=(sections.length-1)*sides;idx.push(k,k+j+1,k+j);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g;
}
function earShape(w,h,drop=false) {
  const z=0, pts=drop ? [[-w,0,0],[w,0,0],[w*.8,h*.3,.03],[w*.18,h*.63,.14],[-w*.9,h*.48,.03]] : [[-w,0,0],[w,0,0],[w*.6,h*.65,.02],[0,h,.08],[-w*.75,h*.6,.02]];
  const v=[],uv=[];pts.forEach(q=>{v.push(...q);uv.push((q[0]/w+1)/2,q[1]/h)});
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex([0,1,2,0,2,3,0,3,4]);g.computeVertexNormals();return g;
}
function makeMaterial(color,roughness=.89) { return new THREE.MeshStandardMaterial({color,roughness,metalness:0,side:THREE.DoubleSide}); }
const BREEDS={
  hero:{length:1.32,width:.42,height:1.13,head:.41,muzzle:.72,leg:.73,ear:'drop',tail:1},
  staffy:{length:1.25,width:.52,height:1.05,head:.53,muzzle:.55,leg:.63,ear:'rose',tail:1,coat:'#76564c',chest:'#eee5d5'},
  bulldog:{length:1.08,width:.63,height:.82,head:.62,muzzle:.42,leg:.46,ear:'rose',tail:.3,coat:'#dbb998',chest:'#fff3dc'},
  boxer:{length:1.42,width:.49,height:1.19,head:.5,muzzle:.60,leg:.77,ear:'drop',tail:.7,coat:'#a45b38',chest:'#f6e2c5',mask:'#31282a'},
  doberman:{length:1.61,width:.43,height:1.48,head:.39,muzzle:.8,leg:.95,ear:'upright',tail:.55,coat:'#28292b',chest:'#94502c',mask:'#232224'},
  shepherd:{length:1.62,width:.49,height:1.31,head:.45,muzzle:.78,leg:.82,ear:'upright',tail:1.25,coat:'#866748',chest:'#d4b283',saddle:'#2a2b2a'},
  mastiff:{length:1.64,width:.71,height:1.39,head:.66,muzzle:.62,leg:.79,ear:'drop',tail:.9,coat:'#9f8067',chest:'#c8ad89',mask:'#302b2a'},
  rottweiler:{length:1.60,width:.63,height:1.35,head:.59,muzzle:.7,leg:.80,ear:'drop',tail:.55,coat:'#202226',chest:'#99582e',mask:'#1d2022',brow:'#b8773d'},
  pitbull:{length:1.43,width:.60,height:1.22,head:.63,muzzle:.55,leg:.73,ear:'rose',tail:.9,coat:'#645d5b',chest:'#f4ebe1'},
  xlbully:{length:1.78,width:.84,height:1.38,head:.82,muzzle:.48,leg:.71,ear:'rose',tail:.72,coat:'#6b6a70',chest:'#eee9e5'},
};
const HERO_FORMS={
  gerrard:{length:1.28,width:.55,height:1.02,head:.58,muzzle:.52,leg:.60,ear:'drop',tail:.48,coat:'#c9a77c',chest:'#e5cda9'},
  onion:{length:1.52,width:.32,height:1.36,head:.34,muzzle:.96,leg:1.02,ear:'rose',tail:1.06,coat:'#27282c',chest:'#f2eee8',paws:'#f2eee8'},
  sylvester:{species:'cat',length:1.28,width:.42,height:.98,head:.46,muzzle:.34,leg:.64,ear:'upright',tail:1.42,coat:'#a98767',chest:'#d0b28a'},
  vega:{length:1.62,width:.49,height:1.34,head:.47,muzzle:.78,leg:.85,ear:'upright',tail:1.22,coat:'#29292c',chest:'#d8d0c0',saddle:'#111214'},
  ben:{length:1.06,width:.46,height:.86,head:.47,muzzle:.54,leg:.52,ear:'drop',tail:.82,coat:'#d1c1a2',chest:'#eee3cf'},
  kysa:{species:'cat',length:1.25,width:.40,height:.98,head:.46,muzzle:.31,leg:.65,ear:'upright',tail:1.46,coat:'#17181d',chest:'#f0efec',paws:'#f0efec',saddle:'#f0efec',tailTip:'#f0efec'},
};
const HERO_COATS={gerrard:'#c9a77c',onion:'#ba8752',sylvester:'#8c8075',vega:'#948577',ben:'#7b7168',kysa:'#ae7e64'};
const loaders=new THREE.TextureLoader();const faceTextures=new Map();
function faceTexture(id){if(!faceTextures.has(id)){const t=loaders.load(`assets/pets/faces/${id}.webp`);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;faceTextures.set(id,t);}return faceTextures.get(id);}
function mesh(g,m,parent,cast=true){const o=new THREE.Mesh(g,m);o.castShadow=cast;o.receiveShadow=true;parent.add(o);return o;}

export function createDog(kind='hero',heroId='gerrard',scale=1,quality='medium') {
  const b=kind==='hero'?(HERO_FORMS[heroId]||BREEDS.hero):(BREEDS[kind]||BREEDS.hero), root=new THREE.Group();root.scale.setScalar(scale);
  const coat=makeMaterial(kind==='hero'?(b.coat||HERO_COATS[heroId]||HERO_COATS.gerrard):b.coat);
  const light=makeMaterial(b.chest||'#cfb694'),dark=makeMaterial(b.mask||'#312d2d'),back=makeMaterial(b.saddle||b.coat||'#312d2d'),paw=makeMaterial(b.paws||b.coat||'#cfb694'),tip=makeMaterial(b.tailTip||b.coat||'#cfb694'),nose=makeMaterial(b.species==='cat'?'#c58f91':'#171b20',.35),eye=makeMaterial('#231916',.28),shine=makeMaterial('#efe1c7',.32),accent=makeMaterial(b.brow||'#ae774a');
  const torso=new THREE.Group();root.add(torso);
  const w=b.width,L=b.length,h=b.height, leg=b.leg;
  mesh(longitudinal([
    {x:0,y:leg+.40*w,z:-.63*L,rx:.19*w,ry:.23*w},
    {x:0,y:leg+.48*w,z:-.43*L,rx:.81*w,ry:.69*w},
    {x:0,y:leg+.52*w,z:-.12*L,rx:.69*w,ry:.68*w},
    {x:0,y:leg+.56*w,z:.31*L,rx:.92*w,ry:.82*w},
    {x:0,y:leg+.56*w,z:.62*L,rx:.73*w,ry:.69*w},
    {x:0,y:leg+.60*w,z:.83*L,rx:.39*w,ry:.38*w}
  ],quality==='low'?8:14),coat,torso);
  // A shaped ventral chest and breed markings follow the torso rather than a flat patch.
  if(b.chest) mesh(longitudinal([
    {x:0,y:leg+.25*w,z:.25*L,rx:.44*w,ry:.08*w},
    {x:0,y:leg+.24*w,z:.54*L,rx:.55*w,ry:.11*w},
    {x:0,y:leg+.32*w,z:.78*L,rx:.35*w,ry:.12*w}
  ],10),light,torso,false);
  if(b.saddle) mesh(longitudinal([
    {x:0,y:leg+.92*w,z:-.42*L,rx:.57*w,ry:.08*w},
    {x:0,y:leg+1.23*w,z:-.13*L,rx:.72*w,ry:.08*w},
    {x:0,y:leg+1.18*w,z:.34*L,rx:.61*w,ry:.07*w}
  ],10),back,torso,false);
  const neck=new THREE.Group();neck.position.set(0,leg+.75*w,.66*L);torso.add(neck);
  mesh(longitudinal([
    {x:0,y:0,z:-.09,rx:.42*w,ry:.39*w},
    {x:0,y:.17*w,z:.12,rx:.56*w,ry:.55*w},
    {x:0,y:.28*w,z:.38,rx:.44*w,ry:.47*w},
    {x:0,y:.35*w,z:.47,rx:.32*w,ry:.32*w}
  ],12),coat,neck);
  const head=new THREE.Group();head.position.set(0,.42*w,.38);neck.add(head);
  const hw=b.head;
  mesh(longitudinal([
    {x:0,y:0,z:-.20,rx:.43*hw,ry:.48*hw},
    {x:0,y:.09*hw,z:-.05,rx:.89*hw,ry:.77*hw},
    {x:0,y:.07*hw,z:.22,rx:hw,ry:.82*hw},
    {x:0,y:-.01*hw,z:.47,rx:.77*hw,ry:.65*hw},
    {x:0,y:-.10*hw,z:.63,rx:.48*hw,ry:.40*hw}
  ],quality==='low'?9:16),coat,head);
  const mz=b.muzzle;
  mesh(longitudinal([
    {x:0,y:-.19*hw,z:.38,rx:.64*hw,ry:.45*hw},
    {x:0,y:-.25*hw,z:.55,rx:.64*hw*mz/.7,ry:.40*hw},
    {x:0,y:-.24*hw,z:.72*mz/.7,rx:.53*hw*mz/.7,ry:.32*hw},
    {x:0,y:-.25*hw,z:.79*mz/.7,rx:.26*hw,ry:.18*hw}
  ],12),b.mask?dark:light,head);
  mesh(longitudinal([{x:0,y:-.17*hw,z:.78*mz/.7,rx:.24*hw,ry:.13*hw},{x:0,y:-.20*hw,z:.82*mz/.7,rx:.23*hw,ry:.13*hw}],10),nose,head,false);
  for(const side of [-1,1]){
    const e=mesh(earShape(.23*hw,b.ear==='upright'?.63*hw:.34*hw,b.ear!=='upright'),b.ear==='upright'?coat:dark,head);
    e.position.set(side*.7*hw,.67*hw,-.01);e.rotation.z=side*(b.ear==='upright'?.12:-.30);e.rotation.y=side*.18;
    const eyeball=mesh(longitudinal([{x:side*.62*hw,y:.27*hw,z:.40,rx:.105*hw,ry:.10*hw},{x:side*.62*hw,y:.27*hw,z:.49,rx:.08*hw,ry:.08*hw}],8),eye,head,false);
    eyeball.rotation.y=side*.2;
    mesh(longitudinal([{x:side*.60*hw,y:.29*hw,z:.49,rx:.026*hw,ry:.025*hw},{x:side*.60*hw,y:.29*hw,z:.50,rx:.018*hw,ry:.018*hw}],7),shine,head,false);
    if(kind==='rottweiler'||kind==='doberman') mesh(longitudinal([{x:side*.59*hw,y:.47*hw,z:.40,rx:.17*hw,ry:.085*hw},{x:side*.59*hw,y:.48*hw,z:.43,rx:.11*hw,ry:.06*hw}],9),accent,head,false);
    if(kind==='rottweiler') mesh(longitudinal([{x:side*.34*hw,y:-.27*hw,z:.49,rx:.20*hw,ry:.16*hw},{x:side*.32*hw,y:-.25*hw,z:.67,rx:.17*hw,ry:.13*hw}],9),accent,head,false);
  }
  // Approved transparent likeness is laid onto a gently curved face surface.
  // The alpha silhouette provides the edge, with no rectangular picture card.
  if(kind==='hero'&&quality!=='low'){
    const tex=faceTexture(heroId),verts=[],uv=[],ix=[],N=8;
    for(let y=0;y<=N;y++)for(let x=0;x<=N;x++){const u=x/N,v=y/N;verts.push((u-.5)*hw*1.92,(v-.5)*hw*1.90+.06*hw,.48+Math.cos((u-.5)*Math.PI)*.14);uv.push(u,v);}
    for(let y=0;y<N;y++)for(let x=0;x<N;x++){const a=y*(N+1)+x,b=a+1,c=a+N+1,d=c+1;ix.push(a,c,b,b,c,d);}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();
    const f=mesh(g,new THREE.MeshBasicMaterial({map:tex,transparent:true,alphaTest:.12,side:THREE.DoubleSide,depthWrite:false}),head,false);f.renderOrder=2;
  }
  if(b.species==='cat'&&quality!=='low'){
    const points=[];
    for(const side of [-1,1]) for(const dy of [-.10,0,.10]) points.push(side*.20*hw,-.18*hw+dy*hw,.73,side*1.18*hw,-.16*hw+dy*hw,.91);
    const whiskerGeo=new THREE.BufferGeometry();whiskerGeo.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
    const whiskers=new THREE.LineSegments(whiskerGeo,new THREE.LineBasicMaterial({color:'#dfd8ca',transparent:true,opacity:.72}));whiskers.renderOrder=3;head.add(whiskers);
  }
  const legs=[];
  for(const front of [true,false])for(const side of [-1,1]){
    const piv=new THREE.Group();piv.position.set(side*w*(front?.66:.58),leg+.07*w,front?.54*L:-.47*L);torso.add(piv);
    const thick=w*(front?.32:.31);
    mesh(vertical([
      {x:0,y:.08*w,z:0,rx:thick*.92,rz:thick*.94},
      {x:0,y:-.12*leg,z:front?.08:-.06,rx:thick,rz:thick*.95},
      {x:0,y:-.43*leg,z:front?.10:-.13,rx:thick*.72,rz:thick*.72},
      {x:0,y:-.53*leg,z:front?.10:-.13,rx:thick*.57,rz:thick*.59}
    ],quality==='low'?7:10),coat,piv);
    const knee=new THREE.Group();knee.position.set(0,-.52*leg,front?.10:-.13);piv.add(knee);
    mesh(vertical([
      {x:0,y:.05*leg,z:0,rx:thick*.63,rz:thick*.67},
      {x:0,y:-.17*leg,z:front?0:.07,rx:thick*.50,rz:thick*.51},
      {x:0,y:-.40*leg,z:front?.02:.13,rx:thick*.42,rz:thick*.45},
      {x:0,y:-.48*leg,z:front?.11:.25,rx:thick*.67,rz:thick*.74}
    ],quality==='low'?7:10),b.paws?paw:(b.chest&&kind==='rottweiler'?accent:coat),knee);
    // Broad, low paw with forward toes; the last section sits on the bridge.
    mesh(vertical([
      {x:0,y:-.43*leg,z:front?.10:.22,rx:thick*.67,rz:thick*.75},
      {x:0,y:-.50*leg,z:front?.23:.32,rx:thick*.76,rz:thick*1.08},
      {x:0,y:-.53*leg,z:front?.24:.33,rx:thick*.74,rz:thick*1.08}
    ],10),b.paws?paw:(kind==='rottweiler'?accent:coat),knee);
    legs.push({piv,knee,front,side});
  }
  const tail=new THREE.Group();tail.position.set(0,leg+.72*w,-.65*L);torso.add(tail);
  if(b.tail>.35) mesh(longitudinal([
    {x:0,y:0,z:0,rx:.15*w,ry:.14*w},
    {x:0,y:.13*b.tail,z:-.21*b.tail,rx:.12*w,ry:.12*w},
    {x:0,y:.27*b.tail,z:-.48*b.tail,rx:.09*w,ry:.08*w},
    {x:0,y:.38*b.tail,z:-.67*b.tail,rx:.035*w,ry:.03*w}
  ],9),coat,tail);
  if(b.tailTip) mesh(longitudinal([
    {x:0,y:.27*b.tail,z:-.48*b.tail,rx:.095*w,ry:.085*w},
    {x:0,y:.38*b.tail,z:-.67*b.tail,rx:.035*w,ry:.03*w}
  ],8),tip,tail);
  const shadow=new THREE.Mesh(new THREE.PlaneGeometry(w*2.5,L*2.1),new THREE.MeshBasicMaterial({color:'#050505',transparent:true,opacity:.24,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=.018;root.add(shadow);
  root.userData={kind,head,torso,legs,tail,scale,baseY:0,phase:Math.random()*6.28};
  return root;
}

export function animateDog(dog,t,speed=1,action='run') {
  const {head,torso,legs,tail,phase}=dog.userData;
  const s=t*11*speed+phase,run=action==='run'?1:action==='charge'?1.45:.22;
  torso.position.y=Math.abs(Math.sin(s))*0.035*run;
  torso.rotation.z=Math.sin(s*.5)*.012*run;
  head.rotation.x=Math.sin(s+1)*.035*run;
  tail.rotation.y=Math.sin(s*.7)*.20;
  for(const q of legs){const offset=q.front ? (q.side<0?0:Math.PI):(q.side<0?Math.PI:0);q.piv.rotation.x=Math.sin(s+offset)*.32*run;q.knee.rotation.x=Math.max(0,Math.sin(s+offset+1))*.32*run;}
  if(action==='hit')torso.rotation.z=Math.sin(t*30)*.08;
  if(action==='death'){dog.rotation.z=Math.min(1.15,dog.rotation.z+.06);dog.position.y=-.1;}
}

export const DOG_BREEDS=Object.keys(BREEDS).filter(x=>x!=='hero');
