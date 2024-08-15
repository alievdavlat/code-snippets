"use server"

import User from "@/app/models/UserSchema"

import connect from "./db"

export async function createUser(user:any) {

  try {
    await connect()

    const newUser = await User.create(user)

    return JSON.parse(JSON.stringify(newUser))
  } catch (err:any) {
    console.log(err);
    
  }
}