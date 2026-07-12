import mongoose from "mongoose";
const DiscordUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
discordId:{
    type:String,
    required:true,
    unique:true
}
});

export default mongoose.model("DiscordUser", DiscordUserSchema);