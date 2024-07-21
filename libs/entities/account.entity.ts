import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account', { schema: 'sql12650018' })
export class Account {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'is_deleted', width: 1, default: () => "'0'" })
  isDeleted: boolean;

  @Column('varchar', { name: 'full_name', nullable: true, length: 255 })
  fullName: string | null;

  @Column('varchar', { name: 'phone', nullable: true, length: 10 })
  phone: string | null;

  @Column('varchar', { name: 'password_hash', nullable: true, length: 255 })
  passwordHash: string | null;

  @Column('varchar', { name: 'password_salt', nullable: true, length: 255 })
  passwordSalt: string | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('datetime', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('int', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @Column('int', { name: 'updated_by', nullable: true })
  updatedBy: number | null;

  @Column('int', { name: 'deleted_by', nullable: true })
  deletedBy: number | null;
}
