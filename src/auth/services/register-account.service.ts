import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { RegisterAccountBodyDTO } from 'types';
import * as bcrypt from 'bcryptjs';
import { Account } from 'libs/entities';
import { response } from 'libs/utils';

@Injectable()
export class RegisterAccountService {
  private async _generatePassword(password: string) {
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(String(password), passwordSalt);
    return { passwordSalt, passwordHash };
  }

  public async registerAccount(data: any) {
    const { phone, password, fullName } = data;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { passwordSalt, passwordHash } = await this._generatePassword(
        password,
      );
      const account = await queryRunner.manager.getRepository(Account).save({
        phone,
        fullName,
        passwordHash,
        passwordSalt,
        createdAt: new Date(),
      });
      console.log('RegisterAccountService => account:', account);
      await queryRunner.commitTransaction();
      return response(200, 'REGISTER_ACCOUNT_SUCCESSFULLY', { account });
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
