import User from './models/User.js'
import bcrypt from 'bcrypt'

export const add_user = async(body)=>{
  if(await User.findOne({'username':body.username}, (err,data)=>{})){
    return {error:'username exists'}
  }else{
    if(pass_validation(body.password)){
      const hashedPassword = await bcrypt.hash(body.password, 10)
      User.create({
        "username":body.username,
        "password":hashedPassword,
        "contacts":[]
      })
      return {status:'ok'}
    }else{
      return {error:'unsuccesful'}
    }
  }
}

const pass_validation = (pass)=>{
  if(pass.length < 8){
    return false
  }
  return true
}
