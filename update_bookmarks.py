import re

categorizations = {
  "home": ["Gemini", "Gmail", "YouTube", "AmazonSmile", "S&P 500 Map"],
  "ai": ["ChatGPT", "DeepSeek", "Playground", "NotebookLM", "Magic Eraser", "AI Image Enlarger", "Astria", "Cleanup.pictures", "DALL·E", "Thing Translator", "Suno", "ElevenLabs", "Udio", "SOUNDRAW", "Mubert", "Vapi Dashboard", "DeepSeek Platform", "Stitch", "AI Studio", "Whisk", "Flow"],
  "gnomad": ["Gnomad Studio", "DTG.ORG", "Strategic AI", "Analytics", "Play Console", "LegalZoom", "Square", "The Hartford", "D&B", "Citizens Bank"],
  "web": ["Hostinger", "GitHub", "Vercel", "Resend", "Supabase Docs", "Supabase Auth", "RefractWeb"],
  "david": ["Audible"],
  "finance": ["Robinhood", "Coinbase", "BlockFi", "Fidelity Invest", "Webull", "NiceHash", "Fidelity NetBenefits", "Charles Schwab", "Truist Login", "F&M Bank"],
  "bills": ["Ollo Card", "Merrick Bank", "BuyPower Card", "First PREMIER", "Ozarks Electric", "Fayetteville Water", "GEICO"],
  "terra": ["Names on Terraluna", "Reference Table", "ORCS", "Minotaur of Terraluna", "Discovery of Mithril", "Inkarnate Maps"]
}

def get_category(name):
    for cat, names in categorizations.items():
        if name in names:
            return cat
    return "home"

with open("src/data/bookmarks.ts", "r") as f:
    content = f.read()

# match every bookmark block { "name": "...", ... }
def replace_func(match):
    block = match.group(0)
    name_match = re.search(r'"name": "(.*?)"', block)
    if not name_match:
        return block
    name = name_match.group(1)
    cat = get_category(name)
    # Check if category already exists
    if '"category":' in block:
        return block
    
    # insert before the closing brace
    # or just add to the end of the block
    new_block = re.sub(r'\n    \}', f',\n        "category": "{cat}"\n    }}', block)
    return new_block

new_content = re.sub(r'\{\n        "name": [^{}]+\n    \}', replace_func, content)
new_content = new_content.replace('export interface Bookmark {', 'export interface Bookmark {\n    category?: string;')

with open("src/data/bookmarks.ts", "w") as f:
    f.write(new_content)
