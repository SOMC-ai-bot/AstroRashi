const fs = require('fs');

function updateFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [pattern, repl] of replacements) {
    content = content.replace(pattern, repl);
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

// 1. TopBar.tsx
updateFile('components/layout/TopBar.tsx', [
  [/rgba\(10,\s*11,\s*16,\s*0\.95\)/g, '#050608'],
  [/rgba\(249,\s*115,\s*22,\s*0\.22\)/g, '#41454D'],
  [/rgba\(249,\s*115,\s*22,\s*0\.18\)/g, '#101722'],
  [/rgba\(249,\s*115,\s*22,\s*0\.28\)/g, '#101722'],
  [/rgba\(250,\s*204,\s*21,\s*0\.18\)/g, '#101722'],
  [/'0 8px 32px rgba\(0,\s*0,\s*0,\s*0\.75\)'/g, "'none'"],
  [/'0 0 16px rgba\(249,\s*115,\s*22,\s*0\.3\)'/g, "'none'"],
  [/linear-gradient\(135deg,\s*#F97316 0%,\s*#EA580C 100%\)/g, '#11A8EB'],
  [/linear-gradient\(135deg,\s*rgba\(249,\s*115,\s*22,\s*0\.28\)\s*0%,\s*rgba\(234,\s*88,\s*12,\s*0\.25\)\s*100%\)/g, '#101722'],
  [/#F97316/g, '#11A8EB'],
  [/#EA580C/g, '#078CCB'],
  [/#FED7AA/g, '#FFFFFF'],
  [/#FACC15/g, '#11A8EB'],
  [/#FEF08A/g, '#FFFFFF'],
  [/#CBD5E1/g, '#D5D7DA'],
  [/#94A3B8/g, '#A6A9AF'],
]);

// 2. BottomNav.tsx
updateFile('components/layout/BottomNav.tsx', [
  [/rgba\(10,\s*11,\s*16,\s*0\.95\)/g, '#050608'],
  [/rgba\(249,\s*115,\s*22,\s*0\.2\)/g, '#41454D'],
  [/rgba\(249,\s*115,\s*22,\s*0\.15\)/g, '#101722'],
  [/#F97316/g, '#11A8EB'],
  [/#FED7AA/g, '#FFFFFF'],
  [/#CBD5E1/g, '#D5D7DA'],
  [/#94A3B8/g, '#A6A9AF'],
]);

// 3. CompanyFooter.tsx
updateFile('components/layout/CompanyFooter.tsx', [
  [/rgba\(6,\s*7,\s*14,\s*0\.95\)/g, '#050608'],
  [/rgba\(10,\s*11,\s*16,\s*1\)/g, '#050608'],
  [/rgba\(249,\s*115,\s*22,\s*0\.2\)/g, '#41454D'],
  [/#F97316/g, '#11A8EB'],
  [/#FED7AA/g, '#FFFFFF'],
  [/#CBD5E1/g, '#D5D7DA'],
  [/#94A3B8/g, '#A6A9AF'],
]);

// 4. ConsultantScreen.tsx
updateFile('components/consultants/ConsultantScreen.tsx', [
  [/radial-gradient\(circle at 10% 20%,\s*rgba\(249,\s*115,\s*22,\s*0\.16\)\s*0%,\s*rgba\(13,\s*11,\s*22,\s*0\.98\)\s*70%\)/g, '#101722'],
  [/linear-gradient\(180deg,\s*rgba\(20,\s*18,\s*30,\s*0\.98\)\s*0%,\s*rgba\(12,\s*10,\s*20,\s*0\.99\)\s*100%\)/g, '#25282E'],
  [/linear-gradient\(135deg,\s*rgba\(20,\s*22,\s*32,\s*0\.95\)\s*0%,\s*rgba\(13,\s*15,\s*23,\s*0\.98\)\s*100%\)/g, '#101722'],
  [/rgba\(249,\s*115,\s*22,\s*0\.3\)/g, '#41454D'],
  [/rgba\(249,\s*115,\s*22,\s*0\.25\)/g, '#41454D'],
  [/rgba\(249,\s*115,\s*22,\s*0\.12\)/g, '#101722'],
  [/rgba\(249,\s*115,\s*22,\s*0\.1\)/g, '#101722'],
  [/rgba\(249,\s*115,\s*22,\s*0\.4\)/g, '#11A8EB'],
  [/rgba\(255,\s*255,\s*255,\s*0\.08\)/g, '#41454D'],
  [/rgba\(255,\s*255,\s*255,\s*0\.04\)/g, '#101722'],
  [/boxShadow:[^,;]+(?=[,;])/g, 'boxShadow: "none"'],
  [/#F97316/g, '#11A8EB'],
  [/#EA580C/g, '#078CCB'],
  [/#FED7AA/g, '#FFFFFF'],
  [/#FB923C/g, '#52C2F4'],
  [/#FDBA74/g, '#D5D7DA'],
  [/#12141D/g, '#25282E'],
  [/#13151E/g, '#101722'],
]);

// 5. FullExpertChatScreen.tsx
updateFile('components/consultants/FullExpertChatScreen.tsx', [
  [/#0A0B10/g, '#050608'],
  [/#0E1017/g, '#101722'],
  [/#07080C/g, '#050608'],
  [/#11131B/g, '#25282E'],
  [/#1C202C/g, '#25282E'],
  [/#161924/g, '#101722'],
  [/#1A1D27/g, '#41454D'],
  [/#1E212D/g, '#41454D'],
  [/#2B3145/g, '#41454D'],
  [/#232736/g, '#41454D'],
  [/#252A38/g, '#41454D'],
  [/#1C1F2B/g, '#25282E'],
  [/#F97316/g, '#11A8EB'],
  [/#EA580C/g, '#078CCB'],
  [/#FED7AA/g, '#FFFFFF'],
  [/#CBD5E1/g, '#D5D7DA'],
  [/#94A3B8/g, '#A6A9AF'],
]);

// 6. AIAssistantScreen.tsx
updateFile('components/ai/AIAssistantScreen.tsx', [
  [/#0A0B10/g, '#050608'],
  [/#0E1017/g, '#101722'],
  [/#07080C/g, '#050608'],
  [/#111216/g, '#25282E'],
  [/#12141D/g, '#25282E'],
  [/#161924/g, '#101722'],
  [/#1A1D27/g, '#41454D'],
  [/#1E212D/g, '#41454D'],
  [/#252A38/g, '#41454D'],
  [/#232736/g, '#41454D'],
  [/#333A4E/g, '#41454D'],
  [/#F97316/g, '#11A8EB'],
  [/#EA580C/g, '#078CCB'],
  [/#FED7AA/g, '#FFFFFF'],
  [/#CBD5E1/g, '#D5D7DA'],
  [/#94A3B8/g, '#A6A9AF'],
]);

console.log('All major app screens updated to exact user palette!');

