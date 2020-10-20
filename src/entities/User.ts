import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'
import { IsEmail } from 'class-validator'
import { Exclude } from 'class-transformer'
import bcrypt from 'bcrypt'

import { BaseEntity } from './BaseEntity'

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  private encryptPassword (): void {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(this.password, salt)
    this.password = hash
  }

  @BeforeUpdate()
  checkPassword (): void {
    if (this.password) {
      this.encryptPassword()
    }
  }

  @BeforeInsert()
  encryptNewPassword (): void {
    this.encryptPassword()
  }
}
