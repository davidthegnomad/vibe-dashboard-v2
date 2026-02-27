export interface Bookmark {
    category?: string;
    subcategory?: string;
    name: string;
    url: string;
    domain: string;
    emoji?: string;
    faviconUrl?: string;
    description?: string;
}

export const BOOKMARKS: Bookmark[] = [
    { name: "Gemini", url: "https://gemini.google.com/app", domain: "gemini.google.com", category: "home", description: "Google's AI Assistant" },
    { name: "Gmail", url: "https://mail.google.com/mail/u/0/#inbox", domain: "mail.google.com", category: "home", description: "Primary email inbox" },
    { name: "YouTube", url: "https://www.youtube.com/", domain: "youtube.com", category: "home", description: "Video platform" },
    { name: "AmazonSmile", url: "https://smile.amazon.com/", domain: "amazon.com", category: "home" },
    { name: "S&P 500 Map", url: "https://finviz.com/map.ashx", domain: "finviz.com", category: "home" },

    // AI
    { name: "ChatGPT", url: "https://chat.openai.com/", domain: "chat.openai.com", category: "ai", subcategory: "Chatbots & LLMs" },
    { name: "DeepSeek", url: "https://chat.deepseek.com/", domain: "chat.deepseek.com", category: "ai", subcategory: "Chatbots & LLMs" },
    { name: "Playground", url: "https://beta.openai.com/playground", domain: "openai.com", category: "ai", subcategory: "Chatbots & LLMs" },
    { name: "AI Studio", url: "https://aistudio.google.com/prompts/new_chat", domain: "aistudio.google.com", category: "ai", subcategory: "Chatbots & LLMs" },
    { name: "DeepSeek Platform", url: "https://platform.deepseek.com/usage", domain: "deepseek.com", category: "ai", subcategory: "Chatbots & LLMs" },

    { name: "Magic Eraser", url: "https://magicstudio.com/magiceraser", domain: "magicstudio.com", category: "ai", subcategory: "Image & Generative Art" },
    { name: "AI Image Enlarger", url: "https://imglarger.com/", domain: "imglarger.com", category: "ai", subcategory: "Image & Generative Art" },
    { name: "Astria", url: "https://www.astria.ai/tunes", domain: "astria.ai", category: "ai", subcategory: "Image & Generative Art" },
    { name: "Cleanup.pictures", url: "https://cleanup.pictures/", domain: "cleanup.pictures", category: "ai", subcategory: "Image & Generative Art" },
    { name: "DALL·E", url: "https://labs.openai.com/", domain: "labs.openai.com", category: "ai", subcategory: "Image & Generative Art" },
    { name: "Thing Translator", url: "https://experiments.withgoogle.com/thing-translator", domain: "withgoogle.com", emoji: "📸", category: "ai", subcategory: "Image & Generative Art" },

    { name: "Suno", url: "https://suno.com/create?wid=default", domain: "suno.com", category: "ai", subcategory: "Audio & Music" },
    { name: "ElevenLabs", url: "https://elevenlabs.io/app/sound-effects/generate", domain: "elevenlabs.io", category: "ai", subcategory: "Audio & Music" },
    { name: "Udio", url: "https://www.udio.com/create", domain: "udio.com", category: "ai", subcategory: "Audio & Music" },
    { name: "SOUNDRAW", url: "https://soundraw.io/#pricing-section", domain: "soundraw.io", category: "ai", subcategory: "Audio & Music" },
    { name: "Mubert", url: "https://mubert.com/render/my-downloads", domain: "mubert.com", category: "ai", subcategory: "Audio & Music" },
    { name: "Vapi Dashboard", url: "https://dashboard.vapi.ai/", domain: "vapi.ai", category: "ai", subcategory: "Audio & Music" },

    { name: "NotebookLM", url: "https://notebooklm.google.com/", domain: "notebooklm.google.com", category: "ai", subcategory: "!Webdesign & Labs" },
    { name: "Stitch", url: "https://stitch.withgoogle.com/", domain: "withgoogle.com", category: "ai", subcategory: "!Webdesign & Labs" },
    { name: "Whisk", url: "https://labs.google/fx/tools/whisk", domain: "labs.google", category: "ai", subcategory: "!Webdesign & Labs" },
    { name: "Flow", url: "https://labs.google/fx/tools/flow", domain: "labs.google", category: "ai", subcategory: "!Webdesign & Labs" },

    // Gnomad
    { name: "Gnomad Studio", url: "https://gnomadstudio.org/", domain: "gnomadstudio.org", category: "gnomad", subcategory: "Websites", description: "Main portfolio and agency site for Gnomad Studio" },
    { name: "DTG.ORG", url: "https://davidthegnomad.org/", domain: "davidthegnomad.org", category: "gnomad", subcategory: "Websites", description: "Personal/Non-Profit parent organization site" },
    { name: "Strategic AI", url: "https://gnomad.studio/", domain: "gnomad.studio", category: "gnomad", subcategory: "Websites", description: "Secondary domain focused on B2B AI strategy" },

    { name: "Analytics", url: "https://analytics.google.com/analytics/web/", domain: "analytics.google.com", category: "gnomad", subcategory: "Operations" },
    { name: "Play Console", url: "https://play.google.com/console/u/0/developers/7154895037868970891/app-list", domain: "play.google.com", category: "gnomad", subcategory: "Operations" },
    { name: "LegalZoom", url: "https://www.legalzoom.com/my/account/bb083b69-6a40-4431-825f-bd61074382f1", domain: "legalzoom.com", category: "gnomad", subcategory: "Operations" },
    { name: "Square", url: "https://squareup.com/dashboard/balance/overview", domain: "squareup.com", category: "gnomad", subcategory: "Operations" },
    { name: "The Hartford", url: "https://business.thehartford.com/profile", domain: "thehartford.com", category: "gnomad", subcategory: "Operations" },
    { name: "D&B", url: "https://my.dnb.com/", domain: "my.dnb.com", category: "gnomad", subcategory: "Operations" },
    { name: "Citizens Bank", url: "https://beyond.thecitizensbank.net/", domain: "thecitizensbank.net", category: "gnomad", subcategory: "Operations" },

    // Web
    { name: "Hostinger", url: "https://hpanel.hostinger.com/", domain: "hostinger.com", category: "web", subcategory: "Hosting & Deploy" },
    { name: "Vercel", url: "https://vercel.com/new", domain: "vercel.com", category: "web", subcategory: "Hosting & Deploy" },
    { name: "Supabase Auth", url: "https://supabase.com/dashboard/project/faoxftlafbzpxqlmdvko/auth/users", domain: "supabase.com", category: "web", subcategory: "Hosting & Deploy" },

    { name: "GitHub", url: "https://github.com/davidthegnomad", domain: "github.com", category: "web", subcategory: "Tools" },
    { name: "Resend", url: "https://resend.com/domains/11ea8a99-b5ec-4f1b-bf07-bc120976ee90", domain: "resend.com", category: "web", subcategory: "Tools" },
    { name: "RefractWeb", url: "https://www.refractweb.com/", domain: "refractweb.com", category: "web", subcategory: "Tools" },

    { name: "Supabase Docs", url: "https://supabase.com/docs/guides/database/overview", domain: "supabase.com", category: "web", subcategory: "Docs" },

    // David
    { name: "Audible", url: "https://www.audible.com/lib", domain: "audible.com", category: "david", subcategory: "Entertainment" },

    // Finance
    { name: "Robinhood", url: "https://robinhood.com/", domain: "robinhood.com", category: "finance", subcategory: "Investing & Crypto" },
    { name: "Coinbase", url: "https://www.coinbase.com/dashboard", domain: "coinbase.com", category: "finance", subcategory: "Investing & Crypto" },
    { name: "BlockFi", url: "https://app.blockfi.com/signin", domain: "blockfi.com", category: "finance", subcategory: "Investing & Crypto" },
    { name: "Fidelity Invest", url: "https://login.fidelity.com/ftgw/Fidelity/RtlCust/Login/Init", domain: "fidelity.com", category: "finance", subcategory: "Investing & Crypto" },
    { name: "Webull", url: "https://invest.webull.com/auth/simple/login", domain: "webull.com", category: "finance", subcategory: "Investing & Crypto" },
    { name: "NiceHash", url: "https://www.nicehash.com/my/dashboard", domain: "nicehash.com", category: "finance", subcategory: "Investing & Crypto" },
    { name: "Charles Schwab", url: "https://client.schwab.com/app/service/nextsteps/#/home/TW_S3_MAS", domain: "schwab.com", category: "finance", subcategory: "Investing & Crypto" },

    { name: "Fidelity NetBenefits", url: "https://nb.fidelity.com/static/mybenefits/netbenefitslogin/#/login", domain: "fidelity.com", category: "finance", subcategory: "Banking" },
    { name: "Truist Login", url: "https://dias.bank.truist.com/ui/login?redirecturi=%2Fweb%2Fhome", domain: "truist.com", category: "finance", subcategory: "Banking" },
    { name: "F&M Bank", url: "https://www.mebanking.com/", domain: "mebanking.com", category: "finance", subcategory: "Banking" },

    // Bills
    { name: "Ollo Card", url: "https://www.ollocard.com/", domain: "ollocard.com", category: "bills", subcategory: "Credit Cards" },
    { name: "Merrick Bank", url: "https://logon.merrickbank.com/core/Home/LogOut", domain: "merrickbank.com", category: "bills", subcategory: "Credit Cards" },
    { name: "BuyPower Card", url: "https://www.buypowercard.com/login/", domain: "buypowercard.com", emoji: "⚡", category: "bills", subcategory: "Credit Cards" },
    { name: "First PREMIER", url: "https://www.mypremiercreditcard.com/login.aspx", domain: "mypremiercreditcard.com", emoji: "💳", category: "bills", subcategory: "Credit Cards" },

    { name: "Ozarks Electric", url: "https://ozarksecc.smarthub.coop/#VVNFUl9JRDpkcGNvbGVwaG9uZUBnbWFpbC5jb206", domain: "ozarksecc.smarthub.coop", emoji: "⚡", category: "bills", subcategory: "Utilities" },
    { name: "Fayetteville Water", url: "https://www.fayetteville-ar.gov/419/Water-Service-and-Billing", domain: "fayetteville-ar.gov", emoji: "💧", category: "bills", subcategory: "Utilities" },
    { name: "GEICO", url: "https://ecams.geico.com/login", domain: "geico.com", category: "bills", subcategory: "Utilities" },

    // Terra
    { name: "Reference Table", url: "https://docs.google.com/document/d/104qcPLYpK9QsgFc8fNRRNGsFeNqXMgrRkw1CrfsYih4/edit", domain: "Google Docs", emoji: "📖", category: "terra", subcategory: "Lore & Docs" },
    { name: "ORCS", url: "https://docs.google.com/document/d/1w3ITQv6ianbKKHSJ3fBCU_7Vst29p8Vi2HkUk9a9UHk/edit", domain: "Google Docs", emoji: "📖", category: "terra", subcategory: "Lore & Docs" },
    { name: "Minotaur of Terraluna", url: "https://docs.google.com/document/d/1h3rFKBbCC40d2vatrGjVqoFJGsW0B7O13GoB0e-Vm4A/edit#", domain: "Google Docs", emoji: "🐂", category: "terra", subcategory: "Lore & Docs" },
    { name: "Discovery of Mithril", url: "https://docs.google.com/document/d/1PNIyHAp0Fd_3KaXfTLPZNz6hNwswaqdWJBjbHLSKFxc/edit#", domain: "Google Docs", emoji: "⛏️", category: "terra", subcategory: "Lore & Docs" },
    { name: "Names on Terraluna", url: "https://docs.google.com/spreadsheets/d/1nLDdFng7zQmIakVPuhi1UleAb1NaDNNGrYN3ZVqjB-A/edit#gid=0", domain: "Google Sheets", emoji: "📋", category: "terra", subcategory: "Lore & Docs" },

    { name: "Inkarnate Maps", url: "https://inkarnate.com/maps#/new?skin=fantasy-world", domain: "inkarnate.com", category: "terra", subcategory: "Maps" }
];
