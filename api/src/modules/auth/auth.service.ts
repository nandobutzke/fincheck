import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from './dtos/signin.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dtos/signup.dto';
import { TransactionType } from "../transactions/entities/Transaction";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersRepo.findUnique({
      where: { email }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true }
    })

    if (emailTaken) {
      throw new ConflictException("This email is already in use.")
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepo.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: TransactionType.INCOME },
              { name: 'Freelance', icon: 'freelance', type: TransactionType.INCOME },
              { name: 'Outro', icon: 'other', type: TransactionType.INCOME },
              // Expense
              { name: 'Casa', icon: 'home', type: TransactionType.EXPENSE },
              { name: 'Alimentação', icon: 'food', type: TransactionType.EXPENSE },
              { name: 'Educação', icon: 'education', type: TransactionType.EXPENSE },
              { name: 'Lazer', icon: 'fun', type: TransactionType.EXPENSE },
              { name: 'Mercado', icon: 'grocery', type: TransactionType.EXPENSE },
              { name: 'Roupas', icon: 'clothes', type: TransactionType.EXPENSE },
              { name: 'Transporte', icon: 'transport', type: TransactionType.EXPENSE },
              { name: 'Viagem', icon: 'travel', type: TransactionType.EXPENSE },
              { name: 'Outro', icon: 'other', type: TransactionType.EXPENSE },
            ]
          }
        }
      }
    });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
