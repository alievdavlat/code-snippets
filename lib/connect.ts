import mongoose from "mongoose";


async function connect():Promise<void> {
try {
    await mongoose.connect(process.env.NEXT_PUBLIC_DB_URL as string)
    console.log('db connected');
    
} catch (err) {
  console.log('failed db connection', err); 
}
}

export default connect