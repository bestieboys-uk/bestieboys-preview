from pathlib import Path

p = Path('index.html')
s = p.read_text()

silver = '<link rel="stylesheet" href="silver-reference-v2.css?v=1">'
if silver not in s:
    raise SystemExit('silver reference link not found')

bundle = '''<link rel="stylesheet" href="silver-reference-v2.css?v=2">\n<link rel="stylesheet" href="slate-reference-v1.css?v=1">\n<link rel="stylesheet" href="xerox-reference-v1.css?v=1">'''
s = s.replace(silver, bundle, 1)

# Force the top-level theme script to refresh too.
import re
s = re.sub(r'theme-lab\.js\?v=[^\"\']+', 'theme-lab.js?v=referencebatch1', s, count=1)

p.write_text(s)
