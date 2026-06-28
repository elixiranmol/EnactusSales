import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { Seller } from "./seller"

@Entity()
export class Wallet extends BaseEntity {
  @Column({ type: "varchar", unique: true })
  seller_id: string

  @OneToOne(() => Seller)
  @JoinColumn({ name: "seller_id" })
  seller: Seller

  // Amounts in cents/paise
  @Column({ type: "int", default: 0 })
  available_balance: number

  @Column({ type: "int", default: 0 })
  pending_balance: number

  @Column({ type: "int", default: 0 })
  lifetime_earnings: number

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "wall")
  }
}
