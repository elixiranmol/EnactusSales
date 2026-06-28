import { BeforeInsert, Column, Entity } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"

@Entity()
export class Seller extends BaseEntity {
  @Column({ type: "varchar" })
  full_name: string

  @Column({ type: "varchar" })
  business_name: string

  @Column({ type: "varchar", unique: true })
  email: string

  @Column({ type: "varchar", nullable: true })
  phone: string | null

  @Column({ type: "varchar" })
  password_hash: string

  @Column({ type: "varchar", nullable: true })
  profile_photo: string | null

  @Column({ type: "varchar", nullable: true })
  artisan_category: string | null

  @Column({ type: "text", nullable: true })
  bio: string | null

  @Column({ type: "varchar", nullable: true })
  village: string | null

  @Column({ type: "varchar", nullable: true })
  district: string | null

  @Column({ type: "varchar", nullable: true })
  state: string | null

  @Column({ type: "varchar", nullable: true })
  country: string | null

  @Column({ type: "int", nullable: true })
  years_of_experience: number | null

  @Column({ type: "varchar", default: "pending" })
  verification_status: "pending" | "approved" | "rejected" | "suspended"

  @Column({ type: "jsonb", nullable: true })
  bank_account: Record<string, unknown> | null

  @Column({ type: "varchar", nullable: true })
  upi_id: string | null

  @Column({ type: "varchar", nullable: true })
  gst: string | null

  @Column({ type: "varchar", nullable: true })
  profile_banner: string | null

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "sel")
  }
}
