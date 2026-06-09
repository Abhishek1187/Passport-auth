import passport from 'passport';
import { Strategy } from 'passport-local';
import { mockUsers } from '../mockUsers.js';

passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Deserializing user id:', id);
    try {
        const findUser = mockUsers.find((user) => user.id === id);
        if (!findUser) {
            throw new Error('User not found');
        }
        done(null, findUser);
    } catch (err) {
        done(err, null);
    }
});

export default passport.use(
   new Strategy ((username , password , done) =>{
    console.log(`username: ${username}`)
    console.log(`password: ${password}`)
    try {
      const findUser = mockUsers.find((user) => user.name === username);
      if(!findUser) return done(null, false, { message: "User not found" });

      if(findUser.password !== password) return done(null, false, { message: "Invalid credentials" });
      
      return done(null , findUser);
    } catch (err) {
      return done(err , false);
    }
   }) 
)