from pathlib import Path
p = Path('index.html')
text = p.read_text()
if 'theme-lab.css' not in text:
    text = text.replace('</head>', '<link rel="stylesheet" href="theme-lab.css">\n</head>', 1)
if 'theme-lab.js' not in text:
    text = text.replace('</body>', '<script src="theme-lab.js"></script>\n</body>', 1)
p.write_text(text)
