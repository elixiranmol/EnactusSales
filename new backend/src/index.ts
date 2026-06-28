import express from "express"
import { Medusa } from "@medusajs/medusa"

async function start() {
  const app = express()
  
  const medusa = new Medusa()
  await medusa.load()

  app.listen(9000, () => {
    console.log("Medusa backend started on port 9000")
  })
}

start()
