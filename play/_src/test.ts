// import "./_global.js"
import * as Foo from "./foo.js"

console.log("hello3 w21- abc12346")

//  v--- jump to this
Foo.fmt

Effect("I am an effect233")
  .flatMap(_ => Effect(_ + ", I am another cc effect or 11? hmh"))
  .flatMap(t => Effect(console.log(t + "b Cabz11c123")))
  .runSync

console.log("hello122")
