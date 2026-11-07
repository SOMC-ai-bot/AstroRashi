const fs = require('fs');

let code = fs.readFileSync('components/charts/AnimatedKundliChart.tsx', 'utf8').replace(/\r\n/g, '\n');

// 1. Ensure useAuth import
if (!code.includes("import { useAuth }")) {
  code = code.replace(
    "import { useAstrology } from '@/lib/state/astrology-context';",
    "import { useAstrology } from '@/lib/state/astrology-context';\nimport { useAuth } from '@/lib/state/auth-context';"
  );
}

// 2. Add user from useAuth
const oldHook = 'export const AnimatedKundliChart: React.FC<AnimatedKundliChartProps> = ({ onAskAI }) => {\n  const { natalChart, activeProfile } = useAstrology();';
const newHook = 'export const AnimatedKundliChart: React.FC<AnimatedKundliChartProps> = ({ onAskAI }) => {\n  const { natalChart, activeProfile } = useAstrology();\n  const { user } = useAuth();';

if (code.includes(oldHook)) {
  code = code.replace(oldHook, newHook);
}

// 3. Update Drawing badge
const oldBadge = '✦ Vedic Kundli Drawing • {activeProfile.name}';
const newBadge = '✦ Vedic Kundli Drawing • {user?.name || activeProfile?.name || \'Cosmic Seeker\'}';

if (code.includes(oldBadge)) {
  code = code.replace(oldBadge, newBadge);
  console.log('SUCCESS: Updated AnimatedKundliChart badge with user name');
} else {
  console.log('Target oldBadge not found');
}

fs.writeFileSync('components/charts/AnimatedKundliChart.tsx', code, 'utf8');

