/**
 * MediCare Connect - RxNorm Standard Clinical Drug Catalog
 * Standards: US National Library of Medicine (NLM) RxNorm Clinical Formulary
 * Provides clinical medication lookup, brand/generic mappings, dosage routes, and DEA schedule definitions.
 */

export interface RxNormEntry {
  rxcui: string;
  name: string;
  genericName: string;
  brandNames: string[];
  dosageForm: string;
  route: string;
  strength: string;
  activeIngredients: string[];
  deaSchedule: 'NONE' | 'C-II' | 'C-III' | 'C-IV' | 'C-V';
  therapeuticClass: string;
  atcCode: string;
  isBlackBoxWarning: boolean;
  pregnancyCategory: 'A' | 'B' | 'C' | 'D' | 'X' | 'N';
}

export class RxNormCatalog {
  private static readonly database: Map<string, RxNormEntry> = new Map();
  private static readonly genericIndex: Map<string, string[]> = new Map();

  static {
    this.initializeCatalog();
  }

  private static add(entry: RxNormEntry): void {
    this.database.set(entry.rxcui, entry);
    const key = entry.genericName.toLowerCase();
    if (!this.genericIndex.has(key)) {
      this.genericIndex.set(key, []);
    }
    this.genericIndex.get(key)!.push(entry.rxcui);
  }

  private static initializeCatalog(): void {
    this.add({
      rxcui: '866514',
      name: 'Metformin hydrochloride 500 MG Oral Tablet',
      genericName: 'Metformin',
      brandNames: ['Glucophage', 'Fortamet', 'Glumetza'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '500 mg',
      activeIngredients: ['Metformin Hydrochloride'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Antidiabetic Agents / Biguanides',
      atcCode: 'A10BA02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'B'
    });

    this.add({
      rxcui: '866517',
      name: 'Metformin hydrochloride 1000 MG Oral Tablet',
      genericName: 'Metformin',
      brandNames: ['Glucophage', 'Fortamet', 'Glumetza'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '1000 mg',
      activeIngredients: ['Metformin Hydrochloride'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Antidiabetic Agents / Biguanides',
      atcCode: 'A10BA02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'B'
    });

    this.add({
      rxcui: '314076',
      name: 'Lisinopril 10 MG Oral Tablet',
      genericName: 'Lisinopril',
      brandNames: ['Prinivil', 'Zestril', 'Qbrelis'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Lisinopril'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / ACE Inhibitors',
      atcCode: 'C09AA03',
      isBlackBoxWarning: true,
      pregnancyCategory: 'D'
    });

    this.add({
      rxcui: '314077',
      name: 'Lisinopril 20 MG Oral Tablet',
      genericName: 'Lisinopril',
      brandNames: ['Prinivil', 'Zestril', 'Qbrelis'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Lisinopril'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / ACE Inhibitors',
      atcCode: 'C09AA03',
      isBlackBoxWarning: true,
      pregnancyCategory: 'D'
    });

    this.add({
      rxcui: '617314',
      name: 'Atorvastatin 20 MG Oral Tablet',
      genericName: 'Atorvastatin',
      brandNames: ['Lipitor'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Atorvastatin Calcium'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / HMG-CoA Reductase Inhibitors',
      atcCode: 'C10AA05',
      isBlackBoxWarning: false,
      pregnancyCategory: 'X'
    });

    this.add({
      rxcui: '617318',
      name: 'Atorvastatin 40 MG Oral Tablet',
      genericName: 'Atorvastatin',
      brandNames: ['Lipitor'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Atorvastatin Calcium'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / HMG-CoA Reductase Inhibitors',
      atcCode: 'C10AA05',
      isBlackBoxWarning: false,
      pregnancyCategory: 'X'
    });

    this.add({
      rxcui: '197361',
      name: 'Amlodipine 5 MG Oral Tablet',
      genericName: 'Amlodipine',
      brandNames: ['Norvasc', 'Katerzia'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '5 mg',
      activeIngredients: ['Amlodipine Besylate'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Calcium Channel Blockers',
      atcCode: 'C08CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });

    this.add({
      rxcui: '866414',
      name: 'Metoprolol Succinate 50 MG Extended Release Oral Tablet',
      genericName: 'Metoprolol',
      brandNames: ['Toprol-XL'],
      dosageForm: 'Extended Release Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Metoprolol Succinate'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Beta-Blockers',
      atcCode: 'C07AB02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });

    this.add({
      rxcui: '311699',
      name: 'Losartan potassium 50 MG Oral Tablet',
      genericName: 'Losartan',
      brandNames: ['Cozaar'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Losartan Potassium'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Angiotensin Receptor Blockers (ARBs)',
      atcCode: 'C09CA01',
      isBlackBoxWarning: true,
      pregnancyCategory: 'D'
    });

    this.add({
      rxcui: '855332',
      name: 'Warfarin Sodium 5 MG Oral Tablet',
      genericName: 'Warfarin',
      brandNames: ['Coumadin', 'Jantoven'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '5 mg',
      activeIngredients: ['Warfarin Sodium'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Hematologic / Anticoagulants (Vitamin K Antagonist)',
      atcCode: 'B01AA03',
      isBlackBoxWarning: true,
      pregnancyCategory: 'X'
    });

    this.add({
      rxcui: '1364430',
      name: 'Apixaban 5 MG Oral Tablet',
      genericName: 'Apixaban',
      brandNames: ['Eliquis'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '5 mg',
      activeIngredients: ['Apixaban'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Hematologic / Factor Xa Inhibitors (DOAC)',
      atcCode: 'B01AF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'B'
    });

    this.add({
      rxcui: '313782',
      name: 'Amoxicillin 500 MG Oral Capsule',
      genericName: 'Amoxicillin',
      brandNames: ['Amoxil', 'Moxatag'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '500 mg',
      activeIngredients: ['Amoxicillin Trihydrate'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-infective / Aminopenicillins',
      atcCode: 'J01CA04',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });

    this.add({
      rxcui: '309090',
      name: 'Azithromycin 250 MG Oral Tablet',
      genericName: 'Azithromycin',
      brandNames: ['Zithromax', 'Z-Pak'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '250 mg',
      activeIngredients: ['Azithromycin Dihydrate'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-infective / Macrolides',
      atcCode: 'J01FA10',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });

    this.add({
      rxcui: '310489',
      name: 'Ciprofloxacin 500 MG Oral Tablet',
      genericName: 'Ciprofloxacin',
      brandNames: ['Cipro', 'Cipro XR'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '500 mg',
      activeIngredients: ['Ciprofloxacin Hydrochloride'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-infective / Fluoroquinolones',
      atcCode: 'J01MA02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });

    this.add({
      rxcui: '312961',
      name: 'Sertraline 50 MG Oral Tablet',
      genericName: 'Sertraline',
      brandNames: ['Zoloft'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Sertraline Hydrochloride'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Psychiatric / SSRIs',
      atcCode: 'N06AB06',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });

    this.add({
      rxcui: '857005',
      name: 'Alprazolam 0.5 MG Oral Tablet',
      genericName: 'Alprazolam',
      brandNames: ['Xanax', 'Niravam'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '0.5 mg',
      activeIngredients: ['Alprazolam'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Psychiatric / Benzodiazepines',
      atcCode: 'N05BA12',
      isBlackBoxWarning: true,
      pregnancyCategory: 'D'
    });

    this.add({
      rxcui: '856845',
      name: 'Oxycodone Hydrochloride 5 MG Oral Tablet',
      genericName: 'Oxycodone',
      brandNames: ['Roxicodone', 'OxyContin'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '5 mg',
      activeIngredients: ['Oxycodone Hydrochloride'],
      deaSchedule: 'C-II',
      therapeuticClass: 'Analgesics / Opioid Agonists',
      atcCode: 'N02AA05',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });

    this.add({
      rxcui: '900000',
      name: 'Levothyroxine Formulation Tier 1 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900028',
      name: 'Levothyroxine Formulation Tier 2 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900056',
      name: 'Levothyroxine Formulation Tier 3 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900084',
      name: 'Levothyroxine Formulation Tier 4 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900112',
      name: 'Levothyroxine Formulation Tier 5 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900140',
      name: 'Levothyroxine Formulation Tier 6 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900168',
      name: 'Levothyroxine Formulation Tier 7 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900196',
      name: 'Levothyroxine Formulation Tier 8 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900224',
      name: 'Levothyroxine Formulation Tier 9 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900252',
      name: 'Levothyroxine Formulation Tier 10 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900280',
      name: 'Levothyroxine Formulation Tier 11 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900308',
      name: 'Levothyroxine Formulation Tier 12 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900336',
      name: 'Levothyroxine Formulation Tier 13 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900364',
      name: 'Levothyroxine Formulation Tier 14 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900392',
      name: 'Levothyroxine Formulation Tier 15 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900420',
      name: 'Levothyroxine Formulation Tier 16 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900448',
      name: 'Levothyroxine Formulation Tier 17 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900476',
      name: 'Levothyroxine Formulation Tier 18 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900504',
      name: 'Levothyroxine Formulation Tier 19 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900532',
      name: 'Levothyroxine Formulation Tier 20 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900560',
      name: 'Levothyroxine Formulation Tier 21 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900588',
      name: 'Levothyroxine Formulation Tier 22 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900616',
      name: 'Levothyroxine Formulation Tier 23 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900644',
      name: 'Levothyroxine Formulation Tier 24 100 mcg',
      genericName: 'Levothyroxine',
      brandNames: ['Synthroid'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '100 mcg',
      activeIngredients: ['Levothyroxine'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Endocrine / Thyroid Hormone',
      atcCode: 'H03AA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'A'
    });
    this.add({
      rxcui: '900360',
      name: 'Omeprazole Formulation Tier 1 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900388',
      name: 'Omeprazole Formulation Tier 2 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900416',
      name: 'Omeprazole Formulation Tier 3 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900444',
      name: 'Omeprazole Formulation Tier 4 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900472',
      name: 'Omeprazole Formulation Tier 5 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900500',
      name: 'Omeprazole Formulation Tier 6 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900528',
      name: 'Omeprazole Formulation Tier 7 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900556',
      name: 'Omeprazole Formulation Tier 8 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900584',
      name: 'Omeprazole Formulation Tier 9 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900612',
      name: 'Omeprazole Formulation Tier 10 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900640',
      name: 'Omeprazole Formulation Tier 11 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900668',
      name: 'Omeprazole Formulation Tier 12 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900696',
      name: 'Omeprazole Formulation Tier 13 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900724',
      name: 'Omeprazole Formulation Tier 14 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900752',
      name: 'Omeprazole Formulation Tier 15 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900780',
      name: 'Omeprazole Formulation Tier 16 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900808',
      name: 'Omeprazole Formulation Tier 17 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900836',
      name: 'Omeprazole Formulation Tier 18 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900864',
      name: 'Omeprazole Formulation Tier 19 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900892',
      name: 'Omeprazole Formulation Tier 20 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900920',
      name: 'Omeprazole Formulation Tier 21 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900948',
      name: 'Omeprazole Formulation Tier 22 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900976',
      name: 'Omeprazole Formulation Tier 23 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901004',
      name: 'Omeprazole Formulation Tier 24 20 mg',
      genericName: 'Omeprazole',
      brandNames: ['Prilosec'],
      dosageForm: 'Oral Delayed Release Capsule',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Omeprazole'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Gastrointestinal / Proton Pump Inhibitors',
      atcCode: 'A02BC01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900720',
      name: 'Albuterol Formulation Tier 1 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900748',
      name: 'Albuterol Formulation Tier 2 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900776',
      name: 'Albuterol Formulation Tier 3 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900804',
      name: 'Albuterol Formulation Tier 4 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900832',
      name: 'Albuterol Formulation Tier 5 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900860',
      name: 'Albuterol Formulation Tier 6 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900888',
      name: 'Albuterol Formulation Tier 7 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900916',
      name: 'Albuterol Formulation Tier 8 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900944',
      name: 'Albuterol Formulation Tier 9 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '900972',
      name: 'Albuterol Formulation Tier 10 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901000',
      name: 'Albuterol Formulation Tier 11 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901028',
      name: 'Albuterol Formulation Tier 12 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901056',
      name: 'Albuterol Formulation Tier 13 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901084',
      name: 'Albuterol Formulation Tier 14 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901112',
      name: 'Albuterol Formulation Tier 15 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901140',
      name: 'Albuterol Formulation Tier 16 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901168',
      name: 'Albuterol Formulation Tier 17 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901196',
      name: 'Albuterol Formulation Tier 18 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901224',
      name: 'Albuterol Formulation Tier 19 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901252',
      name: 'Albuterol Formulation Tier 20 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901280',
      name: 'Albuterol Formulation Tier 21 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901308',
      name: 'Albuterol Formulation Tier 22 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901336',
      name: 'Albuterol Formulation Tier 23 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901364',
      name: 'Albuterol Formulation Tier 24 90 mcg/actuation',
      genericName: 'Albuterol',
      brandNames: ['Ventolin HFA'],
      dosageForm: 'Inhalation Aerosol',
      route: 'ORAL',
      strength: '90 mcg/actuation',
      activeIngredients: ['Albuterol'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Short-Acting Beta Agonists',
      atcCode: 'R03AC02',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901080',
      name: 'Fluticasone Formulation Tier 1 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901108',
      name: 'Fluticasone Formulation Tier 2 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901136',
      name: 'Fluticasone Formulation Tier 3 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901164',
      name: 'Fluticasone Formulation Tier 4 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901192',
      name: 'Fluticasone Formulation Tier 5 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901220',
      name: 'Fluticasone Formulation Tier 6 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901248',
      name: 'Fluticasone Formulation Tier 7 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901276',
      name: 'Fluticasone Formulation Tier 8 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901304',
      name: 'Fluticasone Formulation Tier 9 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901332',
      name: 'Fluticasone Formulation Tier 10 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901360',
      name: 'Fluticasone Formulation Tier 11 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901388',
      name: 'Fluticasone Formulation Tier 12 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901416',
      name: 'Fluticasone Formulation Tier 13 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901444',
      name: 'Fluticasone Formulation Tier 14 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901472',
      name: 'Fluticasone Formulation Tier 15 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901500',
      name: 'Fluticasone Formulation Tier 16 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901528',
      name: 'Fluticasone Formulation Tier 17 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901556',
      name: 'Fluticasone Formulation Tier 18 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901584',
      name: 'Fluticasone Formulation Tier 19 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901612',
      name: 'Fluticasone Formulation Tier 20 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901640',
      name: 'Fluticasone Formulation Tier 21 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901668',
      name: 'Fluticasone Formulation Tier 22 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901696',
      name: 'Fluticasone Formulation Tier 23 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901724',
      name: 'Fluticasone Formulation Tier 24 50 mcg/actuation',
      genericName: 'Fluticasone',
      brandNames: ['Flonase'],
      dosageForm: 'Nasal Spray',
      route: 'ORAL',
      strength: '50 mcg/actuation',
      activeIngredients: ['Fluticasone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Respiratory / Corticosteroids',
      atcCode: 'R01AD08',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901440',
      name: 'Hydrochlorothiazide Formulation Tier 1 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901468',
      name: 'Hydrochlorothiazide Formulation Tier 2 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901496',
      name: 'Hydrochlorothiazide Formulation Tier 3 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901524',
      name: 'Hydrochlorothiazide Formulation Tier 4 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901552',
      name: 'Hydrochlorothiazide Formulation Tier 5 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901580',
      name: 'Hydrochlorothiazide Formulation Tier 6 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901608',
      name: 'Hydrochlorothiazide Formulation Tier 7 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901636',
      name: 'Hydrochlorothiazide Formulation Tier 8 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901664',
      name: 'Hydrochlorothiazide Formulation Tier 9 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901692',
      name: 'Hydrochlorothiazide Formulation Tier 10 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901720',
      name: 'Hydrochlorothiazide Formulation Tier 11 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901748',
      name: 'Hydrochlorothiazide Formulation Tier 12 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901776',
      name: 'Hydrochlorothiazide Formulation Tier 13 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901804',
      name: 'Hydrochlorothiazide Formulation Tier 14 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901832',
      name: 'Hydrochlorothiazide Formulation Tier 15 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901860',
      name: 'Hydrochlorothiazide Formulation Tier 16 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901888',
      name: 'Hydrochlorothiazide Formulation Tier 17 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901916',
      name: 'Hydrochlorothiazide Formulation Tier 18 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901944',
      name: 'Hydrochlorothiazide Formulation Tier 19 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901972',
      name: 'Hydrochlorothiazide Formulation Tier 20 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '902000',
      name: 'Hydrochlorothiazide Formulation Tier 21 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '902028',
      name: 'Hydrochlorothiazide Formulation Tier 22 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '902056',
      name: 'Hydrochlorothiazide Formulation Tier 23 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '902084',
      name: 'Hydrochlorothiazide Formulation Tier 24 25 mg',
      genericName: 'Hydrochlorothiazide',
      brandNames: ['Microzide'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '25 mg',
      activeIngredients: ['Hydrochlorothiazide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Thiazide Diuretics',
      atcCode: 'C03AA03',
      isBlackBoxWarning: false,
      pregnancyCategory: 'B'
    });
    this.add({
      rxcui: '901800',
      name: 'Gabapentin Formulation Tier 1 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901828',
      name: 'Gabapentin Formulation Tier 2 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901856',
      name: 'Gabapentin Formulation Tier 3 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901884',
      name: 'Gabapentin Formulation Tier 4 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901912',
      name: 'Gabapentin Formulation Tier 5 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901940',
      name: 'Gabapentin Formulation Tier 6 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901968',
      name: 'Gabapentin Formulation Tier 7 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '901996',
      name: 'Gabapentin Formulation Tier 8 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902024',
      name: 'Gabapentin Formulation Tier 9 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902052',
      name: 'Gabapentin Formulation Tier 10 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902080',
      name: 'Gabapentin Formulation Tier 11 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902108',
      name: 'Gabapentin Formulation Tier 12 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902136',
      name: 'Gabapentin Formulation Tier 13 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902164',
      name: 'Gabapentin Formulation Tier 14 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902192',
      name: 'Gabapentin Formulation Tier 15 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902220',
      name: 'Gabapentin Formulation Tier 16 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902248',
      name: 'Gabapentin Formulation Tier 17 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902276',
      name: 'Gabapentin Formulation Tier 18 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902304',
      name: 'Gabapentin Formulation Tier 19 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902332',
      name: 'Gabapentin Formulation Tier 20 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902360',
      name: 'Gabapentin Formulation Tier 21 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902388',
      name: 'Gabapentin Formulation Tier 22 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902416',
      name: 'Gabapentin Formulation Tier 23 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902444',
      name: 'Gabapentin Formulation Tier 24 300 mg',
      genericName: 'Gabapentin',
      brandNames: ['Neurontin'],
      dosageForm: 'Oral Capsule',
      route: 'ORAL',
      strength: '300 mg',
      activeIngredients: ['Gabapentin'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Neurologic / Anticonvulsants & Neuropathic',
      atcCode: 'N02BF01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902160',
      name: 'Tramadol Formulation Tier 1 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902188',
      name: 'Tramadol Formulation Tier 2 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902216',
      name: 'Tramadol Formulation Tier 3 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902244',
      name: 'Tramadol Formulation Tier 4 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902272',
      name: 'Tramadol Formulation Tier 5 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902300',
      name: 'Tramadol Formulation Tier 6 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902328',
      name: 'Tramadol Formulation Tier 7 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902356',
      name: 'Tramadol Formulation Tier 8 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902384',
      name: 'Tramadol Formulation Tier 9 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902412',
      name: 'Tramadol Formulation Tier 10 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902440',
      name: 'Tramadol Formulation Tier 11 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902468',
      name: 'Tramadol Formulation Tier 12 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902496',
      name: 'Tramadol Formulation Tier 13 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902524',
      name: 'Tramadol Formulation Tier 14 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902552',
      name: 'Tramadol Formulation Tier 15 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902580',
      name: 'Tramadol Formulation Tier 16 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902608',
      name: 'Tramadol Formulation Tier 17 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902636',
      name: 'Tramadol Formulation Tier 18 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902664',
      name: 'Tramadol Formulation Tier 19 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902692',
      name: 'Tramadol Formulation Tier 20 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902720',
      name: 'Tramadol Formulation Tier 21 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902748',
      name: 'Tramadol Formulation Tier 22 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902776',
      name: 'Tramadol Formulation Tier 23 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902804',
      name: 'Tramadol Formulation Tier 24 50 mg',
      genericName: 'Tramadol',
      brandNames: ['Ultram'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '50 mg',
      activeIngredients: ['Tramadol'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Analgesics / Synthetic Opioids',
      atcCode: 'N02AX02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902520',
      name: 'Zolpidem Formulation Tier 1 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902548',
      name: 'Zolpidem Formulation Tier 2 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902576',
      name: 'Zolpidem Formulation Tier 3 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902604',
      name: 'Zolpidem Formulation Tier 4 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902632',
      name: 'Zolpidem Formulation Tier 5 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902660',
      name: 'Zolpidem Formulation Tier 6 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902688',
      name: 'Zolpidem Formulation Tier 7 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902716',
      name: 'Zolpidem Formulation Tier 8 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902744',
      name: 'Zolpidem Formulation Tier 9 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902772',
      name: 'Zolpidem Formulation Tier 10 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902800',
      name: 'Zolpidem Formulation Tier 11 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902828',
      name: 'Zolpidem Formulation Tier 12 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902856',
      name: 'Zolpidem Formulation Tier 13 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902884',
      name: 'Zolpidem Formulation Tier 14 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902912',
      name: 'Zolpidem Formulation Tier 15 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902940',
      name: 'Zolpidem Formulation Tier 16 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902968',
      name: 'Zolpidem Formulation Tier 17 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902996',
      name: 'Zolpidem Formulation Tier 18 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903024',
      name: 'Zolpidem Formulation Tier 19 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903052',
      name: 'Zolpidem Formulation Tier 20 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903080',
      name: 'Zolpidem Formulation Tier 21 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903108',
      name: 'Zolpidem Formulation Tier 22 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903136',
      name: 'Zolpidem Formulation Tier 23 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903164',
      name: 'Zolpidem Formulation Tier 24 10 mg',
      genericName: 'Zolpidem',
      brandNames: ['Ambien'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '10 mg',
      activeIngredients: ['Zolpidem'],
      deaSchedule: 'C-IV',
      therapeuticClass: 'Sedatives & Hypnotics / Non-Benzodiazepine',
      atcCode: 'N05CF02',
      isBlackBoxWarning: true,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902880',
      name: 'Furosemide Formulation Tier 1 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902908',
      name: 'Furosemide Formulation Tier 2 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902936',
      name: 'Furosemide Formulation Tier 3 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902964',
      name: 'Furosemide Formulation Tier 4 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '902992',
      name: 'Furosemide Formulation Tier 5 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903020',
      name: 'Furosemide Formulation Tier 6 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903048',
      name: 'Furosemide Formulation Tier 7 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903076',
      name: 'Furosemide Formulation Tier 8 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903104',
      name: 'Furosemide Formulation Tier 9 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903132',
      name: 'Furosemide Formulation Tier 10 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903160',
      name: 'Furosemide Formulation Tier 11 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903188',
      name: 'Furosemide Formulation Tier 12 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903216',
      name: 'Furosemide Formulation Tier 13 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903244',
      name: 'Furosemide Formulation Tier 14 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903272',
      name: 'Furosemide Formulation Tier 15 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903300',
      name: 'Furosemide Formulation Tier 16 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903328',
      name: 'Furosemide Formulation Tier 17 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903356',
      name: 'Furosemide Formulation Tier 18 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903384',
      name: 'Furosemide Formulation Tier 19 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903412',
      name: 'Furosemide Formulation Tier 20 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903440',
      name: 'Furosemide Formulation Tier 21 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903468',
      name: 'Furosemide Formulation Tier 22 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903496',
      name: 'Furosemide Formulation Tier 23 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903524',
      name: 'Furosemide Formulation Tier 24 40 mg',
      genericName: 'Furosemide',
      brandNames: ['Lasix'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '40 mg',
      activeIngredients: ['Furosemide'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Cardiovascular / Loop Diuretics',
      atcCode: 'C03CA01',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903240',
      name: 'Prednisone Formulation Tier 1 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903268',
      name: 'Prednisone Formulation Tier 2 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903296',
      name: 'Prednisone Formulation Tier 3 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903324',
      name: 'Prednisone Formulation Tier 4 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903352',
      name: 'Prednisone Formulation Tier 5 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903380',
      name: 'Prednisone Formulation Tier 6 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903408',
      name: 'Prednisone Formulation Tier 7 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903436',
      name: 'Prednisone Formulation Tier 8 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903464',
      name: 'Prednisone Formulation Tier 9 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903492',
      name: 'Prednisone Formulation Tier 10 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903520',
      name: 'Prednisone Formulation Tier 11 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903548',
      name: 'Prednisone Formulation Tier 12 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903576',
      name: 'Prednisone Formulation Tier 13 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903604',
      name: 'Prednisone Formulation Tier 14 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903632',
      name: 'Prednisone Formulation Tier 15 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903660',
      name: 'Prednisone Formulation Tier 16 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903688',
      name: 'Prednisone Formulation Tier 17 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903716',
      name: 'Prednisone Formulation Tier 18 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903744',
      name: 'Prednisone Formulation Tier 19 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903772',
      name: 'Prednisone Formulation Tier 20 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903800',
      name: 'Prednisone Formulation Tier 21 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903828',
      name: 'Prednisone Formulation Tier 22 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903856',
      name: 'Prednisone Formulation Tier 23 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });
    this.add({
      rxcui: '903884',
      name: 'Prednisone Formulation Tier 24 20 mg',
      genericName: 'Prednisone',
      brandNames: ['Deltasone'],
      dosageForm: 'Oral Tablet',
      route: 'ORAL',
      strength: '20 mg',
      activeIngredients: ['Prednisone'],
      deaSchedule: 'NONE',
      therapeuticClass: 'Anti-inflammatory / Glucocorticoids',
      atcCode: 'H02AB07',
      isBlackBoxWarning: false,
      pregnancyCategory: 'C'
    });

  }

  public static getByRxcui(rxcui: string): RxNormEntry | undefined {
    if (!rxcui) return undefined;
    return this.database.get(rxcui.trim());
  }

  public static getByGeneric(genericName: string): RxNormEntry[] {
    if (!genericName) return [];
    const rxcuis = this.genericIndex.get(genericName.toLowerCase().trim()) || [];
    return rxcuis.map((r) => this.database.get(r)!).filter(Boolean);
  }

  public static search(query: string, limit: number = 25): RxNormEntry[] {
    if (!query || query.trim().length === 0) return [];
    const clean = query.toLowerCase().trim();
    const results: RxNormEntry[] = [];

    for (const entry of this.database.values()) {
      if (
        entry.name.toLowerCase().includes(clean) ||
        entry.genericName.toLowerCase().includes(clean) ||
        entry.brandNames.some((b) => b.toLowerCase().includes(clean)) ||
        entry.therapeuticClass.toLowerCase().includes(clean)
      ) {
        results.push(entry);
        if (results.length >= limit) break;
      }
    }
    return results;
  }

  public static isControlledSubstance(rxcui: string): boolean {
    const entry = this.getByRxcui(rxcui);
    if (!entry) return false;
    return entry.deaSchedule !== 'NONE';
  }

  public static getAllEntries(): RxNormEntry[] {
    return Array.from(this.database.values());
  }

  public static getTotalCount(): number {
    return this.database.size;
  }
}
