from pathlib import Path
import re

# 1) Theme switcher: ONLY the three selected website references.
p = Path('theme-lab.js')
s = p.read_text(encoding='utf-8')
new_themes = """const themes = [
    ['slategrind','Slate Grind','Charcoal / dirty bone / rust / rough surface'],
    ['silvernoise','Silver Noise','Brushed steel / industrial plate / black'],
    ['xerox','Xerox','Dirty copier paper / toner / ripped flyer']
  ];"""
s, n = re.subn(r"const themes = \[.*?\n  \];", new_themes, s, count=1, flags=re.S)
if n != 1:
    raise SystemExit('Could not replace theme list')

# Stop loading the old layered Design Lab CSS files from JavaScript.
s, n = re.subn(
    r"\n  if \(!document\.querySelector\('link\[data-design-lab-v3\]'\)\) \{.*?\n  \}\n\n  const saved",
    "\n\n  const saved",
    s,
    count=1,
    flags=re.S,
)
if n != 1:
    raise SystemExit('Could not remove old Design Lab CSS loaders')

s = s.replace('Four website reference directions', 'Three selected website directions')
p.write_text(s, encoding='utf-8')

# 2) Load Design Lab v6 directly from the document, before JS executes.
idx = Path('index.html')
h = idx.read_text(encoding='utf-8')
link = '<link rel="stylesheet" href="design-lab-v6.css?v=1">'
if link not in h:
    anchor = '<link rel="stylesheet" href="theme-lab.css?v=7">'
    if anchor not in h:
        raise SystemExit('theme-lab.css anchor missing')
    h = h.replace(anchor, anchor + '\n' + link, 1)

h, n = re.subn(r'theme-lab\.js\?v=[^\"\']+', 'theme-lab.js?v=designlab6', h, count=1)
if n != 1:
    raise SystemExit('theme-lab.js script reference not found')
idx.write_text(h, encoding='utf-8')

# 3) Remove temporary/failed Design Lab workflows if present.
for old in [
    Path('.github/workflows/apply-design-lab-v5.yml'),
    Path('.github/workflows/apply-design-lab-v5-fix.yml'),
    Path('.github/workflows/apply-design-lab-v6.yml'),
    Path('.tmp/apply_designlab6.py'),
]:
    if old.exists():
        old.unlink()
