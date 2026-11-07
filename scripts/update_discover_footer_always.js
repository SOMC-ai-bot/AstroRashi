const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'components', 'discover', 'DiscoverScreen.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace {!isAuthenticated && ( <CompanyFooter ... /> )} with unconditional <CompanyFooter ... />
content = content.replace(
  `      {/* Website Footer (matching reference layout: Brand, Product, Free Tools, Learn, Company) */}
      {!isAuthenticated && (
        <CompanyFooter
          onTabChange={onTabChange}
          onOpenPremium={onOpenPremium}
          onOpenAuth={onOpenAuth}
        />
      )}`,
  `      {/* Website Footer — always visible on Home page */}
      <CompanyFooter
        onTabChange={onTabChange}
        onOpenPremium={onOpenPremium}
        onOpenAuth={onOpenAuth}
      />`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('DiscoverScreen.tsx updated to always show CompanyFooter!');

