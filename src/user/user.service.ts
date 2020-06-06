import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { suid } from 'rand-token';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserInterface } from './user.interface';
import { UserTypeService } from 'src/usertype/usertype.service';
import { MailSendgrid } from 'src/helpers/mail-sendgrid';
import { ConfigConst } from 'src/constant/config.const';
import { createHmac } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userTypeService: UserTypeService,
    private readonly jwtService: JwtService,
    private readonly emailHelper: MailSendgrid,
  ) {}

  async restore(id: string): Promise<UserEntity> {
    await this.userRepository.restore(id);
    return await this.show(id);
  }

  async destroy(id: string) {
    try {
      const result = await this.userRepository.softDelete(id);
      return result.raw.affectedRows > 0;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private enoughParams(body: Partial<UserInterface>): boolean {
    if ((body.facebookId && body.name && body.email) || (body.password && body.email)) {
      return true;
    }
    return false;
  }

  async store(body: Partial<UserInterface>): Promise<any> {
    if (this.enoughParams(body)) {
      const checkUser = await this.checkEmailOwner(body.email);

      if (checkUser) {
        throw new BadRequestException('This email already exists on database');
      }

      if (!body.userTypeId) {
        body.userTypeId = (await this.userTypeService.getUserTypeRegular()).id;
      }

      const user = this.userRepository.create(body);
      await this.userRepository.save(user);

      return this.generateUserToken(user);
    }
  }

  private async checkEmailOwner(email: string) {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.email = :email', { email: email })
      .getOne();

    return user;
  }

  async update(id: string, body: Partial<UserInterface>): Promise<UserEntity> {
    try {
      let user;
      try {
        user = await this.userRepository.findOneOrFail(id);
      } catch (error) {
        throw new NotFoundException(error);
      }
      this.userRepository.merge(user, body);
      await this.userRepository.save(user);
      return await this.show(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.userRepository.softDelete(id);
      return result.raw.affectedRows > 0;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async show(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async paginate(options: IPaginationOptions = { page: 1, limit: 10 }): Promise<Pagination<UserEntity>> {
    return await paginate<UserEntity>(this.userRepository, options);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneOrFail({ relations: ['userType'], where: { email: email } });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async valideUserPassword(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    const passwordFromDB = user.password;
    const passwordEncripted = createHmac(ConfigConst.CRIPTO_ALGORITHM, password).digest(
      ConfigConst.ENCODE_CRIPTO_ALGORITHM,
    );

    return passwordFromDB === passwordEncripted ? user : null;
  }

  async getUserByFacebookId(facebookId: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({ facebookId });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async forget(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    const rememberToken = suid(16);
    console.log(rememberToken);
    user.rememberToken = rememberToken;
    await this.userRepository.save(user);
    const emailMsg = this.buildForgetEmail(rememberToken, user.name);
    await this.emailHelper.sendEmail(email, 'Recuperação de Senha - VLive', emailMsg);
    return true;
  }

  async reset(rememberToken: string, password: string): Promise<boolean> {
    let user: UserEntity;
    try {
      user = await this.userRepository.findOneOrFail({ rememberToken });
    } catch (error) {
      throw new NotFoundException(error);
    }
    user.password = password;
    user.rememberToken = null;
    await this.userRepository.save(user);
    return true;
  }

  generateUserToken(user: UserEntity) {
    const token = this.jwtService.sign({ email: user.email });
    return { access_token: token };
  }

  buildForgetEmail(rememberToken: string, userName: string): string {
    const email = `<!DOCTYPE html>
    <html lang="pt-br">
        <head>
            <meta charset="utf-8" />
            <title>Email</title>
            <meta name="viewport" content="width=device-width, initial scale=1.0"/>
            <style>
                body{
                    font-family: Verdana, Tahoma, Helvetica, sans-serif;
                }
            </style>
        </head>
        <body style="background-color:#fdfdfd; min-width:100%; width:100%; margin: 0; padding: 0;">
            <!-- <center> -->
    
                <table border="0" width="100%" cellpadding="0" cellspacing="0" margin="0" aling="center">
                    <tr>
                        <td align="center" style="vertical-align: top">
                            <img src="https://vliveprod.s3-sa-east-1.amazonaws.com/Vlive+escuro.svg" width="80px" height="auto" alt="logo vlive">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table border="0" width="100%" cellpadding="0" margin="0" align="center" style="max-width: 520px; border-style:solid; border-color:#2F2F2F; border-top-left-radius: 4px; border-top-right-radius: 4px; border-width: medium" >
                                <tr>
                                    <td align="left" style="font-size: 15pt; color:#aa528d; border-color:#2F2F2F; border-width: thin; vertical-align:top; padding: 35px">
                                        <h3 style="margin: 0; font-weight: bold;">Altere sua senha</h3>
    
                                        <table>
                                            <tr>
                                                <td align="center" style="font-size: 12pt; color:#000000; padding-top: 5px; padding-bottom: 0px">
                                                <p> Olá, ${userName}!</p>
                                                </td>
                                            </tr>
                                        </table>
                                        <table>
                                            <tr>
                                                <td align="center" style="font-size: 12pt; color:#000000; text-align: left; padding-top: 0px">
                                                    <p>Recebemos uma solicitação para redefinir sua senha. Clique no link abaixo para escolher uma nova:</p>
                                                </td>
                                            </tr>
                                        </table>
                                        <table>
                                            <tr>
                                                <td align="center" style="text-align: left; padding-top: 12px">
                                                  <a href="${process.env.BASE_URL}/reset-password?token=${rememberToken}">
                                                    <input type="submit" value="ACESSAR MINHA CONTA" style="color:#fdfdfd; font-size: 12pt; width: 280px; height: 42px; background: #aa528d; border-radius: 4px; border: #0091da"/>
                                                  </a>
                                                </td>
                                            </tr>
                                        </table>
                                        <table>
                                            <tr>
                                                <td align="center" style="font-size: 12pt; color:#000000; text-align: left; padding-top: 12px">
                                                    <p>Se você recebeu este e-mail por engano, pode ignorá-lo. Sua senha não será alterada.</p>
                                                    <p>Se você tiver algum problema, entre em contato com sua escola.</p>
                                                </td>
                                            </tr>
                                        </table>
                                        <table>
                                            <tr>
                                                <td align="center" style="font-size: 12pt; color:#000000; text-align: left; padding-top: 0px; padding-bottom: 0px">
                                                    <p>Atenciosamente,<br>
                                                    VLive</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" cellpadding="0" margin="0" align="center" style="max-width: 520px; border-style:solid; border-color:#2F2F2F; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-width: medium; background: #2F2F2F">
                                <tr>
                                    <td align="center" style="font-size: 10pt; color:#fdfdfd; text-align: center">
                                        <p>
                                            ©2020 <a href="${process.env.BASE_URL}" style="color:#fdfdfd">VLive</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>100.00%

                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table  width="100%" align="center" style="max-width: 520px">
                                <tr>
                                    <td style="font-size: 0.7rem; color:#000000; text-align:center">
                                        <p>
                                            Você esta recebendo este comunicado porque a senha da sua conta no nosso sistema unico de login foi atualizada.
                                        </p>
                                        <p>
                                            Não responda este email, pois a caixa deste endereço não é monitorada.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            <!-- </center>   -->
        </body>
    </html>
    `;

    return email;
  }
}
