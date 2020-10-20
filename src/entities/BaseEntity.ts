import { BeforeInsert, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { classToPlain } from 'class-transformer'

export abstract class BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  setId (): void {
    if (!this.id) {
      this.id = uuidv4()
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  toJSON () {
    return classToPlain(this)
  }
}
