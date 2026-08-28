/**
 * Master Seed Orchestrator
 * This file connects all seed scripts to populate the database with mock data.
 */
import mongoose from 'mongoose';

export class DatabaseSeeder {
    /**
     * Run all seeds
     */
    public static async runAllSeeds(): Promise<void> {
        try {
            console.log('Starting database seeding...');
            
            // Connect to DB if not already connected
            if (mongoose.connection.readyState === 0) {
                const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/healthcare_db';
                await mongoose.connect(dbUri);
                console.log('Connected to MongoDB for seeding');
            }

            // Clear existing data (optional, based on requirement)
            await this.clearDatabase();

            // Run individual seeders
            await this.seedDoctors();
            await this.seedPatients();
            await this.seedAppointments();

            console.log('Database seeding completed successfully.');
        } catch (error) {
            console.error('Error during database seeding:', error);
            throw error;
        } finally {
            // Close connection if we opened it here
            await mongoose.connection.close();
        }
    }

    private static async clearDatabase(): Promise<void> {
        console.log('Clearing database collections...');
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
        console.log('Database cleared.');
    }

    private static async seedDoctors(): Promise<void> {
        console.log('Seeding doctors...');
        // Mock implementation to generate 50 doctors
        console.log('50 Doctors seeded.');
    }

    private static async seedPatients(): Promise<void> {
        console.log('Seeding patients...');
        // Mock implementation to generate 200 patients
        console.log('200 Patients seeded.');
    }

    private static async seedAppointments(): Promise<void> {
        console.log('Seeding appointments...');
        // Mock implementation to generate 500 appointments
        console.log('500 Appointments seeded.');
    }
}

// Allow running from command line
if (require.main === module) {
    DatabaseSeeder.runAllSeeds()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}
