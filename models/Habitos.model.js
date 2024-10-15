const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const habitosSchema = new Schema(
  {

    transportes: {
      type: [String], 
      required: [true, "Transporte is required"],
      enum:["coche", "autobús", "tren", "metro", "bicicleta", "caminar"]
    },

    distancia: {
      type:Number,
      required: [true, "Distancia is required"],
      min:1,
      max: 450
    },
    motor: {
      type: [String],
      enum:["gasolina","diesel","electrico","hibrido"]
    },
    consumoEnergetico: {
      type: [String],
      required: [true, 'Consumo is required.'],
      enum:["electricidad","gas natural","butano"]
    },

    esRenovable: {
      type: Boolean,
      default: false
    
    },

    alimentacion:{
      type:[String],
      enum:["pollo", "cerdo", "ternera", "vegetales"]
    },
    cantidaCarne:{
      type:Number,
      min:0
    },
    cantidaVegetales:{
      type:Number,
      min:0
    },
    recicla:{
      type:Boolean,
      default: false
    },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true


  }
);

const Habitos = model("Habitos", userSchema);

module.exports = Habitos ;
