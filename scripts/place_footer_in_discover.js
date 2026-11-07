const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'components', 'discover', 'DiscoverScreen.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Ensure import is present
if (!content.includes("import { CompanyFooter } from '@/components/layout/CompanyFooter';")) {
  content = content.replace(
    "import { TestimonialsSection } from '@/components/mystic/TestimonialsSection';",
    "import { TestimonialsSection } from '@/components/mystic/TestimonialsSection';\nimport { CompanyFooter } from '@/components/layout/CompanyFooter';"
  );
}

// Add the footer right after TestimonialsSection
const targetBlock = `      {/* Testimonials ("What My Clients Say") */}
      <section>
        <TestimonialsSection />
      </section>
    </div>`;

const updatedBlock = `      {/* Testimonials ("What My Clients Say") */}
      <section>
        <TestimonialsSection />
      </section>

      {/* Website Footer (matching reference layout: Brand, Product, Free Tools, Learn, Company) */}
      {!isAuthenticated && (
        <CompanyFooter
          onTabChange={onTabChange}
          onOpenPremium={onOpenPremium}
          onOpenAuth={onOpenAuth}
        />
      )}
    </div>`;

if (content.includes(targetBlock)) {
  content = content.replace(targetBlock, updatedBlock);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully placed CompanyFooter in DiscoverScreen.tsx!');
} else {
  console.log('Target block not found. Checking alternate matching...');
  content = content.replace(
    '<TestimonialsSection />\n      </section>\n    </div>',
    '<TestimonialsSection />\n      </section>\n\n      {!isAuthenticated && (\n        <CompanyFooter\n          onTabChange={onTabChange}\n          onOpenPremium={onOpenPremium}\n          onOpenAuth={onOpenAuth}\n        />\n      )}\n    </div>'
  );
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Replaced with alternate match!');
}

