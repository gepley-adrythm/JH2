/**
 * Crist Residence — professional photographer photos (2026).
 * 56 images downloaded from Google Drive; full-res JPEGs + WebP versions
 * live at public/images/gallery/crist/.
 *
 * ORDER NOTES: Drone aerials come first (most dramatic, always impressive),
 * followed by living/fireplace shots, then the interior sequence in
 * photographer order. Secondary bedrooms and utility spaces appear toward
 * the end of the interior run.
 */

const BASE = import.meta.env.BASE_URL + "images/gallery/crist/";

const FILENAMES = [
  // — Exterior opener —
  "01-DSC05787",
  "02-DSC05790",
  // — Aerial drone shots (14) — wide context, always impressive —
  "41-DJI_20260612114214_0014_D",
  "42-DJI_20260612114238_0017_D",
  "43-DJI_20260612114110_0008_D",
  "44-DJI_20260612114255_0020_D",
  "45-DJI_20260612114135_0011_D",
  "46-DJI_20260612114552_0041_D",
  "47-DJI_20260612114050_0005_D",
  "48-DJI_20260612114526_0038_D",
  "49-DJI_20260612114320_0023_D",
  "50-DJI_20260612114342_0026_D",
  "51-DJI_20260612114433_0032_D",
  "52-DJI_20260612114400_0029_D",
  "53-DJI_20260612114507_0035_D",
  "56-DJI_20260612114705_0050_D",
  // — Early ground DJI shot —
  "03-DJI_20260612114647_0047_D",
  // — Fireplace / living area (prioritized) —
  "26-DSC05805_with_fire",
  "27-DSC05823_with_fire",
  "33-DSC05817_with_fire",
  // — Interior sequence in photographer order —
  "04-DSC05883",
  "05-DSC05886",
  "06-DSC05895",
  "07-DSC05898",
  "08-DSC05811",
  "09-DSC05814",
  "10-DSC05808",
  "11-DSC05871",
  "12-DSC05853",
  "13-DSC05868",
  "14-DSC05865",
  "15-DSC05832",
  "16-DSC05841",
  "17-DSC05850",
  "18-DSC05892",
  "19-DSC05880",
  "20-DSC05829",
  "21-DSC05838",
  "22-DSC05877",
  "23-DSC05874",
  "24-DSC05793",
  "25-DSC05820",
  "28-DSC05826",
  "29-DSC05835",
  "30-DSC05856",
  "31-DSC05862",
  "32-DSC05802",
  "34-DSC05799",
  "35-DSC05796",
  "36-DSC05844",
  "37-DSC05847",
  "38-DSC05889",
  "39-DSC05901",
  "40-DSC05904",
  // — Remaining DSC shots —
  "54-DSC05784",
  "55-DSC05781",
];

export function cristImages(): Array<{ jpg: string; webp: string; alt: string }> {
  return FILENAMES.map((name) => ({
    jpg: BASE + name + ".jpg",
    webp: BASE + name + ".webp",
    alt: "Crist Residence — " + name.replace(/^\d+-/, "").replace(/_/g, " "),
  }));
}

export const CRIST_HERO_JPG = BASE + "01-DSC05787.jpg";
export const CRIST_HERO_WEBP = BASE + "01-DSC05787.webp";

export const CRIST_AERIAL_JPG = BASE + "45-DJI_20260612114135_0011_D.jpg";
export const CRIST_AERIAL_WEBP = BASE + "45-DJI_20260612114135_0011_D.webp";
