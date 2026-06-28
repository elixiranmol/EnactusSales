import { Router } from "express"
import cors from "cors"
import { getConfigFile } from "medusa-core-utils"
import jwt from "jsonwebtoken"
import SellerService from "../../../../services/seller"
import { authenticateSeller, SellerRequest } from "../../../middlewares/seller-auth"

export default (app: Router, rootDirectory: string) => {
  const route = Router()
  
  // Apply CORS
  const { configModule } = getConfigFile<any>(rootDirectory, "medusa-config")
  const { projectConfig } = configModule
  
  const corsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  }
  app.use("/seller", cors(corsOptions), route)

  // Register an artisan seller
  route.post("/auth/register", async (req, res) => {
    const sellerService: SellerService = req.scope.resolve("sellerService")
    
    try {
      const seller = await sellerService.create(req.body)
      
      // We don't auto-login on registration since they might need verification
      res.status(201).json({ 
        message: "Registration successful. Account is pending admin verification.",
        seller_id: seller.id 
      })
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  })

  // Login an artisan seller
  route.post("/auth/login", async (req, res) => {
    const sellerService: SellerService = req.scope.resolve("sellerService")
    
    try {
      const { email, password } = req.body
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" })
      }

      const seller = await sellerService.authenticate(email, password)
      
      // Generate JWT
      const jwtSecret = projectConfig.jwt_secret || process.env.JWT_SECRET || "supersecret"
      const token = jwt.sign(
        { seller_id: seller.id },
        jwtSecret,
        { expiresIn: "24h" }
      )
      
      // Remove sensitive data from response
      const { password_hash, ...sellerData } = seller
      
      res.json({
        access_token: token,
        seller: sellerData
      })
    } catch (error: any) {
      res.status(401).json({ message: error.message })
    }
  })

  // Get current logged-in seller profile (Protected route)
  route.get("/auth/me", authenticateSeller(), async (req: SellerRequest, res) => {
    const sellerService: SellerService = req.scope.resolve("sellerService")
    
    try {
      const sellerId = req.seller_id
      if (!sellerId) throw new Error("Unauthorized")

      const seller = await sellerService.retrieve(sellerId)
      
      // Remove password hash before sending
      const { password_hash, ...sellerData } = seller
      
      res.json({ seller: sellerData })
    } catch (error: any) {
      res.status(401).json({ message: error.message })
    }
  })

  return app
}
