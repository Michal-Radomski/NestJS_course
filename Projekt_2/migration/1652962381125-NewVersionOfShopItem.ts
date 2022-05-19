import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewVersionOfShopItem1652962381125 implements MigrationInterface {
  name = 'NewVersionOfShopItem1652962381125';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`shop_item\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`shop_item\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
  }
}
