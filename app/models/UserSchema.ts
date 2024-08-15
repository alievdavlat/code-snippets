import mongoose, { models }  from 'mongoose'

const userSchema = new mongoose.Schema({
  clerkUserId:{
    type:String, 
    unique:true,
    required:true,
  },
  emailAddress:{type:String, required:true},
  firstName:{type:String},
  lastName:{type:String},
  username:{type:String}
}, {
  timestamps:true,
})


const User = models.User ||   mongoose.model('User', userSchema)

export default User