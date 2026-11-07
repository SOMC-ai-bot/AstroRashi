const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'components', 'discover', 'DiscoverScreen.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add import for CompanyFooter
if (!content.includes('CompanyFooter')) {
  content = content.replace(
    "import { TestimonialsSection } from '@/components/mystic/TestimonialsSection';",
    "import { TestimonialsSection } from '@/components/mystic/TestimonialsSection';\nimport { CompanyFooter } from '@/components/layout/CompanyFooter';"
  );
}

// 2. Add CompanyFooter at the bottom of DiscoverScreen only when NOT authenticated
const targetEnd = `      {/* Testimonials ("What My Clients Say") */}
      <section>
        <TestimonialsSection />
      </section>
    </div>`;

const replacementEnd = `      {/* Testimonials ("What My Clients Say") */}
      <section>
        <TestimonialsSection />
      </section>

      {/* Company Policies & About Footer — visible ONLY to non-logged-in / unauthenticated users */}
      {!isAuthenticated && (
        <CompanyFooter onOpenAuth={onOpenAuth} />
      )}
    </div>`;

if (content.includes(targetEnd)) {
  content = content.replace(targetEnd, replacementEnd);
} else {
  // Fallback replace
  content = content.replace(
    '<TestimonialsSection />\n      </section>\n    </div>',
    '<TestimonialsSection />\n      </section>\n\n      {!isAuthenticated && (\n        <CompanyFooter onOpenAuth={onOpenAuth} />\n      )}\n    </div>'
  );
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('DiscoverScreen.tsx updated with CompanyFooter!');

