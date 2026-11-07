import { AstrologyReport, LanguageCode } from '@/types';
import { getPDFTexts } from './pdf-translations';
import { REPORT_TRANSLATIONS } from './report-export-translations';

export function cleanReportHtmlText(text: string): string {
  if (!text) return '';
  return text
    // Remove standalone asterisks or dividers like ***, ---, ___
    .replace(/^\s*[\*\-_]{3,}\s*$/gm, '')
    // Replace ***bold-italic***
    .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong style="color: #92400E;">$1</strong>')
    // Replace **bold**
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Replace *italic*
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Remove any remaining raw asterisks
    .replace(/\*{2,}/g, '')
    .trim();
}

/**
 * Cleanly generates and downloads a Microsoft Word Document (.doc / .docx compatible)
 * with structured headings, tables, metadata, executive callouts, and clean formatting.
 */
export function downloadReportAsWord(report: AstrologyReport, lang: LanguageCode = 'en') {
  const safeProfile = (report.profileName || 'Seeker').replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeTitle = (report.title || 'Astrology_Report').replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${safeProfile}_${safeTitle}_Report.doc`;
  const rt = REPORT_TRANSLATIONS[lang] || REPORT_TRANSLATIONS.en;

  const dateFormatted = new Date(report.generatedAt).toLocaleDateString(undefined, {
    dateStyle: 'long',
  });

  const htmlContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${report.title}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.65;
      color: #000000;
      font-weight: 500;
      margin: 1in;
    }
    h1 {
      font-family: 'Georgia', 'Times New Roman', serif;
      font-size: 22pt;
      font-weight: 900;
      color: #000000;
      border-bottom: 2.5pt solid #D97706;
      padding-bottom: 8pt;
      margin-top: 20pt;
      margin-bottom: 10pt;
    }
    h2 {
      font-family: 'Georgia', 'Times New Roman', serif;
      font-size: 15pt;
      font-weight: 850;
      color: #78350F;
      margin-top: 18pt;
      margin-bottom: 8pt;
      border-left: 4.5pt solid #F59E0B;
      padding-left: 8pt;
    }
    h3 {
      font-size: 12.5pt;
      font-weight: 800;
      color: #1E3A8A;
      margin-top: 12pt;
      margin-bottom: 6pt;
    }
    p {
      margin-bottom: 8pt;
      line-height: 1.65;
      text-align: left;
      color: #000000;
      font-weight: 500;
    }
    strong, b {
      color: #000000;
      font-weight: 850;
    }
    .badge {
      background-color: #FEF3C7;
      color: #78350F;
      padding: 4pt 8pt;
      font-size: 9pt;
      font-weight: 800;
      border-radius: 4pt;
      border: 1.5pt solid #D97706;
      display: inline-block;
      margin-bottom: 12pt;
    }
    .intro-box {
      background-color: #FFFDF5;
      border: 1.5pt solid #F59E0B;
      border-left: 5pt solid #D97706;
      padding: 11pt 14pt;
      margin-bottom: 16pt;
      font-size: 11pt;
      color: #000000;
      font-weight: 550;
    }
    .card-box {
      border: 1.5pt solid #475569;
      background-color: #F8FAFC;
      padding: 11pt 14pt;
      margin-bottom: 12pt;
      color: #000000;
      font-weight: 500;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10pt;
      margin-bottom: 14pt;
      font-size: 10pt;
    }
    th, td {
      border: 1pt solid #CBD5E1;
      padding: 6pt 10pt;
      text-align: left;
    }
    th {
      background-color: #FEF3C7;
      color: #78350F;
      font-weight: bold;
    }
    tr:nth-child(even) {
      background-color: #F8FAFC;
    }
    .page-break {
      page-break-before: always;
    }
    .footer {
      margin-top: 30pt;
      border-top: 1pt solid #CBD5E1;
      padding-top: 8pt;
      font-size: 8.5pt;
      color: #64748B;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="badge">${rt.footerBrand}</div>
  <h1>${report.title}</h1>
  <p><strong>${rt.preparedFor}:</strong> ${(report.profileName || 'Seeker').trim().split(/\s+/)[0]} &nbsp;|&nbsp; <strong>${rt.generatedDate}:</strong> ${dateFormatted}</p>

  <div class="intro-box">
    <strong>${rt.execCertHeader}</strong><br/>
    ${rt.execCertNotice}
  </div>

  <h2>${rt.keyStrengths}</h2>
  <ul>
    ${report.keyStrengths.map((str) => `<li>${str}</li>`).join('')}
  </ul>

  <h2>${rt.keyGrowthAreas}</h2>
  <ul>
    ${report.keyGrowthAreas.map((ga) => `<li>${ga}</li>`).join('')}
  </ul>

  <div class="page-break"></div>

  <h2>${rt.masterChapters}</h2>
  ${report.chapters
    .map(
      (ch, idx) => `
    <h3>${rt.chapterPrefix} ${idx + 1}: ${ch.title}</h3>
    ${ch.subtitle ? `<p><em>${ch.subtitle}</em></p>` : ''}
    <div class="card-box">
      <strong>${rt.execSummary}:</strong> ${ch.summary}
    </div>
    ${(ch.contentParagraphs || [ch.content || ''])
      .map((p) => `<p>${cleanReportHtmlText(p)}</p>`)
      .join('')}

    ${
      ch.evidencePoints && ch.evidencePoints.length > 0
        ? `
      <table>
        <thead>
          <tr>
            <th>${rt.astroFinding || rt.astronomicalFinding || 'Astronomical Finding'}</th>
            <th>${rt.source}</th>
            <th>${rt.ruleId}</th>
          </tr>
        </thead>
        <tbody>
          ${ch.evidencePoints
            .map(
              (ev) => `
            <tr>
              <td><strong>${ev.finding}</strong></td>
              <td>${ev.source}</td>
              <td>${ev.interpretationRuleId || 'Verified'}</td>
            </tr>`
            )
            .join('')}
        </tbody>
      </table>`
        : ''
    }

    ${
      ch.traditionalInsights && ch.traditionalInsights.length > 0
        ? `
      <p><strong>📜 ${rt.classicalAxioms}:</strong></p>
      <ul>
        ${ch.traditionalInsights.map((ti) => `<li>${ti}</li>`).join('')}
      </ul>`
        : ''
    }

    ${
      ch.practicalRemedies && ch.practicalRemedies.length > 0
        ? `
      <p><strong>⚡ ${rt.practicalGuidance}:</strong></p>
      <ul>
        ${ch.practicalRemedies.map((pr) => `<li>${pr}</li>`).join('')}
      </ul>`
        : ''
    }
    <br/>
  `
    )
    .join('')}

  <div class="page-break"></div>

  <h2>${rt.traditionalRemedies}</h2>
  <ul>
    ${report.traditionalRemedies.map((rem) => `<li>${rem}</li>`).join('')}
  </ul>

  <div class="footer">
    ${rt.footerBrand} • ${rt.confidentialDossier}
  </div>
</body>
</html>
`;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Triggers clean, print-optimized PDF generation with automatic title formatting
 * and high-contrast, crystal-clear typography that NEVER blends into the background.
 */
export function downloadReportAsPDF(report: AstrologyReport, lang: LanguageCode = 'en'): void {
  const t = getPDFTexts(lang);
  const rt = REPORT_TRANSLATIONS[lang] || REPORT_TRANSLATIONS.en;
  const safeProfile = (report.profileName || 'Seeker').replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeTitle = (report.title || 'Astrology_Report').replace(/[^a-zA-Z0-9_-]/g, '_');
  const dateFormatted = new Date(report.generatedAt).toLocaleDateString(undefined, {
    dateStyle: 'long',
  });

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${safeProfile}_${safeTitle}_Report</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 16mm 16mm 16mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      text-rendering: optimizeLegibility !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
    }
    body {
      background-color: #FFFFFF !important;
      color: #000000 !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
      font-size: 11pt;
      line-height: 1.65;
      font-weight: 500;
      margin: 0;
      padding: 0;
    }
    .header-band {
      border-bottom: 2.5pt solid #B45309;
      padding-bottom: 10pt;
      margin-bottom: 14pt;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .brand-title {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Georgia', serif;
      font-size: 22pt;
      font-weight: 900;
      color: #78350F;
      margin: 0;
      line-height: 1.1;
      letter-spacing: -0.01em;
    }
    .brand-sub {
      font-size: 9pt;
      font-weight: 800;
      color: #D97706;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 3pt;
    }
    .badge {
      background-color: #FEF3C7;
      border: 1.5pt solid #F59E0B;
      color: #78350F;
      padding: 4pt 8pt;
      font-size: 8.5pt;
      font-weight: 800;
      border-radius: 4pt;
      display: inline-block;
      margin-bottom: 8pt;
    }
    h1 {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Georgia', serif;
      font-size: 20pt;
      font-weight: 900;
      color: #000000;
      border-bottom: 2pt solid #F59E0B;
      padding-bottom: 5pt;
      margin-top: 14pt;
      margin-bottom: 8pt;
      letter-spacing: -0.01em;
    }
    h2 {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Georgia', serif;
      font-size: 14pt;
      font-weight: 850;
      color: #78350F;
      margin-top: 16pt;
      margin-bottom: 7pt;
      border-left: 4.5pt solid #D97706;
      padding-left: 8pt;
    }
    h3 {
      font-size: 12pt;
      font-weight: 800;
      color: #1E3A8A;
      margin-top: 12pt;
      margin-bottom: 5pt;
    }
    p {
      margin-top: 0;
      margin-bottom: 8pt;
      color: #000000;
      font-size: 11pt;
      font-weight: 500;
      line-height: 1.65;
      text-align: left;
      letter-spacing: 0.01em;
    }
    strong, b {
      color: #000000;
      font-weight: 850;
    }
    .intro-box {
      background-color: #FFFDF5;
      border: 1.5pt solid #F59E0B;
      border-left: 5pt solid #D97706;
      padding: 11pt 14pt;
      margin-bottom: 14pt;
      border-radius: 4pt;
      font-size: 11pt;
      color: #000000;
      font-weight: 550;
      line-height: 1.6;
    }
    .card-box {
      border: 1.5pt solid #475569;
      background-color: #F8FAFC;
      border-radius: 6pt;
      padding: 11pt 14pt;
      margin-bottom: 12pt;
      color: #000000;
      font-size: 10.5pt;
      font-weight: 500;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8pt;
      margin-bottom: 12pt;
      font-size: 9.5pt;
      border: 1.5pt solid #334155;
    }
    th, td {
      border: 1.5pt solid #334155;
      padding: 6pt 9pt;
      text-align: left;
    }
    th {
      background-color: #FEF3C7;
      color: #78350F;
      font-weight: 850;
    }
    td {
      color: #000000;
      font-weight: 550;
    }
    tr:nth-child(even) td {
      background-color: #F1F5F9;
    }
    ul {
      margin-top: 0;
      margin-bottom: 10pt;
      padding-left: 18pt;
    }
    li {
      margin-bottom: 5pt;
      color: #000000;
      font-size: 11pt;
      font-weight: 500;
      line-height: 1.6;
    }
    .page-break {
      page-break-before: always;
      break-before: page;
      margin-top: 16pt;
    }
    .footer {
      margin-top: 24pt;
      border-top: 1.5pt solid #CBD5E1;
      padding-top: 8pt;
      font-size: 8.5pt;
      color: #334155;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="header-band">
    <div>
      <h1 class="brand-title">${t.brandTitle}</h1>
      <div class="brand-sub">${t.brandSub}</div>
    </div>
    <div style="text-align: right; font-size: 8.5pt; color: #78350F; font-weight: 700;">
      ${t.certBadge.replace(/\n/g, '<br>')}
    </div>
  </div>

  <div class="badge">${t.brandTitle} • ${t.brandSub}</div>
  <h1>${report.title}</h1>
  <p><strong>${t.nameLabel}:</strong> ${(report.profileName || 'Seeker').trim().split(/\s+/)[0]} &nbsp;|&nbsp; <strong>${t.dobLabel}:</strong> ${dateFormatted}</p>

  <div class="intro-box">
    <strong>${t.nativeMetadataHeader}</strong><br/>
    ${t.certNotice}
  </div>

  <h2>${rt.keyStrengths}</h2>
  <ul>
    ${report.keyStrengths.map((str) => `<li>${str}</li>`).join('')}
  </ul>

  <h2>${rt.keyGrowthAreas}</h2>
  <ul>
    ${report.keyGrowthAreas.map((ga) => `<li>${ga}</li>`).join('')}
  </ul>

  <div class="page-break"></div>

  <h2>${rt.masterChapters}</h2>
  ${report.chapters
    .map(
      (ch, idx) => `
    <h3>${rt.chapterPrefix} ${idx + 1}: ${ch.title}</h3>
    ${ch.subtitle ? `<p><em>${ch.subtitle}</em></p>` : ''}
    <div class="card-box">
      <strong>${rt.execSummary}:</strong> ${cleanReportHtmlText(ch.summary)}
    </div>
    ${(ch.contentParagraphs || [ch.content || ''])
      .map((p) => `<p>${cleanReportHtmlText(p)}</p>`)
      .join('')}

    ${
      ch.evidencePoints && ch.evidencePoints.length > 0
        ? `
      <table>
        <thead>
          <tr>
            <th>${rt.astroFinding || rt.astronomicalFinding || 'Astronomical Finding'}</th>
            <th>${rt.source}</th>
            <th>${rt.ruleId}</th>
          </tr>
        </thead>
        <tbody>
          ${ch.evidencePoints
            .map(
              (ev) => `
            <tr>
              <td><strong>${cleanReportHtmlText(ev.finding || ev.factor || "")}</strong></td>
              <td>${cleanReportHtmlText(ev.source || "")}</td>
              <td>${cleanReportHtmlText(ev.interpretationRuleId || 'Verified')}</td>
            </tr>`
            )
            .join('')}
        </tbody>
      </table>`
        : ''
    }

    ${
      ch.traditionalInsights && ch.traditionalInsights.length > 0
        ? `
      <p><strong>📜 ${rt.classicalAxioms}:</strong></p>
      <ul>
        ${ch.traditionalInsights.map((ti) => `<li>${cleanReportHtmlText(ti)}</li>`).join('')}
      </ul>`
        : ''
    }

    ${
      ch.practicalRemedies && ch.practicalRemedies.length > 0
        ? `
      <p><strong>⚡ ${rt.practicalGuidance}:</strong></p>
      <ul>
        ${ch.practicalRemedies.map((pr) => `<li>${cleanReportHtmlText(pr)}</li>`).join('')}
      </ul>`
        : ''
    }
    <br/>
  `
    )
    .join('')}

  <div class="page-break"></div>

  <h2>${rt.traditionalRemedies}</h2>
  <ul>
    ${report.traditionalRemedies.map((rem) => `<li>${cleanReportHtmlText(rem)}</li>`).join('')}
  </ul>

  <div class="footer">
    <span>${rt.footerBrand}</span>
    <span>${rt.confidentialDossier}</span>
  </div>

  <!-- Print & Download Control Bar -->
  <div style="position: fixed; bottom: 18px; left: 50%; transform: translateX(-50%); background: #1E293B; border: 1.5px solid #F59E0B; padding: 10px 22px; border-radius: 9999px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 9999; display: flex; gap: 14px; align-items: center;" class="no-print">
    <button onclick="window.print()" style="background: linear-gradient(135deg, #FF6A00 0%, #F59E0B 100%); color: #000; border: none; padding: 8px 18px; border-radius: 9999px; font-weight: 800; font-size: 13px; cursor: pointer;">
      🖨️ ${rt.printBtn}
    </button>
    <button onclick="downloadHTMLFile()" style="background: rgba(255,255,255,0.12); color: #FFF; border: 1px solid rgba(255,255,255,0.25); padding: 8px 16px; border-radius: 9999px; font-weight: 600; font-size: 13px; cursor: pointer;">
      📥 ${rt.downloadDocBtn}
    </button>
    <button onclick="window.close()" style="background: transparent; color: #94A3B8; border: none; font-size: 13px; cursor: pointer;">
      ✕ Close
    </button>
  </div>

  <style>
    @media print {
      .no-print {
        display: none !important;
      }
    }
  </style>

  <script>
    function downloadHTMLFile() {
      var blob = new Blob([document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = '${safeProfile}_${safeTitle}_Report.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

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
    link.download = `${safeProfile}_${safeTitle}_Report.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
  }
}

