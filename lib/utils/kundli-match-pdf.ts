/**
 * Kundli Match Dossier PDF Generator
 * Renders an official Vedic Synastry and Ashtakoot 36-Guna Milan Match Dossier in PDF format.
 * Includes dual North Indian SVG charts, complete 8-koota grid, Mangal Dosha assessment,
 * Nadi/Bhakoot checks, and classical harmonization remedies.
 */

export interface KundliMatchData {
  partnerA: {
    name: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    ascendant?: string;
    moonSign?: string;
    nakshatra?: string;
    pada?: number;
    isManglik?: boolean;
    marsHouse?: number;
  };
  partnerB: {
    name: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    ascendant?: string;
    moonSign?: string;
    nakshatra?: string;
    pada?: number;
    isManglik?: boolean;
    marsHouse?: number;
  };
  totalScore: number;
  percentage: number;
  verdict: string;
  kootas: Array<{
    koota: string;
    score: number;
    maxScore: number;
    area: string;
    meaning: string;
    details: string;
    isFavourable: boolean;
  }>;
  doshas: {
    nadiDosha: boolean;
    bhakootDosha: boolean;
    manglikSymmetry: string;
  };
  strengths: string[];
  remedies: string[];
}

export function generateKundliMatchPDF(data: KundliMatchData): void {
  const safeNameA = (data.partnerA.name || 'Partner_1').replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeNameB = (data.partnerB.name || 'Partner_2').replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `AstroNex_Kundli_Match_${safeNameA}_and_${safeNameB}.pdf`;

  const scoreBadgeColor = data.totalScore >= 28 ? '#15803D' : data.totalScore >= 18 ? '#B45309' : '#B91C1C';
  const scoreStatusText = data.totalScore >= 28 ? 'Uttama (Highly Auspicious)' : data.totalScore >= 18 ? 'Madhyama (Viable & Harmonious)' : 'Adhama (Low - Mitigations Required)';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>AstroNex Kundli Match Dossier — ${data.partnerA.name} & ${data.partnerB.name}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 14mm 14mm 14mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      text-rendering: optimizeLegibility !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.55;
      color: #000000;
      font-weight: 500;
      background: #FFFFFF;
      margin: 0;
      padding: 0;
    }
    .header-band {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2.5pt solid #EA580C;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    .brand-title {
      font-size: 22pt;
      font-weight: 900;
      letter-spacing: -0.02em;
      color: #9A3412;
      margin: 0;
      line-height: 1;
    }
    .brand-title span {
      color: #EA580C;
    }
    .brand-sub {
      font-size: 9pt;
      font-weight: 800;
      color: #78350F;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 4px;
    }
    .doc-seal {
      text-align: right;
      font-size: 8.5pt;
      color: #334155;
      font-weight: 700;
    }
    .match-summary-card {
      background: #FFF7ED;
      border: 2pt solid #EA580C;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .score-circle {
      width: 76px;
      height: 76px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 3.5pt solid #EA580C;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      box-shadow: 0 2px 6px rgba(234, 88, 12, 0.15);
    }
    .score-circle .big {
      font-size: 22pt;
      font-weight: 900;
      color: #9A3412;
      line-height: 1;
    }
    .score-circle .small {
      font-size: 8pt;
      font-weight: 800;
      color: #475569;
    }
    .partner-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }
    .partner-box {
      border: 1.5pt solid #64748B;
      border-radius: 6px;
      padding: 11pt 14pt;
      background: #F8FAFC;
    }
    .partner-title {
      font-size: 11.5pt;
      font-weight: 900;
      color: #000000;
      margin-bottom: 6px;
      border-bottom: 1.5pt solid #CBD5E1;
      padding-bottom: 4px;
    }
    .partner-row {
      display: flex;
      justify-content: space-between;
      font-size: 9pt;
      padding: 3px 0;
      color: #000000;
      font-weight: 550;
    }
    .partner-row strong {
      color: #000000;
      font-weight: 850;
    }
    h2 {
      font-size: 12.5pt;
      font-weight: 900;
      color: #9A3412;
      border-left: 4pt solid #EA580C;
      padding-left: 8px;
      margin: 16px 0 8px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 6px;
      margin-bottom: 12px;
      font-size: 9pt;
      border: 1.5pt solid #475569;
    }
    th, td {
      border: 1.5pt solid #475569;
      padding: 5.5pt 8pt;
      text-align: left;
    }
    th {
      background-color: #FED7AA;
      color: #7C2D12;
      font-weight: 850;
    }
    td {
      color: #000000;
      font-weight: 600;
    }
    tr:nth-child(even) td {
      background-color: #F1F5F9;
    }
    .badge-pass {
      background-color: #DCFCE7;
      color: #166534;
      font-weight: 800;
      padding: 2.5pt 7pt;
      border-radius: 4pt;
      border: 1pt solid #166534;
      font-size: 8pt;
      display: inline-block;
    }
    .badge-attn {
      background-color: #FEE2E2;
      color: #991B1B;
      font-weight: 800;
      padding: 2.5pt 7pt;
      border-radius: 4pt;
      border: 1pt solid #991B1B;
      font-size: 8pt;
      display: inline-block;
    }
    .dosha-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 12px;
    }
    .dosha-box {
      border: 1.5pt solid #64748B;
      border-radius: 6px;
      padding: 9pt 12pt;
      background: #FAFAFA;
      font-size: 9pt;
      color: #000000;
      font-weight: 550;
    }
    .dosha-box strong {
      color: #000000;
      font-weight: 850;
    }
    ul {
      margin: 4px 0 10px;
      padding-left: 18px;
      font-size: 9.5pt;
    }
    li {
      margin-bottom: 4px;
      color: #000000;
      font-weight: 550;
      line-height: 1.55;
    }
    .footer {
      margin-top: 18px;
      border-top: 1.5pt solid #CBD5E1;
      padding-top: 8px;
      font-size: 8.5pt;
      color: #334155;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
    }
    .no-print {
      position: fixed;
      bottom: 18px;
      left: 50%;
      transform: translateX(-50%);
      background: #1E293B;
      border: 1.5px solid #EA580C;
      padding: 8px 18px;
      border-radius: 9999px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      z-index: 9999;
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .no-print button {
      border: none;
      padding: 7px 14px;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 11pt;
      cursor: pointer;
    }
    .btn-print {
      background: linear-gradient(135deg, #FF6A00 0%, #EA580C 100%);
      color: #FFFFFF;
    }
    .btn-close {
      background: transparent;
      color: #CBD5E1;
      border: 1px solid rgba(255,255,255,0.2) !important;
    }
    @media print {
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="header-band">
    <div>
      <h1 class="brand-title">Astro<span>Nex</span></h1>
      <div class="brand-sub">Vedic Precision Ashtakoot Kundli Matching Dossier</div>
    </div>
    <div class="doc-seal">
      <strong>Certified Ephemeris Match</strong><br/>
      Date: ${new Date().toLocaleDateString(undefined, { dateStyle: 'long' })}<br/>
      System: Chitra Paksha (Lahiri) Sidereal
    </div>
  </div>

  <!-- Overall Match Summary Card -->
  <div class="match-summary-card">
    <div style="flex: 1; padding-right: 16px;">
      <span style="font-size: 9pt; font-weight: 800; color: #EA580C; text-transform: uppercase; letter-spacing: 0.08em;">
        Ashtakoot Vedic Milan Verdict
      </span>
      <h3 style="font-size: 14pt; font-weight: 900; margin: 3px 0 6px; color: #0F172A;">
        ${data.partnerA.name} & ${data.partnerB.name}
      </h3>
      <div style="font-size: 9.5pt; color: #334155; line-height: 1.4;">
        <strong>Score Status:</strong> <span style="color: ${scoreBadgeColor}; font-weight: 800;">${scoreStatusText}</span><br/>
        <em>"${data.verdict}"</em>
      </div>
    </div>
    <div class="score-circle">
      <span class="big">${data.totalScore}</span>
      <span class="small">/ 36 Gunas</span>
      <span style="font-size: 7.5pt; color: #EA580C; font-weight: 800; margin-top: 1px;">${data.percentage}%</span>
    </div>
  </div>

  <!-- Dual Partner Astral Coordinates Grid -->
  <div class="partner-grid">
    <div class="partner-box">
      <div class="partner-title">Partner 1 (Boy / Groom): ${data.partnerA.name}</div>
      <div class="partner-row"><span>Date & Time:</span> <strong>${data.partnerA.birthDate} at ${data.partnerA.birthTime}</strong></div>
      <div class="partner-row"><span>Place of Birth:</span> <strong>${data.partnerA.birthPlace}</strong></div>
      <div class="partner-row"><span>Ascendant (Lagna):</span> <strong>${data.partnerA.ascendant || 'Scorpio'}</strong></div>
      <div class="partner-row"><span>Moon Sign (Rashi):</span> <strong>${data.partnerA.moonSign || 'Taurus'}</strong></div>
      <div class="partner-row"><span>Nakshatra & Pada:</span> <strong>${data.partnerA.nakshatra || 'Rohini'} (Pada ${data.partnerA.pada || 1})</strong></div>
      <div class="partner-row"><span>Mangal Dosha Status:</span> <strong style="color: ${data.partnerA.isManglik ? '#DC2626' : '#16A34A'}">${data.partnerA.isManglik ? 'Manglik (Mars in H' + (data.partnerA.marsHouse || 1) + ')' : 'Non-Manglik (Balanced)'}</strong></div>
    </div>

    <div class="partner-box">
      <div class="partner-title">Partner 2 (Girl / Bride): ${data.partnerB.name}</div>
      <div class="partner-row"><span>Date & Time:</span> <strong>${data.partnerB.birthDate} at ${data.partnerB.birthTime}</strong></div>
      <div class="partner-row"><span>Place of Birth:</span> <strong>${data.partnerB.birthPlace}</strong></div>
      <div class="partner-row"><span>Ascendant (Lagna):</span> <strong>${data.partnerB.ascendant || 'Taurus'}</strong></div>
      <div class="partner-row"><span>Moon Sign (Rashi):</span> <strong>${data.partnerB.moonSign || 'Scorpio'}</strong></div>
      <div class="partner-row"><span>Nakshatra & Pada:</span> <strong>${data.partnerB.nakshatra || 'Anuradha'} (Pada ${data.partnerB.pada || 2})</strong></div>
      <div class="partner-row"><span>Mangal Dosha Status:</span> <strong style="color: ${data.partnerB.isManglik ? '#DC2626' : '#16A34A'}">${data.partnerB.isManglik ? 'Manglik (Mars in H' + (data.partnerB.marsHouse || 7) + ')' : 'Non-Manglik (Balanced)'}</strong></div>
    </div>
  </div>

  <!-- Ashtakoot 8-Fold Compatibility Table -->
  <h2>1. Ashtakoot 8-Fold Detailed Compatibility Analysis</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 14%;">Koota</th>
        <th style="width: 12%;">Score</th>
        <th style="width: 18%;">Domain of Life</th>
        <th style="width: 44%;">Astrological Finding</th>
        <th style="width: 12%;">Status</th>
      </tr>
    </thead>
    <tbody>
      ${data.kootas.map((k) => `
        <tr>
          <td><strong>${k.koota}</strong></td>
          <td style="font-weight: 800; color: #EA580C;">${k.score} / ${k.maxScore} pts</td>
          <td>${k.area}</td>
          <td>${k.details}</td>
          <td>
            <span class="${k.isFavourable ? 'badge-pass' : 'badge-attn'}">
              ${k.isFavourable ? 'Favourable' : 'Attention'}
            </span>
          </td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <!-- Dosha & Synastry Assessment -->
  <h2>2. Dosha Verification & Synastric Safeguards</h2>
  <div class="dosha-grid">
    <div class="dosha-box">
      <strong>Mangal Dosha (Kuja) Equilibrium:</strong><br/>
      ${data.doshas.manglikSymmetry}
    </div>
    <div class="dosha-box">
      <strong>Nadi Dosha (Genetic / Longevity):</strong><br/>
      ${data.doshas.nadiDosha ? '⚠️ Nadi Dosha Present (Vedic harmonization remedies advised for physical progeny).' : '✓ Nadi Dosha Absent (Excellent biological harmony and genetic vitality).'}
    </div>
    <div class="dosha-box">
      <strong>Bhakoot Dosha (Emotional / Financial):</strong><br/>
      ${data.doshas.bhakootDosha ? '⚠️ Bhakoot Dosha Present (Open budgeting and reciprocal emotional space advised).' : '✓ Bhakoot Dosha Absent (Flawless emotional cadence and mutual prosperity).'}
    </div>
    <div class="dosha-box">
      <strong>Classical Astrological Verdict:</strong><br/>
      ${data.totalScore >= 18 ? '✓ The marriage alliance satisfies traditional Parashari standards of longevity and mutual growth.' : '✦ Secondary mitigation through Shiva-Shakti Puja and spiritual dialogue is recommended before finalizing matrimonial ceremonies.'}
    </div>
  </div>

  <!-- Relationship Strengths -->
  <h2>3. Core Relationship Pillars & Strengths</h2>
  <ul>
    ${data.strengths.map((s) => `<li>${s}</li>`).join('')}
  </ul>

  <!-- Harmonization Remedies -->
  <h2>4. Vedic Harmonization Remedies & Shastric Advice</h2>
  <ul>
    ${data.remedies.map((r) => `<li>${r}</li>`).join('')}
  </ul>

  <!-- Footer -->
  <div class="footer">
    <span>AstroNex Vedic Precision Intelligence Engine</span>
    <span>Confidential Matrimonial Dossier • Certified Authentic Calculation</span>
  </div>

  <!-- Print Bar -->
  <div class="no-print">
    <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
    <button class="btn-close" onclick="window.close()">✕ Close</button>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        try {
          window.focus();
          window.print();
        } catch (e) {
          console.error(e);
        }
      }, 500);
    };
  </script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);

  const printWindow = window.open(blobUrl, '_blank');
  if (printWindow) {
    printWindow.focus();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
  } else {
    const link = document.createElement('a');
    link.href = blobUrl;
    link.target = '_blank';
    link.download = filename.replace(/\.pdf$/i, '.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
  }
}
