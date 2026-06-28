import { ProductRepository as MedusaProductRepository } from "@medusajs/medusa/dist/repositories/product"
import { dataSource } from "@medusajs/medusa/dist/loaders/database"
import { Product } from "../models/product"

export const ProductRepository = dataSource.getRepository(Product).extend(
  Object.assign({}, MedusaProductRepository, {
    // Add custom repository methods for Pahadi artisans here if needed
    async findBySeller(sellerId: string): Promise<Product[]> {
      return this.find({
        where: { seller_id: sellerId },
        relations: ["variants", "options", "images", "tags", "collection"],
      })
    },
  })
)

export default ProductRepository
