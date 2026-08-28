export interface IMedicalTerm {
  term: string;
  definition: string;
  abbreviation: string;
  category: string;
  relatedTerms: string[];
  etymology: string;
}

export const medicalTerminologyCatalog: IMedicalTerm[] = [
  {
    term: 'Hypertension',
    definition: 'Abnormally high blood pressure, typically defined as having a blood pressure reading consistently above 130/80 mmHg.',
    abbreviation: 'HTN',
    category: 'Cardiovascular',
    relatedTerms: ['Blood Pressure', 'Systolic', 'Diastolic', 'Cardiology'],
    etymology: 'hyper- (over) + tension'
  },
  {
    term: 'Tachycardia',
    definition: 'A rapid heart rate, usually defined as a resting heart rate over 100 beats per minute in adults.',
    abbreviation: 'Tachy',
    category: 'Cardiovascular',
    relatedTerms: ['Arrhythmia', 'Heart Rate', 'Palpitations'],
    etymology: 'tachy- (swift) + -cardia (heart)'
  },
  {
    term: 'Bradycardia',
    definition: 'A slower than normal heart rate, typically defined as a resting heart rate under 60 beats per minute in adults.',
    abbreviation: 'Brady',
    category: 'Cardiovascular',
    relatedTerms: ['Heart Rate', 'Arrhythmia'],
    etymology: 'brady- (slow) + -cardia (heart)'
  },
  {
    term: 'Myocardial Infarction',
    definition: 'A heart attack; occurs when blood flow decreases or stops to a part of the heart, causing damage to the heart muscle.',
    abbreviation: 'MI',
    category: 'Cardiovascular',
    relatedTerms: ['Heart Attack', 'Ischemia', 'Coronary Artery Disease'],
    etymology: 'myo- (muscle) + -cardial (heart) + infarction (tissue death due to inadequate blood supply)'
  },
  {
    term: 'Hypoglycemia',
    definition: 'A condition characterized by an abnormally low level of blood sugar (glucose), your body\'s main energy source.',
    abbreviation: 'Hypo',
    category: 'Endocrinology',
    relatedTerms: ['Diabetes', 'Glucose', 'Insulin'],
    etymology: 'hypo- (under) + glyc- (sweet) + -emia (blood condition)'
  },
  {
    term: 'Hyperglycemia',
    definition: 'An excess of glucose in the bloodstream, often associated with diabetes mellitus.',
    abbreviation: 'Hyper',
    category: 'Endocrinology',
    relatedTerms: ['Diabetes', 'Glucose', 'Insulin Resistance'],
    etymology: 'hyper- (over) + glyc- (sweet) + -emia (blood condition)'
  },
  {
    term: 'Anemia',
    definition: 'A condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body\'s tissues.',
    abbreviation: '-',
    category: 'Hematology',
    relatedTerms: ['Hemoglobin', 'Iron Deficiency', 'Red Blood Cells'],
    etymology: 'an- (without) + -emia (blood condition)'
  },
  {
    term: 'Apnea',
    definition: 'The temporary cessation of breathing, especially during sleep.',
    abbreviation: 'OSA',
    category: 'Pulmonology',
    relatedTerms: ['Sleep Apnea', 'Respiration', 'Hypoxia'],
    etymology: 'a- (without) + -pnea (breathing)'
  },
  {
    term: 'Dyspnea',
    definition: 'Difficult or labored breathing; shortness of breath.',
    abbreviation: 'SOB',
    category: 'Pulmonology',
    relatedTerms: ['Asthma', 'COPD', 'Respiration'],
    etymology: 'dys- (bad/difficult) + -pnea (breathing)'
  },
  {
    term: 'Edema',
    definition: 'Swelling caused by excess fluid trapped in your body\'s tissues.',
    abbreviation: '-',
    category: 'General',
    relatedTerms: ['Swelling', 'Fluid Retention', 'Lymphedema'],
    etymology: 'Greek oidēma (swelling)'
  }
];
