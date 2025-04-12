import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { RegisterInput } from './dto/register.input';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private jwtService: JwtService) {}

  async register(data: RegisterInput) {
    const user = {
      id: uuidv4(),
      ...data,
      password: await bcrypt.hash(data.password, 10),
    };

    this.users.push(user);
    return this.generateToken(user);
  }

  async login(data: LoginInput) {
    const user = this.users.find((u) => u.email === data.email);
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return this.generateToken(user);
  }

  generateToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
