# EstuHuella

## [¡Accede a la app!](https://estuhuella.netlify.app/)

![App Logo](public/estuhuellaLogo.png)

## Descripcion

Descubre tu impacto ambiental con esta innovadora app que mide tu huella de carbono y te ofrece recomendaciones personalizadas para reducirla. Conecta con otros usuarios en un foro interactivo y lleva el control de tu progreso en un área privada, donde también podrás personalizar tu perfil con avatares únicos.

#### [Client Repo here](https://github.com/plperezp/estuHuella)

#### [Server Repo here](https://github.com/plperezp/EstuHuellaBackend)

## Backlog Functionalities

-Implementación de sistemas de roles
-Implementacion de sistema de autenticacion mediante Passport

## Technologies used

Javascript, Express, axios, mongoose

# Server Structure

## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true, lowercase: true, trim: true},
  password: {type: String, required: true},
  name: {type: String, required, true},
  huella:{type: [Number]},
  mediHuella:{type: Number, default: 0 },
  img:{type:String, default: "../public/default.png"}

}
```

Habito model

```javascript
{
transporte{
  vehiculo:{type:String, enum:["coche", "autobús", "tren", "metro", "bicicleta", "caminar"]},
  tiempo:{type:Number, min:1, max:450},
  motor:{type:String, enum:["gasolina", "diesel", "electrico", "hibrido"]}
},
otros{
  consumoEnergetico:{type: String, enum:["electricidad", "gas natural", "butano"]},
  esRenovable:{type:Boolean},
  recicla:{type:Boolean}
},
alimentacion:{
  alimento:{type:String, enum:["pollo", "cerdo", "ternera", "vegetales"]},
  cantidad:{type:Number, min: 0},
  esDeProximidad:{type:Boolean}
}
user:{type:type: mongoose.Schema.Types.ObjectId, ref: "User"}

}
{
  timestamps: true
}
```

Post model

```javascript
{
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: {type: String, required: true,},
  text: {type: String, required: true},

{timestaps:true}
}
```

## API Endpoints (backend routes)

| HTTP Method | URL            | Request Body                      | Success status | Error Status | Description                                    |
| ----------- | -------------- | --------------------------------- | -------------- | ------------ | ---------------------------------------------- |
| POST        | `/auth/signup` | {username,name, email, password}  | 201            | 400          | Registers the user in the Database             |
| POST        | `/auth/login`  | {username, password}              | 200            | 400          | Validates credentials, creates and sends Token |
| GET         | `/auth/verify` |                                   | 200            | 401          | Verifies the user Token                        |
| POST        | `/huella`      | {transporte, otros, alimentacion} | 200            | 400          | Creates a new Habito                           |
| GET         | `/huella/user` | {BearerToken}                     | 201            | 400          | Gets habitos data from the logged user         |
| POST        | `/foro`        |                                   | 201            | 400, 401     | Create a new post                              |
| GET         | `/foro`        |                                   | 200            | 400, 401     | Gets all post                                  |
| PUT         | `/foro/:id`    |                                   | 200            | 401          | Edits user's post                              |
| DELETE      | `/foro/:id`    |                                   | 200            | 401          | Delete user's post                             |
| GET         | `/user`        | {BearerToken}                     | 200            | 400, 401     | Get logged user's details                      |
| GET         | `/user`        |                                   | 200            | 401          | Get detalis of all users                       |
| PATCH       | `/user`        | BearerToken                       | 200            | 401          | Update mediHuella of logged user               |
| PATCH       | `/user/huella` | {BearerToken}                     | 200            | 401          | Update huella of logged user                   |

## Links

### Collaborators

[Pedro Perez](https://github.com/plperezp)

[Javier Gascon](https://github.com/Javitocatral)

### Project

[Repository Link Client](https://github.com/plperezp/estuHuella)

[Repository Link Server](https://github.com/plperezp/EstuHuellaBackend)

[Deploy Link](https://estuhuella.netlify.app/)

### Figma

[Link to Figma board](https://www.figma.com/board/M510f4zYpGq3Z3zKPJlnfl/Proyecto-3-Concepto?node-id=0-1&node-type=canvas&t=a8997toAEHOPyQ6U-0)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1MX8W-Ci-ZkHRk1eyR087m2wlMNpNEcPWQS_2-rd7DWE/edit#slide=id.p)
