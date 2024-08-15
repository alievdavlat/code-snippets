import mongoose from "mongoose";


const mongo_uri =  process.env.NEXT_PUBLIC_DB_URL as string 

const connect = async () => {
  const connectionState = mongoose.connection.readyState

  if (connectionState === 1) {
    console.log('Already connected');
    return 
  }

  if (connectionState === 2) {
    console.log('Connecting...');
    return
  }

  try {
      mongoose.connect(mongo_uri, {
        dbName:'code-snippet',
        bufferCommands:false
      })

      console.log('Connected');
      
  } catch (err:any) {
    console.log('somthing went wrong to connect db', err);
    throw new Error('Error connection to db', err)
    
  }
}

export default connect