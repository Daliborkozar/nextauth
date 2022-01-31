import { hash } from 'bcryptjs'

export const hashpassword = async(password)=> {
    // 12 (best practice)is salting rounds - how strong is password
   const hashedpassword =  hash(password, 12)
   return hashedpassword
}