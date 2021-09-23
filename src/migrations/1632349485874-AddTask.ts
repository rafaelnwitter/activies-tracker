import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTask1632349485874 implements MigrationInterface {
  name = 'AddTask1632349485874';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`activies-app\`.\`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(64) NOT NULL, \`description\` varchar(1024) NULL, \`type\` int NOT NULL, \`status\` int NOT NULL DEFAULT '0', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`activies-app\`.\`task\``);
  }
}
