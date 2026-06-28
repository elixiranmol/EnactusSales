import { dataSource } from "@medusajs/medusa/dist/loaders/database"
import { Seller } from "../models/seller"

export const SellerRepository = dataSource.getRepository(Seller)

export default SellerRepository
