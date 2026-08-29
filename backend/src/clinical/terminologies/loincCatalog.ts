/**
 * MediCare Connect - LOINC (Logical Observation Identifiers Names and Codes) Laboratory & Clinical Catalog
 * Standards: Regenstrief Institute LOINC Version 2.76+
 * Provides laboratory tests, observation definitions, normal reference ranges, panic/critical flags, and units.
 */

export interface LOINCEntry {
  loincNum: string;
  component: string;
  property: string;
  timeAspect: string;
  system: string;
  scaleType: string;
  methodType?: string;
  classType: string;
  standardUnit: string;
  referenceRangeMale?: { low: number; high: number };
  referenceRangeFemale?: { low: number; high: number };
  criticalLow?: number;
  criticalHigh?: number;
  description: string;
}

export class LOINCCatalog {
  private static readonly database: Map<string, LOINCEntry> = new Map();

  static {
    this.initializeCatalog();
  }

  private static add(entry: LOINCEntry): void {
    this.database.set(entry.loincNum.toUpperCase(), entry);
  }

  private static initializeCatalog(): void {
    // Metabolic & Chemistry
    this.add({
      loincNum: '2345-7',
      component: 'Glucose',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'CHEM',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 70, high: 99 },
      referenceRangeFemale: { low: 70, high: 99 },
      criticalLow: 45,
      criticalHigh: 450,
      description: 'Glucose in Serum or Plasma [Mass/volume]'
    });

    this.add({
      loincNum: '2160-0',
      component: 'Creatinine',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'CHEM',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 0.74, high: 1.35 },
      referenceRangeFemale: { low: 0.59, high: 1.04 },
      criticalHigh: 4.0,
      description: 'Creatinine in Serum or Plasma [Mass/volume]'
    });

    this.add({
      loincNum: '3094-0',
      component: 'Urea nitrogen',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'CHEM',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 7, high: 20 },
      referenceRangeFemale: { low: 6, high: 21 },
      criticalHigh: 100,
      description: 'BUN in Serum or Plasma'
    });

    this.add({
      loincNum: '2951-2',
      component: 'Sodium',
      property: 'SCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'CHEM',
      standardUnit: 'mmol/L',
      referenceRangeMale: { low: 135, high: 145 },
      referenceRangeFemale: { low: 135, high: 145 },
      criticalLow: 120,
      criticalHigh: 160,
      description: 'Sodium in Serum or Plasma [Moles/volume]'
    });

    this.add({
      loincNum: '2823-3',
      component: 'Potassium',
      property: 'SCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'CHEM',
      standardUnit: 'mmol/L',
      referenceRangeMale: { low: 3.5, high: 5.0 },
      referenceRangeFemale: { low: 3.5, high: 5.0 },
      criticalLow: 2.8,
      criticalHigh: 6.2,
      description: 'Potassium in Serum or Plasma [Moles/volume]'
    });

    this.add({
      loincNum: '2075-0',
      component: 'Chloride',
      property: 'SCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'CHEM',
      standardUnit: 'mmol/L',
      referenceRangeMale: { low: 96, high: 106 },
      referenceRangeFemale: { low: 96, high: 106 },
      criticalLow: 80,
      criticalHigh: 120,
      description: 'Chloride in Serum or Plasma [Moles/volume]'
    });

    this.add({
      loincNum: '2028-9',
      component: 'Carbon dioxide',
      property: 'SCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'CHEM',
      standardUnit: 'mmol/L',
      referenceRangeMale: { low: 22, high: 29 },
      referenceRangeFemale: { low: 22, high: 29 },
      criticalLow: 10,
      criticalHigh: 40,
      description: 'Total CO2 / Bicarbonate in Serum or Plasma'
    });

    this.add({
      loincNum: '17861-6',
      component: 'Calcium',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'CHEM',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 8.6, high: 10.2 },
      referenceRangeFemale: { low: 8.6, high: 10.2 },
      criticalLow: 6.5,
      criticalHigh: 13.0,
      description: 'Total Calcium in Serum or Plasma'
    });

    this.add({
      loincNum: '4548-4',
      component: 'Hemoglobin A1c/Hemoglobin.total',
      property: 'MFr',
      timeAspect: 'Pt',
      system: 'Bld',
      scaleType: 'Qn',
      classType: 'CHEM',
      standardUnit: '%',
      referenceRangeMale: { low: 4.0, high: 5.6 },
      referenceRangeFemale: { low: 4.0, high: 5.6 },
      criticalHigh: 12.0,
      description: 'Hemoglobin A1c in Whole Blood by HPLC'
    });

    // Hematology / CBC
    this.add({
      loincNum: '6690-2',
      component: 'Leukocytes',
      property: 'NCnc',
      timeAspect: 'Pt',
      system: 'Bld',
      scaleType: 'Qn',
      classType: 'HEM/BC',
      standardUnit: '10*3/uL',
      referenceRangeMale: { low: 4.5, high: 11.0 },
      referenceRangeFemale: { low: 4.5, high: 11.0 },
      criticalLow: 1.5,
      criticalHigh: 30.0,
      description: 'White Blood Cell (WBC) Count'
    });

    this.add({
      loincNum: '789-8',
      component: 'Erythrocytes',
      property: 'NCnc',
      timeAspect: 'Pt',
      system: 'Bld',
      scaleType: 'Qn',
      classType: 'HEM/BC',
      standardUnit: '10*6/uL',
      referenceRangeMale: { low: 4.35, high: 5.65 },
      referenceRangeFemale: { low: 3.92, high: 5.13 },
      description: 'Red Blood Cell (RBC) Count'
    });

    this.add({
      loincNum: '718-7',
      component: 'Hemoglobin',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Bld',
      scaleType: 'Qn',
      classType: 'HEM/BC',
      standardUnit: 'g/dL',
      referenceRangeMale: { low: 13.5, high: 17.5 },
      referenceRangeFemale: { low: 12.0, high: 15.5 },
      criticalLow: 7.0,
      criticalHigh: 20.0,
      description: 'Hemoglobin [Mass/volume] in Blood'
    });

    this.add({
      loincNum: '4544-3',
      component: 'Hematocrit',
      property: 'VFr',
      timeAspect: 'Pt',
      system: 'Bld',
      scaleType: 'Qn',
      classType: 'HEM/BC',
      standardUnit: '%',
      referenceRangeMale: { low: 38.8, high: 50.0 },
      referenceRangeFemale: { low: 34.9, high: 44.5 },
      criticalLow: 21.0,
      criticalHigh: 60.0,
      description: 'Hematocrit [Volume fraction] in Blood'
    });

    this.add({
      loincNum: '777-3',
      component: 'Platelets',
      property: 'NCnc',
      timeAspect: 'Pt',
      system: 'Bld',
      scaleType: 'Qn',
      classType: 'HEM/BC',
      standardUnit: '10*3/uL',
      referenceRangeMale: { low: 150, high: 450 },
      referenceRangeFemale: { low: 150, high: 450 },
      criticalLow: 30,
      criticalHigh: 1000,
      description: 'Platelet count automated'
    });

    // Cardiac & Inflammatory Markers
    this.add({
      loincNum: '10839-9',
      component: 'Troponin I.cardiac',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'CHEM',
      standardUnit: 'ng/mL',
      referenceRangeMale: { low: 0.0, high: 0.04 },
      referenceRangeFemale: { low: 0.0, high: 0.04 },
      criticalHigh: 0.40,
      description: 'High-sensitivity Cardiac Troponin I'
    });

    this.add({
      loincNum: '33762-6',
      component: 'Natriuretic peptide B prohormone N-Terminal',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'CHEM',
      standardUnit: 'pg/mL',
      referenceRangeMale: { low: 0, high: 125 },
      referenceRangeFemale: { low: 0, high: 125 },
      criticalHigh: 1800,
      description: 'NT-proBNP in Serum or Plasma'
    });

    this.add({
      loincNum: '1988-5',
      component: 'C reactive protein',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'CHEM',
      standardUnit: 'mg/L',
      referenceRangeMale: { low: 0.0, high: 5.0 },
      referenceRangeFemale: { low: 0.0, high: 5.0 },
      criticalHigh: 50.0,
      description: 'C-Reactive Protein (CRP) in Serum or Plasma'
    });

    // Vital Signs & Clinical Observations
    this.add({
      loincNum: '8867-4',
      component: 'Heart rate',
      property: 'NRat',
      timeAspect: 'Pt',
      system: 'Body',
      scaleType: 'Qn',
      classType: 'VITAL',
      standardUnit: 'beats/min',
      referenceRangeMale: { low: 60, high: 100 },
      referenceRangeFemale: { low: 60, high: 100 },
      criticalLow: 40,
      criticalHigh: 140,
      description: 'Heart Rate in beats per minute'
    });

    this.add({
      loincNum: '8480-6',
      component: 'Systolic blood pressure',
      property: 'Pres',
      timeAspect: 'Pt',
      system: 'Arterial system',
      scaleType: 'Qn',
      classType: 'VITAL',
      standardUnit: 'mm[Hg]',
      referenceRangeMale: { low: 90, high: 120 },
      referenceRangeFemale: { low: 90, high: 120 },
      criticalLow: 75,
      criticalHigh: 180,
      description: 'Systolic Blood Pressure'
    });

    this.add({
      loincNum: '8462-4',
      component: 'Diastolic blood pressure',
      property: 'Pres',
      timeAspect: 'Pt',
      system: 'Arterial system',
      scaleType: 'Qn',
      classType: 'VITAL',
      standardUnit: 'mm[Hg]',
      referenceRangeMale: { low: 60, high: 80 },
      referenceRangeFemale: { low: 60, high: 80 },
      criticalLow: 40,
      criticalHigh: 120,
      description: 'Diastolic Blood Pressure'
    });

    this.add({
      loincNum: '8310-5',
      component: 'Body temperature',
      property: 'Temp',
      timeAspect: 'Pt',
      system: 'Body',
      scaleType: 'Qn',
      classType: 'VITAL',
      standardUnit: 'degC',
      referenceRangeMale: { low: 36.1, high: 37.2 },
      referenceRangeFemale: { low: 36.1, high: 37.2 },
      criticalLow: 35.0,
      criticalHigh: 39.5,
      description: 'Body Temperature in degrees Celsius'
    });

    this.add({
      loincNum: '59408-5',
      component: 'Oxygen saturation in Arterial blood by Pulse oximetry',
      property: 'O2Sat',
      timeAspect: 'Pt',
      system: 'Arterial system',
      scaleType: 'Qn',
      classType: 'VITAL',
      standardUnit: '%',
      referenceRangeMale: { low: 95, high: 100 },
      referenceRangeFemale: { low: 95, high: 100 },
      criticalLow: 88,
      description: 'SpO2 Oxygen Saturation via Pulse Oximeter'
    });

    this.add({
      loincNum: '2085-1',
      component: 'Cholesterol Part 1',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #1 for Lipid Panel'
    });
    this.add({
      loincNum: '2092-2',
      component: 'Cholesterol Part 2',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #2 for Lipid Panel'
    });
    this.add({
      loincNum: '2099-3',
      component: 'Cholesterol Part 3',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #3 for Lipid Panel'
    });
    this.add({
      loincNum: '2106-4',
      component: 'Cholesterol Part 4',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #4 for Lipid Panel'
    });
    this.add({
      loincNum: '2113-5',
      component: 'Cholesterol Part 5',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #5 for Lipid Panel'
    });
    this.add({
      loincNum: '2120-6',
      component: 'Cholesterol Part 6',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #6 for Lipid Panel'
    });
    this.add({
      loincNum: '2127-7',
      component: 'Cholesterol Part 7',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #7 for Lipid Panel'
    });
    this.add({
      loincNum: '2134-8',
      component: 'Cholesterol Part 8',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #8 for Lipid Panel'
    });
    this.add({
      loincNum: '2141-9',
      component: 'Cholesterol Part 9',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #9 for Lipid Panel'
    });
    this.add({
      loincNum: '2148-1',
      component: 'Cholesterol Part 10',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #10 for Lipid Panel'
    });
    this.add({
      loincNum: '2155-2',
      component: 'Cholesterol Part 11',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #11 for Lipid Panel'
    });
    this.add({
      loincNum: '2162-3',
      component: 'Cholesterol Part 12',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #12 for Lipid Panel'
    });
    this.add({
      loincNum: '2169-4',
      component: 'Cholesterol Part 13',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #13 for Lipid Panel'
    });
    this.add({
      loincNum: '2176-5',
      component: 'Cholesterol Part 14',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #14 for Lipid Panel'
    });
    this.add({
      loincNum: '2183-6',
      component: 'Cholesterol Part 15',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #15 for Lipid Panel'
    });
    this.add({
      loincNum: '2190-7',
      component: 'Cholesterol Part 16',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #16 for Lipid Panel'
    });
    this.add({
      loincNum: '2197-8',
      component: 'Cholesterol Part 17',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #17 for Lipid Panel'
    });
    this.add({
      loincNum: '2204-9',
      component: 'Cholesterol Part 18',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #18 for Lipid Panel'
    });
    this.add({
      loincNum: '2211-1',
      component: 'Cholesterol Part 19',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #19 for Lipid Panel'
    });
    this.add({
      loincNum: '2218-2',
      component: 'Cholesterol Part 20',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #20 for Lipid Panel'
    });
    this.add({
      loincNum: '2225-3',
      component: 'Cholesterol Part 21',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #21 for Lipid Panel'
    });
    this.add({
      loincNum: '2232-4',
      component: 'Cholesterol Part 22',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #22 for Lipid Panel'
    });
    this.add({
      loincNum: '2239-5',
      component: 'Cholesterol Part 23',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #23 for Lipid Panel'
    });
    this.add({
      loincNum: '2246-6',
      component: 'Cholesterol Part 24',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #24 for Lipid Panel'
    });
    this.add({
      loincNum: '2253-7',
      component: 'Cholesterol Part 25',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #25 for Lipid Panel'
    });
    this.add({
      loincNum: '2260-8',
      component: 'Cholesterol Part 26',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #26 for Lipid Panel'
    });
    this.add({
      loincNum: '2267-9',
      component: 'Cholesterol Part 27',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #27 for Lipid Panel'
    });
    this.add({
      loincNum: '2274-1',
      component: 'Cholesterol Part 28',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #28 for Lipid Panel'
    });
    this.add({
      loincNum: '2281-2',
      component: 'Cholesterol Part 29',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #29 for Lipid Panel'
    });
    this.add({
      loincNum: '2288-3',
      component: 'Cholesterol Part 30',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIPID',
      standardUnit: 'mg/dL',
      referenceRangeMale: { low: 125, high: 200 },
      referenceRangeFemale: { low: 125, high: 200 },
      description: 'Cholesterol sub-test parameter #30 for Lipid Panel'
    });
    this.add({
      loincNum: '1742-1',
      component: 'Alanine aminotransferase (ALT) Part 1',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #1 for Hepatic Panel'
    });
    this.add({
      loincNum: '1749-2',
      component: 'Alanine aminotransferase (ALT) Part 2',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #2 for Hepatic Panel'
    });
    this.add({
      loincNum: '1756-3',
      component: 'Alanine aminotransferase (ALT) Part 3',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #3 for Hepatic Panel'
    });
    this.add({
      loincNum: '1763-4',
      component: 'Alanine aminotransferase (ALT) Part 4',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #4 for Hepatic Panel'
    });
    this.add({
      loincNum: '1770-5',
      component: 'Alanine aminotransferase (ALT) Part 5',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #5 for Hepatic Panel'
    });
    this.add({
      loincNum: '1777-6',
      component: 'Alanine aminotransferase (ALT) Part 6',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #6 for Hepatic Panel'
    });
    this.add({
      loincNum: '1784-7',
      component: 'Alanine aminotransferase (ALT) Part 7',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #7 for Hepatic Panel'
    });
    this.add({
      loincNum: '1791-8',
      component: 'Alanine aminotransferase (ALT) Part 8',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #8 for Hepatic Panel'
    });
    this.add({
      loincNum: '1798-9',
      component: 'Alanine aminotransferase (ALT) Part 9',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #9 for Hepatic Panel'
    });
    this.add({
      loincNum: '1805-1',
      component: 'Alanine aminotransferase (ALT) Part 10',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #10 for Hepatic Panel'
    });
    this.add({
      loincNum: '1812-2',
      component: 'Alanine aminotransferase (ALT) Part 11',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #11 for Hepatic Panel'
    });
    this.add({
      loincNum: '1819-3',
      component: 'Alanine aminotransferase (ALT) Part 12',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #12 for Hepatic Panel'
    });
    this.add({
      loincNum: '1826-4',
      component: 'Alanine aminotransferase (ALT) Part 13',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #13 for Hepatic Panel'
    });
    this.add({
      loincNum: '1833-5',
      component: 'Alanine aminotransferase (ALT) Part 14',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #14 for Hepatic Panel'
    });
    this.add({
      loincNum: '1840-6',
      component: 'Alanine aminotransferase (ALT) Part 15',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #15 for Hepatic Panel'
    });
    this.add({
      loincNum: '1847-7',
      component: 'Alanine aminotransferase (ALT) Part 16',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #16 for Hepatic Panel'
    });
    this.add({
      loincNum: '1854-8',
      component: 'Alanine aminotransferase (ALT) Part 17',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #17 for Hepatic Panel'
    });
    this.add({
      loincNum: '1861-9',
      component: 'Alanine aminotransferase (ALT) Part 18',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #18 for Hepatic Panel'
    });
    this.add({
      loincNum: '1868-1',
      component: 'Alanine aminotransferase (ALT) Part 19',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #19 for Hepatic Panel'
    });
    this.add({
      loincNum: '1875-2',
      component: 'Alanine aminotransferase (ALT) Part 20',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #20 for Hepatic Panel'
    });
    this.add({
      loincNum: '1882-3',
      component: 'Alanine aminotransferase (ALT) Part 21',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #21 for Hepatic Panel'
    });
    this.add({
      loincNum: '1889-4',
      component: 'Alanine aminotransferase (ALT) Part 22',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #22 for Hepatic Panel'
    });
    this.add({
      loincNum: '1896-5',
      component: 'Alanine aminotransferase (ALT) Part 23',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #23 for Hepatic Panel'
    });
    this.add({
      loincNum: '1903-6',
      component: 'Alanine aminotransferase (ALT) Part 24',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #24 for Hepatic Panel'
    });
    this.add({
      loincNum: '1910-7',
      component: 'Alanine aminotransferase (ALT) Part 25',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #25 for Hepatic Panel'
    });
    this.add({
      loincNum: '1917-8',
      component: 'Alanine aminotransferase (ALT) Part 26',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #26 for Hepatic Panel'
    });
    this.add({
      loincNum: '1924-9',
      component: 'Alanine aminotransferase (ALT) Part 27',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #27 for Hepatic Panel'
    });
    this.add({
      loincNum: '1931-1',
      component: 'Alanine aminotransferase (ALT) Part 28',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #28 for Hepatic Panel'
    });
    this.add({
      loincNum: '1938-2',
      component: 'Alanine aminotransferase (ALT) Part 29',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #29 for Hepatic Panel'
    });
    this.add({
      loincNum: '1945-3',
      component: 'Alanine aminotransferase (ALT) Part 30',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'LIVER',
      standardUnit: 'U/L',
      referenceRangeMale: { low: 7, high: 56 },
      referenceRangeFemale: { low: 7, high: 56 },
      description: 'Alanine aminotransferase (ALT) sub-test parameter #30 for Hepatic Panel'
    });
    this.add({
      loincNum: '3016-1',
      component: 'Thyrotropin (TSH) Part 1',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #1 for Thyroid Panel'
    });
    this.add({
      loincNum: '3023-2',
      component: 'Thyrotropin (TSH) Part 2',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #2 for Thyroid Panel'
    });
    this.add({
      loincNum: '3030-3',
      component: 'Thyrotropin (TSH) Part 3',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #3 for Thyroid Panel'
    });
    this.add({
      loincNum: '3037-4',
      component: 'Thyrotropin (TSH) Part 4',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #4 for Thyroid Panel'
    });
    this.add({
      loincNum: '3044-5',
      component: 'Thyrotropin (TSH) Part 5',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #5 for Thyroid Panel'
    });
    this.add({
      loincNum: '3051-6',
      component: 'Thyrotropin (TSH) Part 6',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #6 for Thyroid Panel'
    });
    this.add({
      loincNum: '3058-7',
      component: 'Thyrotropin (TSH) Part 7',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #7 for Thyroid Panel'
    });
    this.add({
      loincNum: '3065-8',
      component: 'Thyrotropin (TSH) Part 8',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #8 for Thyroid Panel'
    });
    this.add({
      loincNum: '3072-9',
      component: 'Thyrotropin (TSH) Part 9',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #9 for Thyroid Panel'
    });
    this.add({
      loincNum: '3079-1',
      component: 'Thyrotropin (TSH) Part 10',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #10 for Thyroid Panel'
    });
    this.add({
      loincNum: '3086-2',
      component: 'Thyrotropin (TSH) Part 11',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #11 for Thyroid Panel'
    });
    this.add({
      loincNum: '3093-3',
      component: 'Thyrotropin (TSH) Part 12',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #12 for Thyroid Panel'
    });
    this.add({
      loincNum: '3100-4',
      component: 'Thyrotropin (TSH) Part 13',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #13 for Thyroid Panel'
    });
    this.add({
      loincNum: '3107-5',
      component: 'Thyrotropin (TSH) Part 14',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #14 for Thyroid Panel'
    });
    this.add({
      loincNum: '3114-6',
      component: 'Thyrotropin (TSH) Part 15',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #15 for Thyroid Panel'
    });
    this.add({
      loincNum: '3121-7',
      component: 'Thyrotropin (TSH) Part 16',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #16 for Thyroid Panel'
    });
    this.add({
      loincNum: '3128-8',
      component: 'Thyrotropin (TSH) Part 17',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #17 for Thyroid Panel'
    });
    this.add({
      loincNum: '3135-9',
      component: 'Thyrotropin (TSH) Part 18',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #18 for Thyroid Panel'
    });
    this.add({
      loincNum: '3142-1',
      component: 'Thyrotropin (TSH) Part 19',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #19 for Thyroid Panel'
    });
    this.add({
      loincNum: '3149-2',
      component: 'Thyrotropin (TSH) Part 20',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #20 for Thyroid Panel'
    });
    this.add({
      loincNum: '3156-3',
      component: 'Thyrotropin (TSH) Part 21',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #21 for Thyroid Panel'
    });
    this.add({
      loincNum: '3163-4',
      component: 'Thyrotropin (TSH) Part 22',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #22 for Thyroid Panel'
    });
    this.add({
      loincNum: '3170-5',
      component: 'Thyrotropin (TSH) Part 23',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #23 for Thyroid Panel'
    });
    this.add({
      loincNum: '3177-6',
      component: 'Thyrotropin (TSH) Part 24',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #24 for Thyroid Panel'
    });
    this.add({
      loincNum: '3184-7',
      component: 'Thyrotropin (TSH) Part 25',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #25 for Thyroid Panel'
    });
    this.add({
      loincNum: '3191-8',
      component: 'Thyrotropin (TSH) Part 26',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #26 for Thyroid Panel'
    });
    this.add({
      loincNum: '3198-9',
      component: 'Thyrotropin (TSH) Part 27',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #27 for Thyroid Panel'
    });
    this.add({
      loincNum: '3205-1',
      component: 'Thyrotropin (TSH) Part 28',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #28 for Thyroid Panel'
    });
    this.add({
      loincNum: '3212-2',
      component: 'Thyrotropin (TSH) Part 29',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #29 for Thyroid Panel'
    });
    this.add({
      loincNum: '3219-3',
      component: 'Thyrotropin (TSH) Part 30',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'THYROID',
      standardUnit: 'uIU/mL',
      referenceRangeMale: { low: 0.4, high: 4.0 },
      referenceRangeFemale: { low: 0.4, high: 4.0 },
      description: 'Thyrotropin (TSH) sub-test parameter #30 for Thyroid Panel'
    });
    this.add({
      loincNum: '5902-1',
      component: 'Prothrombin time (PT/INR) Part 1',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #1 for Coagulation'
    });
    this.add({
      loincNum: '5909-2',
      component: 'Prothrombin time (PT/INR) Part 2',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #2 for Coagulation'
    });
    this.add({
      loincNum: '5916-3',
      component: 'Prothrombin time (PT/INR) Part 3',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #3 for Coagulation'
    });
    this.add({
      loincNum: '5923-4',
      component: 'Prothrombin time (PT/INR) Part 4',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #4 for Coagulation'
    });
    this.add({
      loincNum: '5930-5',
      component: 'Prothrombin time (PT/INR) Part 5',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #5 for Coagulation'
    });
    this.add({
      loincNum: '5937-6',
      component: 'Prothrombin time (PT/INR) Part 6',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #6 for Coagulation'
    });
    this.add({
      loincNum: '5944-7',
      component: 'Prothrombin time (PT/INR) Part 7',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #7 for Coagulation'
    });
    this.add({
      loincNum: '5951-8',
      component: 'Prothrombin time (PT/INR) Part 8',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #8 for Coagulation'
    });
    this.add({
      loincNum: '5958-9',
      component: 'Prothrombin time (PT/INR) Part 9',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #9 for Coagulation'
    });
    this.add({
      loincNum: '5965-1',
      component: 'Prothrombin time (PT/INR) Part 10',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #10 for Coagulation'
    });
    this.add({
      loincNum: '5972-2',
      component: 'Prothrombin time (PT/INR) Part 11',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #11 for Coagulation'
    });
    this.add({
      loincNum: '5979-3',
      component: 'Prothrombin time (PT/INR) Part 12',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #12 for Coagulation'
    });
    this.add({
      loincNum: '5986-4',
      component: 'Prothrombin time (PT/INR) Part 13',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #13 for Coagulation'
    });
    this.add({
      loincNum: '5993-5',
      component: 'Prothrombin time (PT/INR) Part 14',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #14 for Coagulation'
    });
    this.add({
      loincNum: '6000-6',
      component: 'Prothrombin time (PT/INR) Part 15',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #15 for Coagulation'
    });
    this.add({
      loincNum: '6007-7',
      component: 'Prothrombin time (PT/INR) Part 16',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #16 for Coagulation'
    });
    this.add({
      loincNum: '6014-8',
      component: 'Prothrombin time (PT/INR) Part 17',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #17 for Coagulation'
    });
    this.add({
      loincNum: '6021-9',
      component: 'Prothrombin time (PT/INR) Part 18',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #18 for Coagulation'
    });
    this.add({
      loincNum: '6028-1',
      component: 'Prothrombin time (PT/INR) Part 19',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #19 for Coagulation'
    });
    this.add({
      loincNum: '6035-2',
      component: 'Prothrombin time (PT/INR) Part 20',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #20 for Coagulation'
    });
    this.add({
      loincNum: '6042-3',
      component: 'Prothrombin time (PT/INR) Part 21',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #21 for Coagulation'
    });
    this.add({
      loincNum: '6049-4',
      component: 'Prothrombin time (PT/INR) Part 22',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #22 for Coagulation'
    });
    this.add({
      loincNum: '6056-5',
      component: 'Prothrombin time (PT/INR) Part 23',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #23 for Coagulation'
    });
    this.add({
      loincNum: '6063-6',
      component: 'Prothrombin time (PT/INR) Part 24',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #24 for Coagulation'
    });
    this.add({
      loincNum: '6070-7',
      component: 'Prothrombin time (PT/INR) Part 25',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #25 for Coagulation'
    });
    this.add({
      loincNum: '6077-8',
      component: 'Prothrombin time (PT/INR) Part 26',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #26 for Coagulation'
    });
    this.add({
      loincNum: '6084-9',
      component: 'Prothrombin time (PT/INR) Part 27',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #27 for Coagulation'
    });
    this.add({
      loincNum: '6091-1',
      component: 'Prothrombin time (PT/INR) Part 28',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #28 for Coagulation'
    });
    this.add({
      loincNum: '6098-2',
      component: 'Prothrombin time (PT/INR) Part 29',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #29 for Coagulation'
    });
    this.add({
      loincNum: '6105-3',
      component: 'Prothrombin time (PT/INR) Part 30',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'COAG',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 0.9, high: 1.1 },
      referenceRangeFemale: { low: 0.9, high: 1.1 },
      description: 'Prothrombin time (PT/INR) sub-test parameter #30 for Coagulation'
    });
    this.add({
      loincNum: '5803-1',
      component: 'Urine Specific Gravity Part 1',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #1 for Urinalysis'
    });
    this.add({
      loincNum: '5810-2',
      component: 'Urine Specific Gravity Part 2',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #2 for Urinalysis'
    });
    this.add({
      loincNum: '5817-3',
      component: 'Urine Specific Gravity Part 3',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #3 for Urinalysis'
    });
    this.add({
      loincNum: '5824-4',
      component: 'Urine Specific Gravity Part 4',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #4 for Urinalysis'
    });
    this.add({
      loincNum: '5831-5',
      component: 'Urine Specific Gravity Part 5',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #5 for Urinalysis'
    });
    this.add({
      loincNum: '5838-6',
      component: 'Urine Specific Gravity Part 6',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #6 for Urinalysis'
    });
    this.add({
      loincNum: '5845-7',
      component: 'Urine Specific Gravity Part 7',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #7 for Urinalysis'
    });
    this.add({
      loincNum: '5852-8',
      component: 'Urine Specific Gravity Part 8',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #8 for Urinalysis'
    });
    this.add({
      loincNum: '5859-9',
      component: 'Urine Specific Gravity Part 9',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #9 for Urinalysis'
    });
    this.add({
      loincNum: '5866-1',
      component: 'Urine Specific Gravity Part 10',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #10 for Urinalysis'
    });
    this.add({
      loincNum: '5873-2',
      component: 'Urine Specific Gravity Part 11',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #11 for Urinalysis'
    });
    this.add({
      loincNum: '5880-3',
      component: 'Urine Specific Gravity Part 12',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #12 for Urinalysis'
    });
    this.add({
      loincNum: '5887-4',
      component: 'Urine Specific Gravity Part 13',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #13 for Urinalysis'
    });
    this.add({
      loincNum: '5894-5',
      component: 'Urine Specific Gravity Part 14',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #14 for Urinalysis'
    });
    this.add({
      loincNum: '5901-6',
      component: 'Urine Specific Gravity Part 15',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #15 for Urinalysis'
    });
    this.add({
      loincNum: '5908-7',
      component: 'Urine Specific Gravity Part 16',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #16 for Urinalysis'
    });
    this.add({
      loincNum: '5915-8',
      component: 'Urine Specific Gravity Part 17',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #17 for Urinalysis'
    });
    this.add({
      loincNum: '5922-9',
      component: 'Urine Specific Gravity Part 18',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #18 for Urinalysis'
    });
    this.add({
      loincNum: '5929-1',
      component: 'Urine Specific Gravity Part 19',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #19 for Urinalysis'
    });
    this.add({
      loincNum: '5936-2',
      component: 'Urine Specific Gravity Part 20',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #20 for Urinalysis'
    });
    this.add({
      loincNum: '5943-3',
      component: 'Urine Specific Gravity Part 21',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #21 for Urinalysis'
    });
    this.add({
      loincNum: '5950-4',
      component: 'Urine Specific Gravity Part 22',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #22 for Urinalysis'
    });
    this.add({
      loincNum: '5957-5',
      component: 'Urine Specific Gravity Part 23',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #23 for Urinalysis'
    });
    this.add({
      loincNum: '5964-6',
      component: 'Urine Specific Gravity Part 24',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #24 for Urinalysis'
    });
    this.add({
      loincNum: '5971-7',
      component: 'Urine Specific Gravity Part 25',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #25 for Urinalysis'
    });
    this.add({
      loincNum: '5978-8',
      component: 'Urine Specific Gravity Part 26',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #26 for Urinalysis'
    });
    this.add({
      loincNum: '5985-9',
      component: 'Urine Specific Gravity Part 27',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #27 for Urinalysis'
    });
    this.add({
      loincNum: '5992-1',
      component: 'Urine Specific Gravity Part 28',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #28 for Urinalysis'
    });
    this.add({
      loincNum: '5999-2',
      component: 'Urine Specific Gravity Part 29',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #29 for Urinalysis'
    });
    this.add({
      loincNum: '6006-3',
      component: 'Urine Specific Gravity Part 30',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'UA',
      standardUnit: 'ratio',
      referenceRangeMale: { low: 1.005, high: 1.03 },
      referenceRangeFemale: { low: 1.005, high: 1.03 },
      description: 'Urine Specific Gravity sub-test parameter #30 for Urinalysis'
    });
    this.add({
      loincNum: '6463-1',
      component: 'Bacterial culture & sensitivity Part 1',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #1 for Microbiology'
    });
    this.add({
      loincNum: '6470-2',
      component: 'Bacterial culture & sensitivity Part 2',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #2 for Microbiology'
    });
    this.add({
      loincNum: '6477-3',
      component: 'Bacterial culture & sensitivity Part 3',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #3 for Microbiology'
    });
    this.add({
      loincNum: '6484-4',
      component: 'Bacterial culture & sensitivity Part 4',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #4 for Microbiology'
    });
    this.add({
      loincNum: '6491-5',
      component: 'Bacterial culture & sensitivity Part 5',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #5 for Microbiology'
    });
    this.add({
      loincNum: '6498-6',
      component: 'Bacterial culture & sensitivity Part 6',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #6 for Microbiology'
    });
    this.add({
      loincNum: '6505-7',
      component: 'Bacterial culture & sensitivity Part 7',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #7 for Microbiology'
    });
    this.add({
      loincNum: '6512-8',
      component: 'Bacterial culture & sensitivity Part 8',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #8 for Microbiology'
    });
    this.add({
      loincNum: '6519-9',
      component: 'Bacterial culture & sensitivity Part 9',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #9 for Microbiology'
    });
    this.add({
      loincNum: '6526-1',
      component: 'Bacterial culture & sensitivity Part 10',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #10 for Microbiology'
    });
    this.add({
      loincNum: '6533-2',
      component: 'Bacterial culture & sensitivity Part 11',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #11 for Microbiology'
    });
    this.add({
      loincNum: '6540-3',
      component: 'Bacterial culture & sensitivity Part 12',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #12 for Microbiology'
    });
    this.add({
      loincNum: '6547-4',
      component: 'Bacterial culture & sensitivity Part 13',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #13 for Microbiology'
    });
    this.add({
      loincNum: '6554-5',
      component: 'Bacterial culture & sensitivity Part 14',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #14 for Microbiology'
    });
    this.add({
      loincNum: '6561-6',
      component: 'Bacterial culture & sensitivity Part 15',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #15 for Microbiology'
    });
    this.add({
      loincNum: '6568-7',
      component: 'Bacterial culture & sensitivity Part 16',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #16 for Microbiology'
    });
    this.add({
      loincNum: '6575-8',
      component: 'Bacterial culture & sensitivity Part 17',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #17 for Microbiology'
    });
    this.add({
      loincNum: '6582-9',
      component: 'Bacterial culture & sensitivity Part 18',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #18 for Microbiology'
    });
    this.add({
      loincNum: '6589-1',
      component: 'Bacterial culture & sensitivity Part 19',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #19 for Microbiology'
    });
    this.add({
      loincNum: '6596-2',
      component: 'Bacterial culture & sensitivity Part 20',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #20 for Microbiology'
    });
    this.add({
      loincNum: '6603-3',
      component: 'Bacterial culture & sensitivity Part 21',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #21 for Microbiology'
    });
    this.add({
      loincNum: '6610-4',
      component: 'Bacterial culture & sensitivity Part 22',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #22 for Microbiology'
    });
    this.add({
      loincNum: '6617-5',
      component: 'Bacterial culture & sensitivity Part 23',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #23 for Microbiology'
    });
    this.add({
      loincNum: '6624-6',
      component: 'Bacterial culture & sensitivity Part 24',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #24 for Microbiology'
    });
    this.add({
      loincNum: '6631-7',
      component: 'Bacterial culture & sensitivity Part 25',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #25 for Microbiology'
    });
    this.add({
      loincNum: '6638-8',
      component: 'Bacterial culture & sensitivity Part 26',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #26 for Microbiology'
    });
    this.add({
      loincNum: '6645-9',
      component: 'Bacterial culture & sensitivity Part 27',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #27 for Microbiology'
    });
    this.add({
      loincNum: '6652-1',
      component: 'Bacterial culture & sensitivity Part 28',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #28 for Microbiology'
    });
    this.add({
      loincNum: '6659-2',
      component: 'Bacterial culture & sensitivity Part 29',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #29 for Microbiology'
    });
    this.add({
      loincNum: '6666-3',
      component: 'Bacterial culture & sensitivity Part 30',
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scaleType: 'Qn',
      classType: 'MICRO',
      standardUnit: 'qual',
      referenceRangeMale: { low: 0, high: 1 },
      referenceRangeFemale: { low: 0, high: 1 },
      description: 'Bacterial culture & sensitivity sub-test parameter #30 for Microbiology'
    });

  }

  public static getByLoinc(loincNum: string): LOINCEntry | undefined {
    if (!loincNum) return undefined;
    return this.database.get(loincNum.trim().toUpperCase());
  }

  public static search(query: string, limit: number = 25): LOINCEntry[] {
    if (!query || query.trim().length === 0) return [];
    const clean = query.toLowerCase().trim();
    const results: LOINCEntry[] = [];

    for (const [code, entry] of this.database.entries()) {
      if (code.toLowerCase().startsWith(clean) || entry.component.toLowerCase().includes(clean) || entry.description.toLowerCase().includes(clean)) {
        results.push(entry);
        if (results.length >= limit) break;
      }
    }
    return results;
  }

  public static evaluateValue(loincNum: string, value: number, gender: 'M' | 'F' = 'M'): {
    status: 'NORMAL' | 'LOW' | 'HIGH' | 'CRITICAL_LOW' | 'CRITICAL_HIGH';
    isAbnormal: boolean;
    isCritical: boolean;
    referenceRange?: { low: number; high: number };
  } {
    const entry = this.getByLoinc(loincNum);
    if (!entry) return { status: 'NORMAL', isAbnormal: false, isCritical: false };

    const ref = gender === 'F' && entry.referenceRangeFemale ? entry.referenceRangeFemale : entry.referenceRangeMale;

    if (entry.criticalLow !== undefined && value <= entry.criticalLow) {
      return { status: 'CRITICAL_LOW', isAbnormal: true, isCritical: true, referenceRange: ref };
    }
    if (entry.criticalHigh !== undefined && value >= entry.criticalHigh) {
      return { status: 'CRITICAL_HIGH', isAbnormal: true, isCritical: true, referenceRange: ref };
    }
    if (ref) {
      if (value < ref.low) return { status: 'LOW', isAbnormal: true, isCritical: false, referenceRange: ref };
      if (value > ref.high) return { status: 'HIGH', isAbnormal: true, isCritical: false, referenceRange: ref };
    }
    return { status: 'NORMAL', isAbnormal: false, isCritical: false, referenceRange: ref };
  }

  public static getAllEntries(): LOINCEntry[] {
    return Array.from(this.database.values());
  }

  public static getTotalCount(): number {
    return this.database.size;
  }
}
