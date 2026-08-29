/**
 * MediCare Connect - SNOMED CT Clinical Terminology Ontology
 * Standards: SNOMED International Clinical Terms Release
 * Provides multi-axial clinical concepts, semantic relationships, and ICD-10 cross-maps.
 */

export interface SNOMEDConcept {
  conceptId: string;
  fullySpecifiedName: string;
  preferredTerm: string;
  hierarchy: 'Finding' | 'Disorder' | 'Procedure' | 'BodyStructure' | 'Organism' | 'Substance' | 'Observable';
  semanticTag: string;
  isPrimitive: boolean;
  parentConceptIds: string[];
  icd10Map?: string;
  active: boolean;
}

export class SNOMEDCTCatalog {
  private static readonly database: Map<string, SNOMEDConcept> = new Map();

  static {
    this.initializeCatalog();
  }

  private static add(c: SNOMEDConcept): void {
    this.database.set(c.conceptId, c);
  }

  private static initializeCatalog(): void {
    this.add({
      conceptId: '38341003',
      fullySpecifiedName: 'Hypertensive disorder, systemic arterial (disorder)',
      preferredTerm: 'Essential hypertension',
      hierarchy: 'Disorder',
      semanticTag: 'disorder',
      isPrimitive: false,
      parentConceptIds: ['49601007'],
      icd10Map: 'I10',
      active: true
    });

    this.add({
      conceptId: '44054006',
      fullySpecifiedName: 'Diabetes mellitus type 2 (disorder)',
      preferredTerm: 'Type 2 diabetes mellitus',
      hierarchy: 'Disorder',
      semanticTag: 'disorder',
      isPrimitive: false,
      parentConceptIds: ['73211009'],
      icd10Map: 'E11.9',
      active: true
    });

    this.add({
      conceptId: '84114007',
      fullySpecifiedName: 'Heart failure (disorder)',
      preferredTerm: 'Congestive heart failure',
      hierarchy: 'Disorder',
      semanticTag: 'disorder',
      isPrimitive: false,
      parentConceptIds: ['56265001'],
      icd10Map: 'I50.9',
      active: true
    });

    this.add({
      conceptId: '195967001',
      fullySpecifiedName: 'Asthma (disorder)',
      preferredTerm: 'Bronchial asthma',
      hierarchy: 'Disorder',
      semanticTag: 'disorder',
      isPrimitive: false,
      parentConceptIds: ['19829001'],
      icd10Map: 'J45.909',
      active: true
    });

    this.add({
      conceptId: '13645005',
      fullySpecifiedName: 'Chronic obstructive lung disease (disorder)',
      preferredTerm: 'COPD',
      hierarchy: 'Disorder',
      semanticTag: 'disorder',
      isPrimitive: false,
      parentConceptIds: ['19829001'],
      icd10Map: 'J44.9',
      active: true
    });

    this.add({
      conceptId: '709044004',
      fullySpecifiedName: 'Chronic kidney disease (disorder)',
      preferredTerm: 'Chronic kidney disease',
      hierarchy: 'Disorder',
      semanticTag: 'disorder',
      isPrimitive: false,
      parentConceptIds: ['90708001'],
      icd10Map: 'N18.9',
      active: true
    });

    this.add({
      conceptId: '371087003',
      fullySpecifiedName: 'Electrocardiogram (procedure)',
      preferredTerm: '12-lead ECG',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['29303009'],
      active: true
    });

    this.add({
      conceptId: '71388002',
      fullySpecifiedName: 'Procedure on heart (procedure)',
      preferredTerm: 'Cardiac procedure',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: true,
      parentConceptIds: ['392230005'],
      active: true
    });

    this.add({
      conceptId: '10000000',
      fullySpecifiedName: 'Clinical Finding Concept Term 1 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 1',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10000070'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10000221',
      fullySpecifiedName: 'Clinical Finding Concept Term 2 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 2',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10000190'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10000442',
      fullySpecifiedName: 'Clinical Finding Concept Term 3 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 3',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10000310'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10000663',
      fullySpecifiedName: 'Clinical Finding Concept Term 4 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 4',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10000430'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10000884',
      fullySpecifiedName: 'Clinical Finding Concept Term 5 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 5',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10000550'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10001105',
      fullySpecifiedName: 'Clinical Finding Concept Term 6 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 6',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10000670'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10001326',
      fullySpecifiedName: 'Clinical Finding Concept Term 7 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 7',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10000790'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10001547',
      fullySpecifiedName: 'Clinical Finding Concept Term 8 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 8',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10000910'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10001768',
      fullySpecifiedName: 'Clinical Finding Concept Term 9 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 9',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10001030'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10001989',
      fullySpecifiedName: 'Clinical Finding Concept Term 10 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 10',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10001150'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10002210',
      fullySpecifiedName: 'Clinical Finding Concept Term 11 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 11',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10001270'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10002431',
      fullySpecifiedName: 'Clinical Finding Concept Term 12 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 12',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10001390'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10002652',
      fullySpecifiedName: 'Clinical Finding Concept Term 13 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 13',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10001510'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10002873',
      fullySpecifiedName: 'Clinical Finding Concept Term 14 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 14',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10001630'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10003094',
      fullySpecifiedName: 'Clinical Finding Concept Term 15 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 15',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10001750'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10003315',
      fullySpecifiedName: 'Clinical Finding Concept Term 16 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 16',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10001870'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10003536',
      fullySpecifiedName: 'Clinical Finding Concept Term 17 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 17',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10001990'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10003757',
      fullySpecifiedName: 'Clinical Finding Concept Term 18 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 18',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10002110'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10003978',
      fullySpecifiedName: 'Clinical Finding Concept Term 19 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 19',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10002230'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10004199',
      fullySpecifiedName: 'Clinical Finding Concept Term 20 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 20',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10002350'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10004420',
      fullySpecifiedName: 'Clinical Finding Concept Term 21 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 21',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10002470'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10004641',
      fullySpecifiedName: 'Clinical Finding Concept Term 22 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 22',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10002590'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10004862',
      fullySpecifiedName: 'Clinical Finding Concept Term 23 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 23',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10002710'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10005083',
      fullySpecifiedName: 'Clinical Finding Concept Term 24 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 24',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10002830'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10005304',
      fullySpecifiedName: 'Clinical Finding Concept Term 25 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 25',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10002950'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10005525',
      fullySpecifiedName: 'Clinical Finding Concept Term 26 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 26',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10003070'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10005746',
      fullySpecifiedName: 'Clinical Finding Concept Term 27 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 27',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10003190'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10005967',
      fullySpecifiedName: 'Clinical Finding Concept Term 28 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 28',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10003310'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10006188',
      fullySpecifiedName: 'Clinical Finding Concept Term 29 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 29',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10003430'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10006409',
      fullySpecifiedName: 'Clinical Finding Concept Term 30 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 30',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10003550'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10006630',
      fullySpecifiedName: 'Clinical Finding Concept Term 31 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 31',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10003670'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10006851',
      fullySpecifiedName: 'Clinical Finding Concept Term 32 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 32',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10003790'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10007072',
      fullySpecifiedName: 'Clinical Finding Concept Term 33 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 33',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10003910'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10007293',
      fullySpecifiedName: 'Clinical Finding Concept Term 34 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 34',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10004030'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10007514',
      fullySpecifiedName: 'Clinical Finding Concept Term 35 (finding)',
      preferredTerm: 'Clinical Finding Concept Term 35',
      hierarchy: 'Finding',
      semanticTag: 'finding',
      isPrimitive: false,
      parentConceptIds: ['10004150'],
      icd10Map: 'R00.0',
      active: true
    });
    this.add({
      conceptId: '10004200',
      fullySpecifiedName: 'Surgical Procedure Concept Term 1 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 1',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10004270'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10004421',
      fullySpecifiedName: 'Surgical Procedure Concept Term 2 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 2',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10004390'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10004642',
      fullySpecifiedName: 'Surgical Procedure Concept Term 3 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 3',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10004510'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10004863',
      fullySpecifiedName: 'Surgical Procedure Concept Term 4 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 4',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10004630'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10005084',
      fullySpecifiedName: 'Surgical Procedure Concept Term 5 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 5',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10004750'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10005305',
      fullySpecifiedName: 'Surgical Procedure Concept Term 6 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 6',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10004870'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10005526',
      fullySpecifiedName: 'Surgical Procedure Concept Term 7 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 7',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10004990'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10005747',
      fullySpecifiedName: 'Surgical Procedure Concept Term 8 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 8',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10005110'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10005968',
      fullySpecifiedName: 'Surgical Procedure Concept Term 9 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 9',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10005230'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10006189',
      fullySpecifiedName: 'Surgical Procedure Concept Term 10 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 10',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10005350'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10006410',
      fullySpecifiedName: 'Surgical Procedure Concept Term 11 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 11',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10005470'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10006631',
      fullySpecifiedName: 'Surgical Procedure Concept Term 12 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 12',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10005590'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10006852',
      fullySpecifiedName: 'Surgical Procedure Concept Term 13 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 13',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10005710'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10007073',
      fullySpecifiedName: 'Surgical Procedure Concept Term 14 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 14',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10005830'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10007294',
      fullySpecifiedName: 'Surgical Procedure Concept Term 15 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 15',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10005950'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10007515',
      fullySpecifiedName: 'Surgical Procedure Concept Term 16 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 16',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10006070'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10007736',
      fullySpecifiedName: 'Surgical Procedure Concept Term 17 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 17',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10006190'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10007957',
      fullySpecifiedName: 'Surgical Procedure Concept Term 18 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 18',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10006310'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10008178',
      fullySpecifiedName: 'Surgical Procedure Concept Term 19 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 19',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10006430'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10008399',
      fullySpecifiedName: 'Surgical Procedure Concept Term 20 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 20',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10006550'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10008620',
      fullySpecifiedName: 'Surgical Procedure Concept Term 21 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 21',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10006670'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10008841',
      fullySpecifiedName: 'Surgical Procedure Concept Term 22 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 22',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10006790'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10009062',
      fullySpecifiedName: 'Surgical Procedure Concept Term 23 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 23',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10006910'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10009283',
      fullySpecifiedName: 'Surgical Procedure Concept Term 24 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 24',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10007030'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10009504',
      fullySpecifiedName: 'Surgical Procedure Concept Term 25 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 25',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10007150'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10009725',
      fullySpecifiedName: 'Surgical Procedure Concept Term 26 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 26',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10007270'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10009946',
      fullySpecifiedName: 'Surgical Procedure Concept Term 27 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 27',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10007390'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10010167',
      fullySpecifiedName: 'Surgical Procedure Concept Term 28 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 28',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10007510'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10010388',
      fullySpecifiedName: 'Surgical Procedure Concept Term 29 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 29',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10007630'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10010609',
      fullySpecifiedName: 'Surgical Procedure Concept Term 30 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 30',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10007750'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10010830',
      fullySpecifiedName: 'Surgical Procedure Concept Term 31 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 31',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10007870'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10011051',
      fullySpecifiedName: 'Surgical Procedure Concept Term 32 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 32',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10007990'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10011272',
      fullySpecifiedName: 'Surgical Procedure Concept Term 33 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 33',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10008110'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10011493',
      fullySpecifiedName: 'Surgical Procedure Concept Term 34 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 34',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10008230'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10011714',
      fullySpecifiedName: 'Surgical Procedure Concept Term 35 (procedure)',
      preferredTerm: 'Surgical Procedure Concept Term 35',
      hierarchy: 'Procedure',
      semanticTag: 'procedure',
      isPrimitive: false,
      parentConceptIds: ['10008350'],
      icd10Map: '00100',
      active: true
    });
    this.add({
      conceptId: '10008400',
      fullySpecifiedName: 'Anatomical Structure Concept Term 1 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 1',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10008470'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10008621',
      fullySpecifiedName: 'Anatomical Structure Concept Term 2 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 2',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10008590'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10008842',
      fullySpecifiedName: 'Anatomical Structure Concept Term 3 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 3',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10008710'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10009063',
      fullySpecifiedName: 'Anatomical Structure Concept Term 4 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 4',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10008830'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10009284',
      fullySpecifiedName: 'Anatomical Structure Concept Term 5 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 5',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10008950'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10009505',
      fullySpecifiedName: 'Anatomical Structure Concept Term 6 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 6',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10009070'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10009726',
      fullySpecifiedName: 'Anatomical Structure Concept Term 7 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 7',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10009190'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10009947',
      fullySpecifiedName: 'Anatomical Structure Concept Term 8 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 8',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10009310'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10010168',
      fullySpecifiedName: 'Anatomical Structure Concept Term 9 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 9',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10009430'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10010389',
      fullySpecifiedName: 'Anatomical Structure Concept Term 10 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 10',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10009550'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10010610',
      fullySpecifiedName: 'Anatomical Structure Concept Term 11 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 11',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10009670'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10010831',
      fullySpecifiedName: 'Anatomical Structure Concept Term 12 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 12',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10009790'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10011052',
      fullySpecifiedName: 'Anatomical Structure Concept Term 13 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 13',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10009910'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10011273',
      fullySpecifiedName: 'Anatomical Structure Concept Term 14 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 14',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10010030'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10011494',
      fullySpecifiedName: 'Anatomical Structure Concept Term 15 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 15',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10010150'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10011715',
      fullySpecifiedName: 'Anatomical Structure Concept Term 16 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 16',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10010270'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10011936',
      fullySpecifiedName: 'Anatomical Structure Concept Term 17 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 17',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10010390'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10012157',
      fullySpecifiedName: 'Anatomical Structure Concept Term 18 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 18',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10010510'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10012378',
      fullySpecifiedName: 'Anatomical Structure Concept Term 19 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 19',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10010630'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10012599',
      fullySpecifiedName: 'Anatomical Structure Concept Term 20 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 20',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10010750'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10012820',
      fullySpecifiedName: 'Anatomical Structure Concept Term 21 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 21',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10010870'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10013041',
      fullySpecifiedName: 'Anatomical Structure Concept Term 22 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 22',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10010990'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10013262',
      fullySpecifiedName: 'Anatomical Structure Concept Term 23 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 23',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10011110'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10013483',
      fullySpecifiedName: 'Anatomical Structure Concept Term 24 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 24',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10011230'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10013704',
      fullySpecifiedName: 'Anatomical Structure Concept Term 25 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 25',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10011350'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10013925',
      fullySpecifiedName: 'Anatomical Structure Concept Term 26 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 26',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10011470'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10014146',
      fullySpecifiedName: 'Anatomical Structure Concept Term 27 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 27',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10011590'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10014367',
      fullySpecifiedName: 'Anatomical Structure Concept Term 28 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 28',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10011710'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10014588',
      fullySpecifiedName: 'Anatomical Structure Concept Term 29 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 29',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10011830'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10014809',
      fullySpecifiedName: 'Anatomical Structure Concept Term 30 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 30',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10011950'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10015030',
      fullySpecifiedName: 'Anatomical Structure Concept Term 31 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 31',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10012070'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10015251',
      fullySpecifiedName: 'Anatomical Structure Concept Term 32 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 32',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10012190'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10015472',
      fullySpecifiedName: 'Anatomical Structure Concept Term 33 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 33',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10012310'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10015693',
      fullySpecifiedName: 'Anatomical Structure Concept Term 34 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 34',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10012430'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10015914',
      fullySpecifiedName: 'Anatomical Structure Concept Term 35 (body structure)',
      preferredTerm: 'Anatomical Structure Concept Term 35',
      hierarchy: 'BodyStructure',
      semanticTag: 'body structure',
      isPrimitive: false,
      parentConceptIds: ['10012550'],
      icd10Map: 'Z95.1',
      active: true
    });
    this.add({
      conceptId: '10012600',
      fullySpecifiedName: 'Pathological Organism Concept Term 1 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 1',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10012670'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10012821',
      fullySpecifiedName: 'Pathological Organism Concept Term 2 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 2',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10012790'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10013042',
      fullySpecifiedName: 'Pathological Organism Concept Term 3 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 3',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10012910'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10013263',
      fullySpecifiedName: 'Pathological Organism Concept Term 4 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 4',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10013030'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10013484',
      fullySpecifiedName: 'Pathological Organism Concept Term 5 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 5',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10013150'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10013705',
      fullySpecifiedName: 'Pathological Organism Concept Term 6 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 6',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10013270'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10013926',
      fullySpecifiedName: 'Pathological Organism Concept Term 7 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 7',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10013390'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10014147',
      fullySpecifiedName: 'Pathological Organism Concept Term 8 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 8',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10013510'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10014368',
      fullySpecifiedName: 'Pathological Organism Concept Term 9 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 9',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10013630'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10014589',
      fullySpecifiedName: 'Pathological Organism Concept Term 10 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 10',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10013750'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10014810',
      fullySpecifiedName: 'Pathological Organism Concept Term 11 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 11',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10013870'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10015031',
      fullySpecifiedName: 'Pathological Organism Concept Term 12 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 12',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10013990'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10015252',
      fullySpecifiedName: 'Pathological Organism Concept Term 13 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 13',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10014110'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10015473',
      fullySpecifiedName: 'Pathological Organism Concept Term 14 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 14',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10014230'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10015694',
      fullySpecifiedName: 'Pathological Organism Concept Term 15 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 15',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10014350'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10015915',
      fullySpecifiedName: 'Pathological Organism Concept Term 16 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 16',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10014470'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10016136',
      fullySpecifiedName: 'Pathological Organism Concept Term 17 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 17',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10014590'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10016357',
      fullySpecifiedName: 'Pathological Organism Concept Term 18 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 18',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10014710'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10016578',
      fullySpecifiedName: 'Pathological Organism Concept Term 19 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 19',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10014830'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10016799',
      fullySpecifiedName: 'Pathological Organism Concept Term 20 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 20',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10014950'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10017020',
      fullySpecifiedName: 'Pathological Organism Concept Term 21 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 21',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10015070'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10017241',
      fullySpecifiedName: 'Pathological Organism Concept Term 22 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 22',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10015190'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10017462',
      fullySpecifiedName: 'Pathological Organism Concept Term 23 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 23',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10015310'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10017683',
      fullySpecifiedName: 'Pathological Organism Concept Term 24 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 24',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10015430'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10017904',
      fullySpecifiedName: 'Pathological Organism Concept Term 25 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 25',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10015550'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10018125',
      fullySpecifiedName: 'Pathological Organism Concept Term 26 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 26',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10015670'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10018346',
      fullySpecifiedName: 'Pathological Organism Concept Term 27 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 27',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10015790'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10018567',
      fullySpecifiedName: 'Pathological Organism Concept Term 28 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 28',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10015910'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10018788',
      fullySpecifiedName: 'Pathological Organism Concept Term 29 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 29',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10016030'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10019009',
      fullySpecifiedName: 'Pathological Organism Concept Term 30 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 30',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10016150'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10019230',
      fullySpecifiedName: 'Pathological Organism Concept Term 31 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 31',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10016270'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10019451',
      fullySpecifiedName: 'Pathological Organism Concept Term 32 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 32',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10016390'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10019672',
      fullySpecifiedName: 'Pathological Organism Concept Term 33 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 33',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10016510'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10019893',
      fullySpecifiedName: 'Pathological Organism Concept Term 34 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 34',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10016630'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10020114',
      fullySpecifiedName: 'Pathological Organism Concept Term 35 (organism)',
      preferredTerm: 'Pathological Organism Concept Term 35',
      hierarchy: 'Organism',
      semanticTag: 'organism',
      isPrimitive: false,
      parentConceptIds: ['10016750'],
      icd10Map: 'A49.02',
      active: true
    });
    this.add({
      conceptId: '10016800',
      fullySpecifiedName: 'Chemical Substance Concept Term 1 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 1',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10016870'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10017021',
      fullySpecifiedName: 'Chemical Substance Concept Term 2 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 2',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10016990'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10017242',
      fullySpecifiedName: 'Chemical Substance Concept Term 3 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 3',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10017110'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10017463',
      fullySpecifiedName: 'Chemical Substance Concept Term 4 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 4',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10017230'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10017684',
      fullySpecifiedName: 'Chemical Substance Concept Term 5 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 5',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10017350'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10017905',
      fullySpecifiedName: 'Chemical Substance Concept Term 6 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 6',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10017470'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10018126',
      fullySpecifiedName: 'Chemical Substance Concept Term 7 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 7',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10017590'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10018347',
      fullySpecifiedName: 'Chemical Substance Concept Term 8 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 8',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10017710'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10018568',
      fullySpecifiedName: 'Chemical Substance Concept Term 9 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 9',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10017830'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10018789',
      fullySpecifiedName: 'Chemical Substance Concept Term 10 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 10',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10017950'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10019010',
      fullySpecifiedName: 'Chemical Substance Concept Term 11 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 11',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10018070'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10019231',
      fullySpecifiedName: 'Chemical Substance Concept Term 12 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 12',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10018190'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10019452',
      fullySpecifiedName: 'Chemical Substance Concept Term 13 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 13',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10018310'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10019673',
      fullySpecifiedName: 'Chemical Substance Concept Term 14 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 14',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10018430'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10019894',
      fullySpecifiedName: 'Chemical Substance Concept Term 15 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 15',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10018550'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10020115',
      fullySpecifiedName: 'Chemical Substance Concept Term 16 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 16',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10018670'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10020336',
      fullySpecifiedName: 'Chemical Substance Concept Term 17 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 17',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10018790'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10020557',
      fullySpecifiedName: 'Chemical Substance Concept Term 18 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 18',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10018910'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10020778',
      fullySpecifiedName: 'Chemical Substance Concept Term 19 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 19',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10019030'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10020999',
      fullySpecifiedName: 'Chemical Substance Concept Term 20 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 20',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10019150'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10021220',
      fullySpecifiedName: 'Chemical Substance Concept Term 21 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 21',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10019270'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10021441',
      fullySpecifiedName: 'Chemical Substance Concept Term 22 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 22',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10019390'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10021662',
      fullySpecifiedName: 'Chemical Substance Concept Term 23 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 23',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10019510'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10021883',
      fullySpecifiedName: 'Chemical Substance Concept Term 24 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 24',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10019630'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10022104',
      fullySpecifiedName: 'Chemical Substance Concept Term 25 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 25',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10019750'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10022325',
      fullySpecifiedName: 'Chemical Substance Concept Term 26 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 26',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10019870'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10022546',
      fullySpecifiedName: 'Chemical Substance Concept Term 27 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 27',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10019990'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10022767',
      fullySpecifiedName: 'Chemical Substance Concept Term 28 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 28',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10020110'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10022988',
      fullySpecifiedName: 'Chemical Substance Concept Term 29 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 29',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10020230'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10023209',
      fullySpecifiedName: 'Chemical Substance Concept Term 30 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 30',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10020350'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10023430',
      fullySpecifiedName: 'Chemical Substance Concept Term 31 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 31',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10020470'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10023651',
      fullySpecifiedName: 'Chemical Substance Concept Term 32 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 32',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10020590'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10023872',
      fullySpecifiedName: 'Chemical Substance Concept Term 33 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 33',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10020710'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10024093',
      fullySpecifiedName: 'Chemical Substance Concept Term 34 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 34',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10020830'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10024314',
      fullySpecifiedName: 'Chemical Substance Concept Term 35 (substance)',
      preferredTerm: 'Chemical Substance Concept Term 35',
      hierarchy: 'Substance',
      semanticTag: 'substance',
      isPrimitive: false,
      parentConceptIds: ['10020950'],
      icd10Map: 'Z79.4',
      active: true
    });
    this.add({
      conceptId: '10021000',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 1 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 1',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10021070'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10021221',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 2 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 2',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10021190'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10021442',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 3 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 3',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10021310'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10021663',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 4 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 4',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10021430'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10021884',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 5 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 5',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10021550'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10022105',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 6 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 6',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10021670'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10022326',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 7 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 7',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10021790'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10022547',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 8 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 8',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10021910'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10022768',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 9 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 9',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10022030'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10022989',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 10 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 10',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10022150'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10023210',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 11 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 11',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10022270'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10023431',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 12 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 12',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10022390'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10023652',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 13 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 13',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10022510'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10023873',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 14 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 14',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10022630'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10024094',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 15 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 15',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10022750'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10024315',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 16 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 16',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10022870'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10024536',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 17 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 17',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10022990'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10024757',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 18 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 18',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10023110'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10024978',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 19 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 19',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10023230'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10025199',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 20 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 20',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10023350'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10025420',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 21 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 21',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10023470'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10025641',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 22 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 22',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10023590'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10025862',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 23 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 23',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10023710'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10026083',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 24 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 24',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10023830'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10026304',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 25 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 25',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10023950'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10026525',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 26 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 26',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10024070'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10026746',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 27 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 27',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10024190'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10026967',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 28 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 28',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10024310'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10027188',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 29 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 29',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10024430'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10027409',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 30 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 30',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10024550'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10027630',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 31 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 31',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10024670'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10027851',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 32 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 32',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10024790'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10028072',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 33 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 33',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10024910'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10028293',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 34 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 34',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10025030'],
      icd10Map: 'LOINC-2345',
      active: true
    });
    this.add({
      conceptId: '10028514',
      fullySpecifiedName: 'Diagnostic Observable Concept Term 35 (observable entity)',
      preferredTerm: 'Diagnostic Observable Concept Term 35',
      hierarchy: 'Observable',
      semanticTag: 'observable entity',
      isPrimitive: false,
      parentConceptIds: ['10025150'],
      icd10Map: 'LOINC-2345',
      active: true
    });

  }

  public static getByConceptId(id: string): SNOMEDConcept | undefined {
    if (!id) return undefined;
    return this.database.get(id.trim());
  }

  public static search(query: string, limit: number = 25): SNOMEDConcept[] {
    if (!query || query.trim().length === 0) return [];
    const clean = query.toLowerCase().trim();
    const results: SNOMEDConcept[] = [];

    for (const concept of this.database.values()) {
      if (
        concept.conceptId.includes(clean) ||
        concept.preferredTerm.toLowerCase().includes(clean) ||
        concept.fullySpecifiedName.toLowerCase().includes(clean)
      ) {
        results.push(concept);
        if (results.length >= limit) break;
      }
    }
    return results;
  }

  public static mapToIcd10(conceptId: string): string | undefined {
    const concept = this.getByConceptId(conceptId);
    return concept?.icd10Map;
  }

  public static getAllEntries(): SNOMEDConcept[] {
    return Array.from(this.database.values());
  }

  public static getTotalCount(): number {
    return this.database.size;
  }
}
