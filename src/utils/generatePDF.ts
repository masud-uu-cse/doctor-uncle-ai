import jsPDF from 'jspdf';
import type { AssessmentRecord } from '@/hooks/useHistory';

// ─── Constants ────────────────────────────────────────────────────────────────
const PAGE_W = 210; // A4 mm
const PAGE_H = 297;
const MARGIN = 18;
const COL_W = PAGE_W - MARGIN * 2;

const TEAL   = [13, 148, 136]  as [number, number, number]; // #0d9488
const DARK   = [30,  41,  59]  as [number, number, number]; // slate-800
const MUTED  = [100, 116, 139] as [number, number, number]; // slate-500
const WHITE  = [255, 255, 255] as [number, number, number];
const LIGHT  = [240, 253, 250] as [number, number, number]; // teal-50
const LINE   = [226, 232, 240] as [number, number, number]; // slate-200

const SEVERITY_COLOR: Record<string, [number, number, number]> = {
  mild:     [5, 150, 105],  // emerald
  moderate: [217, 119, 6],  // amber
  severe:   [220, 38,  38], // red
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const px = (n: number) => n; // passthrough – jsPDF uses mm natively

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function hr(doc: jsPDF, y: number, color = LINE) {
  doc.setDrawColor(...color);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  return y + 3;
}

function sectionTitle(doc: jsPDF, title: string, y: number): number {
  // pill background
  doc.setFillColor(...TEAL);
  doc.roundedRect(MARGIN, y, COL_W, 7, 2, 2, 'F');
  doc.setTextColor(...WHITE);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(title, MARGIN + 3, y + 4.5);
  doc.setTextColor(...DARK);
  return y + 10;
}

/** Wrap text and return new Y position */
function wrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH = 5,
  maxY = PAGE_H - MARGIN,
): number {
  const lines = doc.splitTextToSize(text, maxW) as string[];
  for (const line of lines) {
    if (y > maxY) { doc.addPage(); y = MARGIN + 10; }
    doc.text(line, x, y);
    y += lineH;
  }
  return y;
}

function checkPage(doc: jsPDF, y: number, needed = 20): number {
  if (y + needed > PAGE_H - MARGIN) {
    doc.addPage();
    return MARGIN + 10;
  }
  return y;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function downloadAssessmentPDF(record: AssessmentRecord): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = MARGIN;

  // ── Header banner ────────────────────────────────────────────────────────
  doc.setFillColor(...TEAL);
  doc.rect(0, 0, PAGE_W, 28, 'F');

  // Clinic name
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Doctor Uncle — AI Health Assessment', MARGIN, 12);

  // Subtitle line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('AI-assisted health report  •  For informational purposes only', MARGIN, 18);

  // Date top-right
  doc.setFontSize(8);
  doc.text(formatDate(record.createdAt), PAGE_W - MARGIN, 18, { align: 'right' });

  y = 34;

  // ── Patient info card ────────────────────────────────────────────────────
  doc.setFillColor(...LIGHT);
  doc.roundedRect(MARGIN, y, COL_W, 22, 3, 3, 'F');
  doc.setDrawColor(...TEAL);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, y, MARGIN, y + 22); // left accent bar

  doc.setTextColor(...TEAL);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('PATIENT INFORMATION', MARGIN + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...DARK);
  doc.setFontSize(10);

  const pi = record.patientInfo;
  const col2 = MARGIN + COL_W / 2;

  doc.setFont('helvetica', 'bold');
  doc.text('Name:', MARGIN + 4, y + 13);
  doc.setFont('helvetica', 'normal');
  doc.text(pi.name || '—', MARGIN + 20, y + 13);

  doc.setFont('helvetica', 'bold');
  doc.text('Age:', col2, y + 13);
  doc.setFont('helvetica', 'normal');
  doc.text(pi.age ? `${pi.age} years` : '—', col2 + 12, y + 13);

  doc.setFont('helvetica', 'bold');
  doc.text('Gender:', MARGIN + 4, y + 19.5);
  doc.setFont('helvetica', 'normal');
  doc.text(pi.gender || '—', MARGIN + 22, y + 19.5);

  y += 28;

  // ── Chief complaint ──────────────────────────────────────────────────────
  y = checkPage(doc, y, 20);
  y = sectionTitle(doc, 'CHIEF COMPLAINT / SYMPTOMS', y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  y = wrappedText(doc, record.initialSymptom, MARGIN, y, COL_W);
  y += 4;

  // ── Severity ─────────────────────────────────────────────────────────────
  y = checkPage(doc, y, 14);
  const level = record.result.triageLevel;
  const sevColor = SEVERITY_COLOR[level] ?? SEVERITY_COLOR.moderate;
  const sevLabel = level.charAt(0).toUpperCase() + level.slice(1);

  doc.setFillColor(...sevColor);
  doc.roundedRect(MARGIN, y, COL_W, 10, 2, 2, 'F');
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`Severity Level: ${sevLabel}`, MARGIN + 3, y + 6.5);
  y += 15;

  // ── Possible causes ──────────────────────────────────────────────────────
  if (record.result.possibleCauses.length > 0) {
    y = checkPage(doc, y, 18);
    y = sectionTitle(doc, 'POSSIBLE CONDITIONS', y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...DARK);
    for (const cause of record.result.possibleCauses) {
      y = checkPage(doc, y, 10);
      doc.setFillColor(245, 250, 250);
      doc.roundedRect(MARGIN, y - 3, COL_W, 0.1, 1, 1, 'F'); // separator hint
      doc.text('•', MARGIN + 1, y);
      y = wrappedText(doc, cause, MARGIN + 5, y, COL_W - 6);
      y += 1;
    }
    y += 4;
  }

  // ── Medicines ────────────────────────────────────────────────────────────
  if (record.result.medicines.length > 0) {
    y = checkPage(doc, y, 20);
    y = sectionTitle(doc, 'RECOMMENDED MEDICINES (OTC)', y);

    for (let i = 0; i < record.result.medicines.length; i++) {
      const med = record.result.medicines[i];
      y = checkPage(doc, y, 22);

      // Medicine card background
      doc.setFillColor(248, 255, 253);
      doc.setDrawColor(...LINE);
      doc.setLineWidth(0.3);
      doc.roundedRect(MARGIN, y, COL_W, 18, 2, 2, 'FD');

      // Index badge
      doc.setFillColor(...TEAL);
      doc.circle(MARGIN + 5, y + 5.5, 3, 'F');
      doc.setTextColor(...WHITE);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(String(i + 1), MARGIN + 5, y + 6.5, { align: 'center' });

      // Medicine name
      doc.setTextColor(...DARK);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(med.name, MARGIN + 11, y + 6);

      // Dosage / notes
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...MUTED);
      const noteText = med.notes || `${med.dosage} — ${med.frequency}`;
      const noteLines = doc.splitTextToSize(noteText, COL_W - 14) as string[];
      let noteY = y + 11;
      for (const line of noteLines.slice(0, 2)) {
        doc.text(line, MARGIN + 11, noteY);
        noteY += 4.5;
      }

      y += 21;
    }
    y += 2;
  }

  // ── Home care ────────────────────────────────────────────────────────────
  if (record.result.homeRemedies.length > 0) {
    y = checkPage(doc, y, 18);
    y = sectionTitle(doc, 'HOME CARE TIPS', y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...DARK);
    for (const rem of record.result.homeRemedies) {
      y = checkPage(doc, y, 8);
      doc.text('✓', MARGIN + 1, y);
      y = wrappedText(doc, rem.title, MARGIN + 6, y, COL_W - 8);
      y += 1;
    }
    y += 4;
  }

  // ── Specialist ───────────────────────────────────────────────────────────
  const sp = record.result.specialist;
  if (sp?.type) {
    y = checkPage(doc, y, 20);
    y = sectionTitle(doc, 'SPECIALIST RECOMMENDATION', y);
    doc.setFontSize(9.5);
    doc.setTextColor(...DARK);

    doc.setFont('helvetica', 'bold');
    doc.text('See a:', MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.text(sp.type, MARGIN + 16, y);
    y += 5;

    doc.setFont('helvetica', 'bold');
    doc.text('Urgency:', MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.text(sp.urgency, MARGIN + 20, y);
    y += 5;

    if (sp.reason) {
      doc.setFont('helvetica', 'bold');
      doc.text('Reason:', MARGIN, y);
      doc.setFont('helvetica', 'normal');
      y = wrappedText(doc, sp.reason, MARGIN + 18, y, COL_W - 20);
    }
    y += 4;
  }

  // ── Disclaimer footer (every page) ───────────────────────────────────────
  const totalPages = (doc as jsPDF & { internal: { getNumberOfPages(): number } })
    .internal.getNumberOfPages();

  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);

    // Footer bar
    doc.setFillColor(...TEAL);
    doc.rect(0, PAGE_H - 14, PAGE_W, 14, 'F');

    doc.setTextColor(...WHITE);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.text(
      '⚠  This report is generated by an AI assistant and is NOT a substitute for professional medical advice. Please consult a licensed physician.',
      PAGE_W / 2, PAGE_H - 8,
      { align: 'center' },
    );

    // Page number
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text(`Page ${p} of ${totalPages}`, PAGE_W - MARGIN, PAGE_H - 3, { align: 'right' });

    // Separator line above footer
    doc.setDrawColor(...TEAL);
    doc.setLineWidth(0.5);
    doc.line(0, PAGE_H - 14, PAGE_W, PAGE_H - 14);
  }

  // ── Save ──────────────────────────────────────────────────────────────────
  const filename = `doctor-uncle-report-${pi.name.replace(/\s+/g, '-').toLowerCase() || 'patient'}-${
    new Date(record.createdAt).toISOString().slice(0, 10)
  }.pdf`;
  doc.save(filename);
}
