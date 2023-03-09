import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "mysecretpassword",
  database: "mydb",
  synchronize: true,
  entities: [
    "dist/**/*.entity{.ts,.js}"
  ]
};


