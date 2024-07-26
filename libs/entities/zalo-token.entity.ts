import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('zalo_token', { schema: 'db_qtv_ebusiness' })
export class ZaloToken {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'is_active', width: 1, default: () => "'1'" })
  isActive: boolean;

  @Column('tinyint', { name: 'is_deleted', width: 1, default: () => "'0'" })
  isDeleted: boolean;

  @Column('text', { name: 'access_token' })
  accessToken: string;

  @Column('text', { name: 'refresh_token' })
  refreshToken: string;

  @Column('datetime', { name: 'expire_at' })
  expireAt: Date;
}
