import mongoose from 'mongoose'
import colors from 'colors'

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongoose connect ${mongoose.connection.host}`.bgGreen.white)

    } catch (error) {
        console.log(`mongoose error ${error}`.bgGreen.white)
    }
}

export default connectDb;