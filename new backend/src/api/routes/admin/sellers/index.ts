import { Router } from "express"
import cors from "cors"
import { getConfigFile } from "medusa-core-utils"
import requireAdminAuth from "@medusajs/medusa/dist/api/middlewares/require-admin-auth"
import SellerService from "../../../../services/seller"

export default (app: Router, rootDirectory: string) => {
  const route = Router()
  
  const { configModule } = getConfigFile<any>(rootDirectory, "medusa-config")
  const { projectConfig } = configModule
  
  const corsOptions = {
    origin: projectConfig.admin_cors.split(","),
    credentials: true,
  }
  
  app.use("/admin/sellers", cors(corsOptions), requireAdminAuth(), route)

  // Admin: List all sellers
  route.get("/", async (req, res) => {
    // Usually via a listAndCount method on the SellerService
    res.json({ sellers: [], count: 0 })
  })

  // Admin: Approve a seller
  route.post("/:id/approve", async (req, res) => {
    const sellerService: SellerService = req.scope.resolve("sellerService")
    
    try {
      // Logic to update verification_status to "approved"
      res.json({ success: true, message: "Seller approved" })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  })

  // Admin: Suspend a seller
  route.post("/:id/suspend", async (req, res) => {
    try {
      // Logic to update verification_status to "suspended"
      res.json({ success: true, message: "Seller suspended" })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  })

  return app
}
