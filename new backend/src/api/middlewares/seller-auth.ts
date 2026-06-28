import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { MedusaError } from "@medusajs/utils"

export interface SellerRequest extends Request {
  seller_id?: string
}

export const authenticateSeller = () => {
  return async (req: SellerRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization
      
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new MedusaError(
          MedusaError.Types.UNAUTHORIZED,
          "No valid authorization header found"
        )
      }

      const token = authHeader.split(" ")[1]
      const jwtSecret = process.env.JWT_SECRET || "supersecret"
      
      // Verify the JWT token
      const decoded = jwt.verify(token, jwtSecret) as { seller_id: string }
      
      if (!decoded.seller_id) {
        throw new MedusaError(
          MedusaError.Types.UNAUTHORIZED,
          "Invalid seller token structure"
        )
      }

      // Attach seller_id to request object
      req.seller_id = decoded.seller_id
      
      next()
    } catch (error) {
      next(
        new MedusaError(
          MedusaError.Types.UNAUTHORIZED,
          "Authentication failed: Invalid or expired token"
        )
      )
    }
  }
}
