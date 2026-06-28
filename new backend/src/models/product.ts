import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { Product as MedusaProduct } from "@medusajs/medusa"
import { Seller } from "./seller"

@Entity()
export class Product extends MedusaProduct {
  @Index()
  @Column({ type: "varchar", nullable: true })
  seller_id: string | null

  @ManyToOne(() => Seller)
  @JoinColumn({ name: "seller_id" })
  seller: Seller

  // Pahadi Artisan Specific Metadata
  @Column({ type: "text", nullable: true })
  artisan_story: string | null

  @Column({ type: "text", nullable: true })
  handmade_process: string | null

  @Column({ type: "varchar", nullable: true })
  material: string | null

  @Column({ type: "varchar", nullable: true })
  region: string | null

  @Column({ type: "varchar", nullable: true })
  village: string | null

  @Column({ type: "varchar", nullable: true })
  district: string | null

  @Column({ type: "text", nullable: true })
  cultural_significance: string | null

  @Column({ type: "varchar", nullable: true })
  production_time: string | null

  @Column({ type: "boolean", default: false })
  customization_available: boolean

  @Column({ type: "text", nullable: true })
  care_instructions: string | null

  @Column({ type: "boolean", default: false })
  authenticity_certificate: boolean
}
