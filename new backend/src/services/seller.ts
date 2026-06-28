import { TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { Seller } from "../models/seller"
import bcrypt from "bcrypt"
import { MedusaError } from "@medusajs/utils"
import SellerRepository from "../repositories/seller"

type InjectedDependencies = {
  manager: EntityManager
  sellerRepository: typeof SellerRepository
}

export default class SellerService extends TransactionBaseService {
  protected sellerRepository_: typeof SellerRepository

  constructor(container: InjectedDependencies) {
    super(container)
    this.sellerRepository_ = container.sellerRepository
  }

  // Retrieve a seller by their ID
  async retrieve(sellerId: string): Promise<Seller> {
    const sellerRepo = this.activeManager_.withRepository(this.sellerRepository_)
    const seller = await sellerRepo.findOne({
      where: { id: sellerId },
    })

    if (!seller) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Seller with id: ${sellerId} was not found`
      )
    }

    return seller
  }

  // Retrieve a seller by their email
  async retrieveByEmail(email: string): Promise<Seller | null> {
    const sellerRepo = this.activeManager_.withRepository(this.sellerRepository_)
    return await sellerRepo.findOne({
      where: { email },
    })
  }

  // Register a new seller
  async create(data: any): Promise<Seller> {
    return await this.atomicPhase_(async (manager) => {
      const sellerRepo = manager.withRepository(this.sellerRepository_)

      const existingSeller = await this.retrieveByEmail(data.email)
      if (existingSeller) {
        throw new MedusaError(
          MedusaError.Types.DUPLICATE_ERROR,
          `A seller with email ${data.email} already exists`
        )
      }

      // Hash the password securely
      const hashedPassword = await bcrypt.hash(data.password, 10)

      const created = sellerRepo.create({
        full_name: data.full_name,
        business_name: data.business_name,
        email: data.email,
        phone: data.phone,
        password_hash: hashedPassword,
        artisan_category: data.artisan_category,
        bio: data.bio,
        village: data.village,
        district: data.district,
        state: data.state,
        country: data.country,
        years_of_experience: data.years_of_experience,
        verification_status: "pending", // Default to pending until admin approves
      })

      const seller = await sellerRepo.save(created)
      return seller
    })
  }

  // Authenticate a seller
  async authenticate(email: string, password_plain: string): Promise<Seller> {
    const seller = await this.retrieveByEmail(email)

    if (!seller) {
      throw new MedusaError(
        MedusaError.Types.UNAUTHORIZED,
        `Invalid email or password`
      )
    }

    const isValid = await bcrypt.compare(password_plain, seller.password_hash)

    if (!isValid) {
      throw new MedusaError(
        MedusaError.Types.UNAUTHORIZED,
        `Invalid email or password`
      )
    }

    if (seller.verification_status === "suspended") {
      throw new MedusaError(
        MedusaError.Types.NOT_ALLOWED,
        `Account is suspended. Please contact support.`
      )
    }
    
    // We allow "pending" users to log in to access a limited dashboard
    // But they might not be able to list products yet depending on RBAC policies.

    return seller
  }
}
