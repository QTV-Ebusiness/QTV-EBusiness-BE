import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article', { schema: 'db_qtv_ebusiness' })
export class Article {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'is_deleted', width: 1, default: () => "'0'" })
  isDeleted: boolean;

  @Column('text', { name: 'photo_url', nullable: true })
  photoUrl: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @Column('text', { name: 'title', nullable: true })
  title: string | null;

  @Column('datetime', { name: 'schedule_at', nullable: true })
  scheduleAt: Date | null;

  @Column('int', { name: 'is_create_now', nullable: true })
  isCreateNow: boolean | null;

  @Column('tinyint', { name: 'is_facebook', nullable: true })
  isFacebook: boolean | null;

  @Column('tinyint', { name: 'is_instagram', nullable: true })
  isInstagram: boolean | null;

  @Column('int', { name: 'is_zalo', nullable: true })
  isZalo: boolean | null;

  @Column('text', { name: 'facebook_post_id', nullable: true })
  facebookPostId: string | null;

  @Column('text', { name: 'instagram_post_id', nullable: true })
  instagramPostId: string | null;

  @Column('text', { name: 'zalo_post_id', nullable: true })
  zaloPostId: string | null;

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
