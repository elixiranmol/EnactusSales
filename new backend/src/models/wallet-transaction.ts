import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { Wallet } from "./wallet"

export enum TransactionType {
  SALE = "sale",
  REFUND = "refund",
  WITHDRAWAL = "withdrawal",
  ADJUSTMENT = "adjustment",
}

@Entity()
export class WalletTransaction extends BaseEntity {
  @Column({ type: "varchar" })
  wallet_id: string

  @ManyToOne(() => Wallet)
  @JoinColumn({ name: "wallet_id" })
  wallet: Wallet

  @Column({ type: "enum", enum: TransactionType })
  type: TransactionType

  @Column({ type: "int" })
  amount: number

  @Column({ type: "varchar", nullable: true })
  reference_id: string | null // E.g. Order ID, Refund ID, Payout ID

  @Column({ type: "varchar", nullable: true })
  description: string | null

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "wtx")
  }
}
