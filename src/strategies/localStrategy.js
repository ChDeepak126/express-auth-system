import passport from "passport";
import { Strategy } from "passport-local";
import { monsterTrio } from "../utils/monsters.js";
import User from "../mongoose/schemas/user.js";
import { comparePassword } from "../utils/helpers.js";
passport.serializeUser((user,done)=>
{
    console.log('inside serializeUser');
    console.log(user);
    done(null,user.id);
});
passport.deserializeUser(async(id,done)=>
{
    console.log('inside deserializedUser');
    console.log(`deserialized id:${id}`);
    try{
        const findUser=await User.findById(id);
        if(!findUser) throw new Error('User not found');
        done(null,findUser)
    }
    catch(err){
        done(err,null);
    }
})
export default passport.use(
    new Strategy({usernameField:'name'},async(name,password,done)=>
    {
        try{
            const findUser=await User.findOne({name});
            if(!findUser) throw new Error('user not found');
            if(!comparePassword(password,findUser.password)) 
                throw new Error('invalid credentials');
            done(null,findUser)
        }
        catch(err){
            done(err,null);
        }
        
    })
)