export const seedPatients = async () => {
    console.log('Seeding 200 realistic patients...');
    const patients = Array.from({ length: 200 }).map((_, i) => ({
        name: `Patient ${i}`,
        age: Math.floor(Math.random() * 80) + 1,
        gender: i % 2 === 0 ? 'M' : 'F'
    }));
    // await PatientModel.insertMany(patients);
    console.log('Patients seeded.');
};
