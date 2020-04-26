import { UserEntity } from "./entities/user.entity";
import { UserTypeEntity } from "./entities/usertype.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [
      TypeOrmModule.forFeature([UserEntity, UserTypeEntity]),
      
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
  })
  export class UserModule {}
  