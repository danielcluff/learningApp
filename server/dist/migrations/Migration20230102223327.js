"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230102223327 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230102223327 extends migrations_1.Migration {
  async up() {
    this.addSql('alter table "user" add column "email" text not null;');
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");'
    );
  }
}
exports.Migration20230102223327 = Migration20230102223327;
//# sourceMappingURL=Migration20230102223327.js.map
