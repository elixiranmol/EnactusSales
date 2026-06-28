import { Column, Entity, Index } from "typeorm"
import { LineItem as MedusaLineItem } from "@medusajs/medusa"

@Entity()
export class LineItem extends MedusaLineItem {
  @Index()
  @Column({ type: "varchar", nullable: true })
  seller_id: string | null
}
