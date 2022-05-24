import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from '../user/user.entity';
import { hashPwd } from '../utils/hash-pwd';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(
      payload,
      /* cspell: disable-next-line */
      'dkfhklehfdslfjdljfdjfldjfdkjfkldjfkl;djfl;ajrtu5tctirlyu5,rstwv,w i5, rkeiprujfdkjfhfetiwp[y, [tiwpyi[iy rr',
      { expiresIn },
    );
    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await User.findOne({ currentTokenId: token });
    } while (!!userWithThisToken);
    user.currentTokenId = token;
    await user.save();

    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await User.findOne({
        email: req.email,
        pwdHash: hashPwd(req.pwd),
      });

      console.log({ user });

      if (!user) {
        return res.json({ error: 'Invalid login data!' });
      }

      const token = await this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false, //* true jeśli używa się https !
          domain: 'localhost',
          httpOnly: true, //* Tak bezpieczniej !!!
        })
        .json({ ok: true });
    } catch (error) {
      console.log({ error });
      return res.json({ error: error.message });
    }
  }

  async logout(user: User, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure: false, //* Jak przy logowaniu !
        domain: 'localhost',
        httpOnly: true, //* Tak bezpieczniej !!!
      });
      return res.json({ ok: true });
    } catch (error) {
      console.log({ error });
      return res.json({ error: error.message });
    }
  }
}
