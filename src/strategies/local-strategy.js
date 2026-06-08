import passport from 'passport';
import {strategy} from 'passport-local';
import {mockUsers} from './mockUsers.js';


passport.use(
   new strategy ((username , password , done) =>{
    console.log(`Username: ${username}`)
    console.log(`Password: ${password}`)
    try {
      const findone = mockUsers.find((user) => user.username === username);
    if(!findone) throw new Error ("email invalid")
      if(findone.passoword !== password)
      throw new error("invalid credentials ");
      done(null , findone);
    } catch (err) {
      done(err , null);
      
    }
    
  


   }) 
)