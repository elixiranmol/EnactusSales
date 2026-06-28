import { Column, Entity, Index } from "typeorm"
import { Order as MedusaOrder } from "@medusajs/medusa"

@Entity()
export class Order extends MedusaOrder {
  // In a multi-vendor setup, an order might be split, or we track fulfillment per seller.
  // Adding seller_id to order helps if orders are pre-split during checkout.
  @Index()
  @Column({ type: "varchar", nullable: true })
  seller_id: string | null
}
