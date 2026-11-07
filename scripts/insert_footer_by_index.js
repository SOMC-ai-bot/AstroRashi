const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'components', 'discover', 'DiscoverScreen.tsx');
let content = fs.readFileSync(filePath, 'utf8');

console.log('File length:', content.length);
console.log('Has TestimonialsSection:', content.includes('TestimonialsSection'));

// Normalize line endings to find the place
const lastSectionIdx = content.lastIndexOf('</section>');
console.log('lastSectionIdx:', lastSectionIdx);

if (lastSectionIdx !== -1) {
  const insertPos = lastSectionIdx + '</section>'.length;
  const before = content.slice(0, insertPos);
  const after = content.slice(insertPos);
  
  const footerSnippet = `

      {/* Website Footer (matching reference layout: Brand, Product, Free Tools, Learn, Company) */}
      {!isAuthenticated && (
        <CompanyFooter
          onTabChange={onTabChange}
          onOpenPremium={onOpenPremium}
          onOpenAuth={onOpenAuth}
        />
      )}`;

  content = before + footerSnippet + after;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Inserted footer successfully after last </section>!');
}

