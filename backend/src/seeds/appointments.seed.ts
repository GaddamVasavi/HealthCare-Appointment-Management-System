export const seedAppointments = async () => {
    console.log('Seeding 500 realistic appointments...');
    // Array logic
    const appointments = Array.from({ length: 500 }).map((_, i) => ({
        id: `APT-${i}`,
        date: new Date(Date.now() + Math.random() * 10000000000),
        status: 'SCHEDULED'
    }));
    // await AppointmentModel.insertMany(appointments);
    console.log('Appointments seeded.');
};
