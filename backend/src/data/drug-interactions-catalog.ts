export interface IDrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'contraindicated' | 'major' | 'moderate' | 'minor';
  description: string;
  clinicalEffect: string;
  management: string;
  mechanism: string;
}

export const drugInteractionsCatalog: IDrugInteraction[] = [
  {
    drug1: 'Sildenafil',
    drug2: 'Nitroglycerin',
    severity: 'contraindicated',
    description: 'Concurrent use of PDE5 inhibitors and nitrates is contraindicated due to risk of severe hypotension.',
    clinicalEffect: 'Severe and potentially fatal hypotension.',
    management: 'Do not use together. Allow at least 24 hours (for sildenafil) or 48 hours (for tadalafil) between last dose of PDE5 inhibitor and nitrate use.',
    mechanism: 'Both drugs increase cGMP levels, leading to synergistic vasodilation and profound blood pressure drop.'
  },
  {
    drug1: 'Warfarin',
    drug2: 'Amiodarone',
    severity: 'major',
    description: 'Amiodarone increases warfarin levels and INR.',
    clinicalEffect: 'Increased risk of significant bleeding.',
    management: 'Reduce warfarin dose by 30-50% when initiating amiodarone. Monitor INR closely.',
    mechanism: 'Amiodarone inhibits CYP2C9 and CYP3A4, the main enzymes responsible for warfarin metabolism.'
  },
  {
    drug1: 'Simvastatin',
    drug2: 'Clarithromycin',
    severity: 'contraindicated',
    description: 'Clarithromycin significantly increases simvastatin exposure.',
    clinicalEffect: 'Increased risk of myopathy and rhabdomyolysis.',
    management: 'Suspend simvastatin while patient is on clarithromycin, or use an alternative statin like rosuvastatin.',
    mechanism: 'Clarithromycin is a strong CYP3A4 inhibitor, which is the primary metabolic pathway for simvastatin.'
  },
  {
    drug1: 'Lisinopril',
    drug2: 'Spironolactone',
    severity: 'major',
    description: 'Concurrent use may increase the risk of hyperkalemia.',
    clinicalEffect: 'Hyperkalemia, which can lead to life-threatening cardiac arrhythmias.',
    management: 'Monitor serum potassium and renal function closely, especially in the elderly or those with renal impairment.',
    mechanism: 'Both drugs decrease aldosterone secretion, reducing renal potassium excretion.'
  },
  {
    drug1: 'Ibuprofen',
    drug2: 'Aspirin',
    severity: 'moderate',
    description: 'Ibuprofen may interfere with the antiplatelet effect of low-dose aspirin.',
    clinicalEffect: 'Reduced cardioprotective effect of aspirin.',
    management: 'Take immediate-release aspirin at least 30 minutes before or 8 hours after ibuprofen. Consider using acetaminophen instead.',
    mechanism: 'Ibuprofen competitively binds to the COX-1 enzyme binding site, preventing aspirin from permanently inhibiting platelet aggregation.'
  }
];
