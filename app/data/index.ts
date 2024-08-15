export const data = {
  id:1,
  title:"this is note",
  isFavorited:false,
  tags:['tag1', 'tag2', 'tag3'],
  description:'ldkldmskmqklmskqlmqkmkqmkqmwklqmwkqmkwmqklwmqkwqjwqoijwoqjwopq',
  code :`import mongoose  from 'mongoose'

const userSchema = new mongoose.Schema({
  clerkUserId:{
    type:String, 
    unique:true,
    required:true,
  },
  emailAddress:{type:String, required:true}
}, {
  timestamps:true,
})


const User =  mongoose.model('User', userSchema)

export default User`,
language:'Javascript',
creationDate:'2022-01-01'
}