import { META_UPGRADES } from './upgrades.js';
import { META_COST, COLORS, CURRENCY } from './constants.js';
import { CHARACTERS, getCharacter } from './characters.js';
import { SFX } from './audio.js';

const $ = (sel) => document.querySelector(sel);

export function initUI(handlers) {
  const screens = {
    menu: $('#screen-menu'),
    how: $('#screen-how'),
    shop: $('#screen-shop'),
    chars: $('#screen-chars'),
    level: $('#screen-level'),
    pause: $('#screen-pause'),
    death: $('#screen-death'),
    victory: $('#screen-victory'),
    hud: $('#hud'),
    bossBanner: $('#boss-banner'),
    evolveToast: $('#evolve-toast'),
  };

  function show(name) {
    for (const [k, el] of Object.entries(screens)) {
      if (!el || k === 'hud' || k === 'bossBanner' || k === 'evolveToast') continue;
      el.classList.toggle('active', k === name);
    }
  }

  function hideAllModals() {
    for (const k of ['level', 'pause', 'death', 'victory', 'how', 'shop', 'chars']) {
      screens[k]?.classList.remove('active');
    }
  }

  $('#btn-play')?.addEventListener('click', () => { SFX.ui(); handlers.onPlay(); });
  $('#btn-how')?.addEventListener('click', () => { SFX.ui(); show('how'); });
  $('#btn-shop')?.addEventListener('click', () => { SFX.ui(); handlers.onOpenShop(); });
  $('#btn-chars')?.addEventListener('click', () => { SFX.ui(); handlers.onOpenChars(); });
  $('#btn-how-back')?.addEventListener('click', () => { SFX.ui(); show('menu'); });
  $('#btn-shop-back')?.addEventListener('click', () => { SFX.ui(); show('menu'); handlers.onRefreshMenu(); });
  $('#btn-chars-back')?.addEventListener('click', () => { SFX.ui(); show('menu'); handlers.onRefreshMenu(); });
  $('#btn-pause')?.addEventListener('click', () => { SFX.ui(); handlers.onPause(); });
  $('#btn-resume')?.addEventListener('click', () => { SFX.ui(); handlers.onResume(); });
  $('#btn-quit')?.addEventListener('click', () => { SFX.ui(); handlers.onQuit(); });
  $('#btn-retry')?.addEventListener('click', () => { SFX.ui(); handlers.onPlay(); });
  $('#btn-death-shop')?.addEventListener('click', () => { SFX.ui(); handlers.onOpenShop(); });
  $('#btn-death-chars')?.addEventListener('click', () => { SFX.ui(); handlers.onOpenChars(); });
  $('#btn-death-menu')?.addEventListener('click', () => { SFX.ui(); handlers.onQuit(); });
  $('#btn-win-retry')?.addEventListener('click', () => { SFX.ui(); handlers.onPlay(); });
  $('#btn-next')?.addEventListener('click', () => { SFX.ui(); handlers.onNext(); });
  $('#btn-win-shop')?.addEventListener('click', () => { SFX.ui(); handlers.onOpenShop(); });
  $('#btn-win-chars')?.addEventListener('click', () => { SFX.ui(); handlers.onOpenChars(); });
  $('#btn-win-menu')?.addEventListener('click', () => { SFX.ui(); handlers.onQuit(); });
  $('#btn-clear-save')?.addEventListener('click', () => {
    SFX.ui();
    if (confirm('Clear ALL save data? This cannot be undone.')) {
      handlers.onClearSave();
    }
  });

  return {
    screens,
    show,
    hideAllModals,
    showMenu() {
      hideAllModals();
      show('menu');
      screens.hud.classList.add('hidden');
      screens.bossBanner.classList.add('hidden');
    },
    showHud() {
      screens.hud.classList.remove('hidden');
    },
    hideHud() {
      screens.hud.classList.add('hidden');
    },
    updateHud(data) {
      const hpPct = Math.max(0, data.hp / data.maxHp) * 100;
      const xpPct = Math.max(0, Math.min(100, data.progress || 0));
      $('#hp-fill').style.width = hpPct + '%';
      $('#xp-fill').style.width = xpPct + '%';
      $('#hud-level').textContent = 'STAGE ' + data.stage;
      $('#hud-time').textContent = formatTime(data.time);
      $('#hud-kills').textContent = data.kills + ' kills';
      if (data.charName) $('#hud-char').textContent = data.charName + ' ×' + data.squad;
      if (data.boss) {
        $('#boss-hp-wrap').classList.remove('hidden');
        $('#boss-hp-fill').style.width = (data.boss.hp / data.boss.maxHp * 100) + '%';
        $('#boss-hp-name').textContent = data.boss.name;
      } else {
        $('#boss-hp-wrap').classList.add('hidden');
      }
    },
    showLevelUp(cards, onPick) {
      const wrap = $('#level-cards');
      wrap.innerHTML = '';
      cards.forEach((c, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'upgrade-card rarity-' + c.rarity.toLowerCase();
        btn.innerHTML = `
          <span class="rarity-tag">${c.rarity}</span>
          <span class="card-name">${c.name}</span>
          <span class="card-desc">${c.desc}</span>
          <span class="card-preview">${c.previewText || ''}</span>
        `;
        btn.addEventListener('click', () => { SFX.level(); onPick(i); });
        wrap.appendChild(btn);
      });
      screens.level.classList.add('active');
    },
    hideLevelUp() { screens.level.classList.remove('active'); },
    showPause() { screens.pause.classList.add('active'); },
    hidePause() { screens.pause.classList.remove('active'); },
    showDeath(summary) {
      $('#death-time').textContent = formatTime(summary.time);
      $('#death-kills').textContent = summary.kills;
      $('#death-level').textContent = summary.level;
      $('#death-score').textContent = summary.score;
      $('#death-currency').textContent = '+' + summary.currency;
      $('#death-best').textContent = formatTime(summary.bestTime);
      screens.death.classList.add('active');
    },
    hideDeath() { screens.death.classList.remove('active'); },
    showVictory(summary) {
      $('#win-time').textContent = formatTime(summary.time);
      $('#win-kills').textContent = summary.kills;
      $('#win-level').textContent = summary.squad;
      $('#win-score').textContent = summary.score;
      $('#win-currency').textContent = '+' + summary.currency;
      $('#win-best').textContent = summary.bestStage;
      $('#win-boss').textContent = summary.boss + ' DEFEATED.';
      $('#btn-next').textContent = summary.stage < 3 ? 'NEXT LEVEL' : 'WALK COMPLETE · REPLAY';
      screens.victory.classList.add('active');
    },
    hideVictory() { screens.victory.classList.remove('active'); },
    showBossBanner(name) {
      screens.bossBanner.textContent = name;
      screens.bossBanner.classList.remove('hidden');
      screens.bossBanner.classList.add('show');
      setTimeout(() => {
        screens.bossBanner.classList.remove('show');
        setTimeout(() => screens.bossBanner.classList.add('hidden'), 400);
      }, 2200);
    },
    showEvolve(name) {
      const el = screens.evolveToast;
      el.textContent = 'EVOLUTION: ' + name;
      el.classList.remove('hidden');
      el.classList.add('show');
      setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => el.classList.add('hidden'), 400);
      }, 2500);
    },
    renderShop(data, onBuy) {
      $('#shop-currency').textContent = data.currency;
      const list = $('#shop-list');
      list.innerHTML = '';
      META_UPGRADES.forEach(u => {
        const rank = data.meta[u.id] || 0;
        const cost = META_COST[Math.min(rank, META_COST.length - 1)];
        const maxed = rank >= u.max;
        const row = document.createElement('button');
        row.type = 'button';
        row.className = 'shop-row' + (maxed ? ' maxed' : '');
        row.disabled = maxed || data.currency < cost;
        row.innerHTML = `
          <div class="shop-info">
            <strong>${u.name}</strong>
            <span>${u.desc}</span>
            <span class="shop-rank">Rank ${rank}/${u.max}</span>
          </div>
          <div class="shop-cost">${maxed ? 'MAX' : cost + ' ' + CURRENCY}</div>
        `;
        if (!maxed) {
          row.addEventListener('click', () => { SFX.buy(); onBuy(u.id, cost); });
        }
        list.appendChild(row);
      });
      show('shop');
    },
    renderChars(data, onSelect) {
      const grid = $('#char-grid');
      grid.innerHTML = '';
      CHARACTERS.forEach((c) => {
        const unlocked = (data.unlockedCharacters || []).includes(c.id);
        const selected = data.selectedCharacter === c.id;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'char-card' + (selected ? ' selected' : '');
        btn.disabled = !unlocked;
        btn.innerHTML = `
          <span class="char-art-wrap">
            <img class="char-portrait" src="assets/cards/${c.id}.webp" alt="${c.name} character artwork" width="180" height="220" />
            <span class="char-number">${String(CHARACTERS.indexOf(c) + 1).padStart(2, '0')}</span>
          </span>
          <strong>${c.name}</strong>
          <span class="char-tagline">${c.tagline}</span>
        `;
        if (unlocked) {
          btn.addEventListener('click', () => { SFX.ui(); onSelect(c.id); });
        }
        grid.appendChild(btn);
      });
      show('chars');
    },
    refreshMenuStats(data) {
      $('#menu-currency').textContent = data.currency + ' ' + CURRENCY;
      $('#menu-best').textContent = 'Best stage ' + (data.bestStage || 1);
      const ch = getCharacter(data.selectedCharacter);
      $('#menu-char').textContent = 'Playing as ' + ch.name;
      $('#menu-pet-image').src = 'assets/cards/' + ch.id + '.webp';
    },
  };
}

export function formatTime(s) {
  s = Math.floor(s);
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return m + ':' + String(ss).padStart(2, '0');
}

/** Forced-perspective grey bridge over bright blue water (Evony-ad look) */
export function drawBackground(ctx, w, h, t, shake) {
  ctx.save();
  const shakeAmp = (shake && shake > 0) ? shake * 22 : 0;
  if (shakeAmp > 0) {
    ctx.translate((Math.random() - 0.5) * shakeAmp, (Math.random() - 0.5) * shakeAmp);
  }

  // Bright blue water fills entire backdrop
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#7ad8ff');
  sky.addColorStop(0.35, '#3eb4e8');
  sky.addColorStop(1, '#1a88c4');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Water shimmer scrolling "forward"
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 10; i++) {
    const y = ((i * 55 + t * 55) % (h + 50)) - 25;
    ctx.fillRect(0, y, w, 8);
  }
  ctx.globalAlpha = 1;

  // Perspective trapezoid bridge — narrow at top, wide at bottom
  const topW = Math.min(w * 0.34, 140);
  const botW = Math.min(w * 0.88, 380);
  const topL = (w - topW) / 2, topR = (w + topW) / 2;
  const botL = (w - botW) / 2, botR = (w + botW) / 2;

  // Bridge body
  const pathGrad = ctx.createLinearGradient(0, 0, w, 0);
  pathGrad.addColorStop(0, '#6e727a');
  pathGrad.addColorStop(0.5, '#b4b8c0');
  pathGrad.addColorStop(1, '#6e727a');
  ctx.fillStyle = pathGrad;
  ctx.beginPath();
  ctx.moveTo(topL, 0);
  ctx.lineTo(topR, 0);
  ctx.lineTo(botR, h);
  ctx.lineTo(botL, h);
  ctx.closePath();
  ctx.fill();

  // Darker edge strips
  ctx.fillStyle = 'rgba(40,44,52,0.35)';
  ctx.beginPath();
  ctx.moveTo(topL, 0); ctx.lineTo(topL + topW * 0.08, 0);
  ctx.lineTo(botL + botW * 0.08, h); ctx.lineTo(botL, h);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(topR - topW * 0.08, 0); ctx.lineTo(topR, 0);
  ctx.lineTo(botR, h); ctx.lineTo(botR - botW * 0.08, h);
  ctx.closePath(); ctx.fill();

  // White foam / railing edges
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(topL, 0); ctx.lineTo(botL, h);
  ctx.moveTo(topR, 0); ctx.lineTo(botR, h);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(topL + 6, 0); ctx.lineTo(botL + 10, h);
  ctx.moveTo(topR - 6, 0); ctx.lineTo(botR - 10, h);
  ctx.stroke();

  // Perspective lane dashes scrolling UP-feel (offset by time)
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 3;
  ctx.setLineDash([18, 22]);
  ctx.lineDashOffset = t * 90;
  ctx.beginPath();
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2, h);
  ctx.stroke();
  ctx.setLineDash([]);

  // Horizontal perspective planks
  ctx.strokeStyle = 'rgba(0,0,0,0.12)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 14; i++) {
    const tt = ((i / 14) + (t * 0.08) % 0.08);
    const y = tt * tt * h; // denser near top = foreshortening
    const l = topL + (botL - topL) * (y / h);
    const r = topR + (botR - topR) * (y / h);
    ctx.beginPath();
    ctx.moveTo(l, y); ctx.lineTo(r, y);
    ctx.stroke();
  }

  // Side water sparkles
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  for (let i = 0; i < 18; i++) {
    const side = i % 2 === 0;
    const y = ((i * 47 + t * 40) % h);
    const l = topL + (botL - topL) * (y / h);
    const r = topR + (botR - topR) * (y / h);
    const x = side
      ? Math.random() * Math.max(4, l - 4)
      : r + 4 + Math.random() * Math.max(4, w - r - 8);
    // deterministic-ish
    const xx = side
      ? ((i * 53 + t * 30) % Math.max(8, l - 4))
      : (r + 4 + ((i * 61 + t * 25) % Math.max(8, w - r - 8)));
    ctx.beginPath();
    ctx.arc(xx, y, 1.6 + (i % 3) * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
  return shake;
}
