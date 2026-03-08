import mongoose,{Schema} from "mongoose";

const orderSchema = new Schema({
    orderId:{
        type:String,
        required:true,
        unique:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    customerName:{
        type:String
    },

    items:{
        type:Number,
        default:1
    },

    totalAmount:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        enum:[
        "Processing",
        "Shipped",
        "In Transit",
        "Delivered",
        "Cancelled"
        ],
        default:"Processing"
    },

    estimatedDelivery:Date

    },
    {timestamps:true}
);

export const Order = mongoose.model("Order",orderSchema);