import { Router } from "express"
import cors from "cors"
import { getConfigFile } from "medusa-core-utils"
import { authenticateSeller, SellerRequest } from "../../../middlewares/seller-auth"
import { ProductService } from "@medusajs/medusa"

export default (app: Router, rootDirectory: string) => {
  const route = Router()
  
  const { configModule } = getConfigFile<any>(rootDirectory, "medusa-config")
  const { projectConfig } = configModule
  
  const corsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  }
  
  app.use("/seller/products", cors(corsOptions), authenticateSeller(), route)

  // List products belonging to the logged-in seller
  route.get("/", async (req: SellerRequest, res) => {
    const productService: ProductService = req.scope.resolve("productService")
    
    try {
      const sellerId = req.seller_id
      
      // Note: We need to use our custom repository method or standard list with query
      // For now, using standard list query with custom where clause injected
      const [products, count] = await productService.listAndCount({
        // @ts-ignore - custom property
        seller_id: sellerId
      }, {
        relations: ["variants", "options", "images"]
      })
      
      res.json({ products, count })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  })

  // Add more routes here for POST / (create product), PUT /:id (update), DELETE /:id
  
  return app
}
