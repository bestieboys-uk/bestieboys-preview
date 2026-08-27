(() => {
  const sprite={
    src:'assets/styles/onion/onion-all-locked-sprite.webp',
    width:1260,
    height:3780,
    cell:420,
    sha256:'05d799ab598e748075d40c55d4062710a55952917a44248cab0d570b8df7b11d'
  };

  const source=(src,width,height,sha256)=>({src,width,height,sha256});
  const artwork=(id,title,summary,alt,master,mockup)=>({id,title,summary,alt,master,mockup});

  const scenes={
    'black-metal':{
      order:1,row:0,slug:'black-metal',code:'BM',name:'Black Metal',accent:'#9e2f1e',
      tagline:'RITUAL, SHADOW, MONUMENT.',
      lead:'Choose one of Onion’s three approved directions. Your pet is then art-directed into that world—built as a considered piece of band merch, not dropped into a filter.',
      artworkIntro:'These are the exact approved Onion sources. Each has its own composition, lettering and atmosphere; the mockups above show placement only.',
      standardQuote:'The pet becomes the central figure of real merch.',
      artworks:[
        artwork('01','Ritual Landscape','The pet held low beneath a dominant white wordmark and ceremonial scene.','Onion lying within a dark ritual landscape beneath a white spiked Onion wordmark',source('assets/styles/onion/black-metal-01-approved.jpeg',1122,1402,'59775c95dc2974b192e76fe9e75c1454860f8bbd90f3c7863e5037f049bb9cf5'),'assets/mockups/onion-black-metal/bm-01-front.webp'),
        artwork('02','Gothic Frame','Onion centred within dense, ornate architecture and engraved lettering.','Onion standing in an ornate gothic frame beneath an engraved Onion wordmark',source('assets/styles/onion/black-metal-02-approved.jpeg',1122,1402,'f3e24bb41e201324c05d805e8740e2c1389feef876c9618a49d5f4910eae2180'),'assets/mockups/onion-black-metal/bm-02-front.webp'),
        artwork('03','Moonlit Forest','A harder white wordmark, nocturnal forest and deliberate negative space.','Onion lying in a moonlit forest beneath an angular white Onion wordmark',source('assets/styles/onion/black-metal-03-approved.jpeg',1254,1254,'7f47c2e7e7208ede3f4e90e6247d1adecf785bc9523228268314336cdde0cf47'),'assets/mockups/onion-black-metal/bm-03-front.webp')
      ]
    },
    goregrind:{
      order:2,row:1,slug:'goregrind',code:'GG',name:'Goregrind',accent:'#d9ff42',
      tagline:'ANATOMY, PANIC, ACID COLOUR.',
      lead:'Three directions push Onion through hand-inked specimen chaos, surgical white space and fluorescent contamination. The visual language changes, but the pet stays unmistakably central.',
      artworkIntro:'The approved row moves from hand-drawn pathology to clinical white space and acid zine colour without losing Onion as the anchor.',
      standardQuote:'Obsessively illustrated and chemically unstable, with the animal anchoring every detail.',
      artworks:[
        artwork('01','Contaminated Field','Onion reclines among tangled roots, specimen jars and anatomical fragments beneath a dense organic wordmark.','Onion reclining among tangled pathology illustrations beneath a dense organic wordmark',null,'assets/mockups/onion-goregrind/goregrind-01-front.webp'),
        artwork('02','Clinical Thorn','A stark ink study isolates Onion beneath lettering that twists like barbed tissue.','A black ink study of reclining Onion beneath a thorn-like biological wordmark on white',null,'assets/mockups/onion-goregrind/goregrind-02-front.webp'),
        artwork('03','Acid Specimen','Neon slime lettering, warning labels and luminous jars turn Onion into the centre of a radioactive zine page.','Standing Onion inside a fluorescent green and pink specimen-zine collage',source('assets/styles/onion/goregrind-03-approved.jpeg',1024,1536,'81835510e358f585cc1ab16727139caaee5a5e668d07a7f38a2e003e7a66a1d8'),'assets/mockups/onion-goregrind/goregrind-03-front.webp')
      ]
    },
    grindcore:{
      order:3,row:2,slug:'grindcore',code:'GC',name:'Grindcore',accent:'#f1ede6',
      tagline:'ZERO POLISH. MAXIMUM IMPACT.',
      lead:'Onion is pushed through three high-contrast routes: paint blast, photocopied close-up and barricade collage. Each feels fast, abrasive and readable by silhouette before detail.',
      artworkIntro:'Three exact locked directions compress the name, portrait and scene language into a blunt monochrome hit.',
      standardQuote:'If the pet does not hit at thumbnail scale, it is not Grindcore.',
      artworks:[
        artwork('01','Paint Detonation','A reclining Onion sits beneath a white wordmark that erupts and drips across solid black.','Reclining Onion beneath an exploding white Onion wordmark on black',null,'assets/mockups/onion-grindcore/grindcore-01-front.webp'),
        artwork('02','Xerox Pressure','Onion’s face fills a scoured photocopy field beneath degraded, rain-streaked lettering.','Close portrait of Onion inside a degraded black-and-white photocopy field',source('assets/styles/onion/grindcore-02-approved.jpeg',1254,1254,'705083367c5f2b338d92a6189fe7330cdc742b7108a9ef217942f2fd5111ed92'),'assets/mockups/onion-grindcore/grindcore-02-front.webp'),
        artwork('03','Barricade Portrait','Barbed wire, skull fragments and a crossed-out emblem frame Onion beneath a hard white masthead.','Onion framed by skulls and rough symbols in a black-and-white grindcore poster',source('assets/styles/onion/grindcore-03-approved.jpeg',1122,1402,'2aef176dd893076a2df29afffa98138040821ad51810941dfa2c691112876481'),'assets/mockups/onion-grindcore/grindcore-03-front.webp')
      ]
    },
    'crust-punk':{
      order:4,row:3,slug:'crust-punk',code:'CP',name:'Crust Punk',accent:'#b99b72',
      tagline:'PATCHED, STITCHED, UNAPOLOGETIC.',
      lead:'Three cloth-panel compositions turn Onion into a worn emblem rather than a polished portrait. Rough thread, cracked ink and hand-built lettering make every direction feel handled and lived in.',
      artworkIntro:'The approved sources treat the image as cloth, ink and repair—not a clean graphic floating above the garment.',
      standardQuote:'Repaired and lived in; Onion belongs to the cloth, never on top of it.',
      artworks:[
        artwork('01','Face Patch','Onion’s head becomes a stark central badge inside a heavily repaired black panel.','Onion portrait stitched into a distressed black crust-punk patch',source('assets/styles/onion/crust-punk-01-approved.jpeg',1121,1403,'0beaac31e9083866e08458135442383d7d2ea708d546a2a03197aaf5b02a528a'),'assets/mockups/onion-crust-punk/crust-punk-01-front.webp'),
        artwork('02','Peace Block','A full-body portrait, oversized type and a rough peace mark collide inside bright stitched borders.','Reclining Onion with oversized lettering and a rough peace mark on a stitched patch',null,'assets/mockups/onion-crust-punk/crust-punk-02-front.webp'),
        artwork('03','Field Banner','Onion stands against scraped black ground beneath angular hand-marked lettering.','Standing Onion beneath angular hand-drawn lettering on a brown-black cloth panel',null,'assets/mockups/onion-crust-punk/crust-punk-03-front.webp')
      ]
    },
    powerviolence:{
      order:5,row:4,slug:'powerviolence',code:'PV',name:'Powerviolence',accent:'#ff5a36',
      tagline:'SHORT FORM. FULL FORCE.',
      lead:'The scene cuts Onion into a gig-flyer announcement, a torn contact-sheet collage and a stark brush-field portrait. Every route strips away polish and keeps the impact immediate.',
      artworkIntro:'The three approved artworks use hard crops, huge type and damaged reproduction as deliberate composition tools.',
      standardQuote:'The pet, name and attitude compressed into one immediate hit.',
      artworks:[
        artwork('01','Dog Gig Notice','Monumental type, clipped event copy and a small reclining Onion create a brutally direct DIY flyer.','Black-and-white dog gig flyer with huge Onion type and a small reclining Onion',source('assets/styles/onion/powerviolence-01-approved.jpeg',1054,1492,'c89dda3b217f5c3d622097878872fa82e0a670719baaf66e072c4993a6a08396'),'assets/mockups/onion-powerviolence/powerviolence-01-front.webp'),
        artwork('02','Torn Contact Sheet','Repeated profile studies surround Onion inside a ripped, taped and heavily photocopied composition.','Side-profile Onion inside a torn black-and-white photocopy collage',null,'assets/mockups/onion-powerviolence/powerviolence-02-front.webp'),
        artwork('03','Black Brush Portrait','A frontal Onion portrait interrupts a single violent black sweep beneath hand-cut lettering.','Onion portrait emerging from a diagonal black brush field beneath white lettering',null,'assets/mockups/onion-powerviolence/powerviolence-03-front.webp')
      ]
    },
    'gore-noise':{
      order:6,row:5,slug:'gore-noise',code:'GN',name:'Gore Noise',accent:'#e21f2f',
      tagline:'SIGNAL RED. DETAIL BURIED.',
      lead:'Onion appears as a confrontational red portrait, a sleeping figure across a corrupted collage and an archival black-and-white panel. Repetition, overload and visual abrasion create three distinct densities.',
      artworkIntro:'The locked sequence escalates from saturated portrait to corrupted transmission and archival overload.',
      standardQuote:'Overdriven and deliberate, with Onion holding the composition through the distortion.',
      artworks:[
        artwork('01','Red Signal','Onion’s face rises from a saturated red field beneath an almost obliterated organic mark.','Close Onion portrait rising from a saturated red and black noise field',source('assets/styles/onion/gore-noise-01-approved.jpeg',1149,1369,'ffb9da3dbc818392edb2f239a878c4df41b81d6e3325cfe526a4f746f2ac9a4a'),'assets/mockups/onion-gore-noise/gore-noise-01-front.webp'),
        artwork('02','Sleep Transmission','A sleeping Onion stretches across stacked fragments, repeated portraits and dripping black lettering.','Sleeping Onion across a saturated red corrupted collage',source('assets/styles/onion/gore-noise-02-approved.png',404,511,'de53c4da7a2ad190a34b8984d05e1f8597eae8072f8716fef45ccf7a611a1767'),'assets/mockups/onion-gore-noise/gore-noise-02-front.webp'),
        artwork('03','Archive Collapse','Onion curls inside a dense monochrome frame of diagrams, panels and degraded textures.','Curled Onion inside a dense black-and-white archival noise collage',null,'assets/mockups/onion-gore-noise/gore-noise-03-front.webp')
      ]
    },
    'rap-bootleg':{
      order:7,row:6,slug:'rap-bootleg',code:'RB',name:'Rap Bootleg',accent:'#d9a230',
      tagline:'FROM BLOCK WALL TO BIG SCREEN.',
      lead:'Three bootleg-cover worlds move Onion from raw flash-lit grit to gilded estate fantasy and chrome-blue city drama. The pet carries star billing in every frame; scale, spectacle and lettering do the rest.',
      artworkIntro:'The approved set treats Onion as the headline artist across grit, gold and chrome cover worlds.',
      standardQuote:'Unapologetic star treatment: the pet owns the cover, never a novelty cameo.',
      artworks:[
        artwork('01','Blockside Flash','Onion lies against a stained wall beneath rough red lettering and hard, documentary-style light.','Onion lying by a stained wall beneath rough red Onion lettering',source('assets/styles/onion/rap-bootleg-01-approved.jpeg',1254,1254,'fcb33cb5ab2becc824dc200f3aa33de285d030d5c4e9f82ac39b10f4e2c2f849'),'assets/mockups/onion-rap-bootleg/rap-bootleg-01-front.webp'),
        artwork('02','Gilded Estate','Gold type, fountains and mansion architecture frame Onion as the centre of an extravagant cover fantasy.','Onion in front of a mansion and fountains beneath large gold lettering',source('assets/styles/onion/rap-bootleg-02-approved.jpeg',1254,1254,'77f85b27a7d370109ffee98060c77f4efe28cbe8f7d1e99dbf699cd64bfacb70'),'assets/mockups/onion-rap-bootleg/rap-bootleg-02-front.webp'),
        artwork('03','Chrome City','Metallic lettering, skyline lights and blue smoke build a cinematic city portrait around Onion.','Onion in a blue and orange city scene beneath chrome lettering',source('assets/styles/onion/rap-bootleg-03-approved.jpeg',1254,1254,'ad96a8c98424429dd2a09e7cf7513e74e0002bdb55ca45bcd2fd61ca952fd03e'),'assets/mockups/onion-rap-bootleg/rap-bootleg-03-front.webp')
      ]
    },
    'death-metal':{
      order:8,row:7,slug:'death-metal',code:'DM',name:'Death Metal',accent:'#b68a3c',
      tagline:'DECAY, MONUMENT, IMPACT.',
      lead:'Onion moves through an intricate organic web, a ruined-city cover and a dripping forest portrait. Each direction balances near-illegible lettering with an instantly readable central figure.',
      artworkIntro:'The approved triptych moves between microscopic decay, monumental ruin and a stark woodland portrait.',
      standardQuote:'Dense enough to study and direct enough to strike from across the room.',
      artworks:[
        artwork('01','Carrion Web','Onion lies inside dense, gold-flecked organic linework beneath a knotted decaying logo.','Onion lying inside dense gold organic linework beneath a decaying logo',source('assets/styles/onion/death-metal-01-approved.jpeg',1254,1254,'8557c91fc363fc63b0e0c899948ef00299a8b388fcb8d39c08764982a2f56802'),'assets/mockups/onion-death-metal/death-metal-01-front.webp'),
        artwork('02','Ruined Dominion','Onion holds the foreground of a devastated city beneath a vast bone-white wordmark.','Onion in a devastated city beneath a huge decayed white wordmark',null,'assets/mockups/onion-death-metal/death-metal-02-front.webp'),
        artwork('03','Dripping Forest','A frontal portrait emerges from black woodland beneath sharp, melting white lettering.','Frontal Onion portrait emerging from dark woods beneath a melting white logo',source('assets/styles/onion/death-metal-03-approved.jpeg',1254,1254,'a3e5237a82e3d45b42dc387723a87cd52de077bc7b64d3298ee79fec09f724e7'),'assets/mockups/onion-death-metal/death-metal-03-front.webp')
      ]
    },
    'doom-metal':{
      order:9,row:8,slug:'doom-metal',code:'DO',name:'Doom Metal',accent:'#79518f',
      tagline:'HEAVY AIR. SLOW BURN.',
      lead:'Three slower, weightier worlds place Onion inside gothic architecture, psychedelic heat and a violet deadwood forest. The scale is monumental, the movement deliberate and the mood allowed to linger.',
      artworkIntro:'The exact locked set gives Onion room to loom across gothic structure, molten colour and deadwood atmosphere.',
      standardQuote:'Fewer gestures, heavier atmosphere, no rushed detail.',
      artworks:[
        artwork('01','Gothic Reliquary','Onion stands within an ornate cathedral frame beneath severe engraved lettering.','Onion standing inside an ornate gothic frame beneath engraved lettering',source('assets/styles/onion/black-metal-02-approved.jpeg',1122,1402,'f3e24bb41e201324c05d805e8740e2c1389feef876c9618a49d5f4910eae2180'),'assets/mockups/onion-doom-metal/doom-metal-01-front.webp'),
        artwork('02','Molten Reverie','A reclining Onion sits against flowing ochre currents and smoke-like purple type.','Reclining Onion against molten ochre waves beneath purple lettering',source('assets/styles/onion/doom-metal-02-approved.jpeg',900,900,'fb451ccf2cf3aec63d488ea52ec6f758575d4c4d8e35e7638c1fceb66863bf27'),'assets/mockups/onion-doom-metal/doom-metal-02-front.webp'),
        artwork('03','Forest Monolith','Onion rests in a deadwood forest beneath a massive weathered wordmark.','Onion resting in a dark deadwood forest beneath a monumental wordmark',source('assets/styles/onion/doom-metal-03-approved.jpeg',1254,1254,'699c7bab66b4c91629c7019efd7b7e98c707a0b3f28e6977318316716e236a85'),'assets/mockups/onion-doom-metal/doom-metal-03-front.webp')
      ]
    }
  };

  Object.values(scenes).forEach(scene=>scene.artworks.forEach((item,col)=>Object.assign(item,{row:scene.row,col})));
  window.BESTIEBOYS_ONION={sprite,scenes,ordered:Object.values(scenes).sort((a,b)=>a.order-b.order)};
})();
