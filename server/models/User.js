import mongoose from 'mongoose'

const user_schema = new mongoose.Schema({
  username:String,
  password:String,
  contacts:[{name:String,last:String}],
  blocked:[{type:String}]
})

export default mongoose.model('user', user_schema)