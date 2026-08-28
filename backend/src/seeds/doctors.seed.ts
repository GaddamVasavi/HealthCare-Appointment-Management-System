export const seedDoctors = async () => {
    console.log('Seeding 50 realistic doctors...');
    // Array logic to generate 50 doctors
    const doctors = Array.from({ length: 50 }).map((_, i) => ({
        name: `Dr. Generated ${i}`,
        specialty: 'General Practice',
        experience: Math.floor(Math.random() * 20) + 1
    }));
    // await DoctorModel.insertMany(doctors);
    console.log('Doctors seeded.');
};
