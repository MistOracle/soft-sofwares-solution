import { Schema, model, models } from "mongoose"

const keySchema = new Schema({
    regKey:{
        type:String,
        required:true,
        unique:true
    },
    accounts:{
        type:Number,
        required:true,
    },
    url:{
        type:String
    }
});

const Keys = models.Keys || model("Keys",keySchema);

export default Keys;