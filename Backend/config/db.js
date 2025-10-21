import mongoose from 'mongoose'


export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://hr715301_db_user:<db_password>@cluster1.q0mbjwp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'
        
        await mongoose.connect(mongoUri)
        console.log('✅ DB Connected Successfully')
    } catch (error) {
        console.error('❌ Database connection failed:', error.message)
        process.exit(1)
    }
}