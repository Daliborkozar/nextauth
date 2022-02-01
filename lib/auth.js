import { compare, hash } from 'bcryptjs'

export const hashpassword = async(password)=> {
    // 12 (best practice)is salting rounds - how strong is password
   const hashedpassword =  await hash(password, 12)
   console.log(hashedpassword)
   return hashedpassword
}

export const verifyPassword = async(password, hashpass) => {
    const isValid = await compare(password, hashpass)
    return isValid
}