const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");


// TODO: Please make sure you edit the User model to whatever makes sense in this case
const habitoSchema = new mongoose.Schema(
  {
    transporte:{
    
    vehiculo: {
      type: String, 
      required: [true, "Transporte is required"],
      enum:["coche", "autobús", "tren", "metro", "bicicleta", "caminar"]
    },
    
    tiempo: {
      type:Number,
      required: [true, "Distancia is required"],
      min:1,
      max: 450
    },
    motor: {
      type: String,
      enum:["gasolina","diesel","electrico","hibrido"]
    },
  },

    otros:{
    consumoEnergetico: {
      type: String,
      //required: [true, 'Consumo is required.'],
      enum:["electricidad","gas natural","butano"]
    },

    esRenovable: {
      type: Boolean,
      default: false
    
    },
    recicla:{
      type:Boolean,
      default: false
  },
},
    alimentacion:{
    alimento:{
      type:String,
      enum:["pollo", "cerdo", "ternera", "vegetales"]
    },
    cantidadCarne:{
      type:Number,
      min:0
    },
    cantidadVegetales:{
      type:Number,
      min:0
    },
    esDeProximidad:{
      type:Boolean,
    }
  },
  
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true


  }
);

const Habito = model("Habito", habitoSchema);

module.exports = Habito ;
