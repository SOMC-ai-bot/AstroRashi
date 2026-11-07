const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'layout.tsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes("import { CookieConsentBanner } from '@/components/company/CookieConsentBanner';")) {
  content = content.replace(
    "import { CommunityProvider } from '@/lib/state/community-context';",
    "import { CommunityProvider } from '@/lib/state/community-context';\nimport { CookieConsentBanner } from '@/components/company/CookieConsentBanner';"
  );
}

if (!content.includes('<CookieConsentBanner />')) {
  content = content.replace(
    '<CommunityProvider>{children}</CommunityProvider>',
    '<CommunityProvider>\n                    {children}\n                    <CookieConsentBanner />\n                  </CommunityProvider>'
  );
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('app/layout.tsx updated with CookieConsentBanner!');

