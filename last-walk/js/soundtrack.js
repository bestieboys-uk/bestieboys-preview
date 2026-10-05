/* THE CORPSE / WOGGHEAD — official SoundCloud soundtrack bridge */
const PROFILE_URL = 'https://soundcloud.com/wogghead';
const PLAYER_URL = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(PROFILE_URL) + '&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false';
let frame=null, widget=null, wanted=false, muted=false, ready=false;

function ensurePlayer(){
  if(frame)return;
  frame=document.createElement('iframe');
  frame.id='soundcloud-soundtrack';frame.title='The Corpse soundtrack';frame.allow='autoplay';frame.tabIndex=-1;
  frame.style.cssText='position:fixed;width:1px;height:1px;left:-20px;bottom:-20px;border:0;opacity:.01;pointer-events:none';
  frame.src=PLAYER_URL;document.body.appendChild(frame);
  const connect=()=>{
    if(!window.SC?.Widget)return;
    widget=window.SC.Widget(frame);
    widget.bind(window.SC.Widget.Events.READY,()=>{ready=true;frame.dataset.state='ready';widget.setVolume(muted?0:12);if(wanted&&!muted)widget.play();});
    widget.bind(window.SC.Widget.Events.PLAY,()=>{frame.dataset.state='playing';});
    widget.bind(window.SC.Widget.Events.PAUSE,()=>{frame.dataset.state='paused';});
    widget.bind(window.SC.Widget.Events.FINISH,()=>{if(!wanted||muted)return;widget.next();setTimeout(()=>widget.play(),120);});
  };
  if(window.SC?.Widget){connect();return;}
  const script=document.createElement('script');script.src='https://w.soundcloud.com/player/api.js';script.async=true;script.onload=connect;document.head.appendChild(script);
}

export function startSoundtrack(){wanted=true;ensurePlayer();if(ready&&widget&&!muted){widget.setVolume(12);widget.play();}}
export function setSoundtrackMuted(value){muted=!!value;if(!widget||!ready)return;widget.setVolume(muted?0:12);if(muted)widget.pause();else if(wanted)widget.play();}
