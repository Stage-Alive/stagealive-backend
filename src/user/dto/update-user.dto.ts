import { ApiProperty } from "@nestjs/swagger";


export class UpdateUserDto{
 
    @ApiProperty({ description: 'The name of user', nullable: false })
     name: string;

     @ApiProperty({ description: 'The name of user', nullable: false })
     email: string;

     

}