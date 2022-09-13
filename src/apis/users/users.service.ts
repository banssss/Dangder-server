import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne({ email }) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create({ createUserInput }) {
    const user = await this.usersRepository.findOne({
      where: { email: createUserInput.email },
    });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');
    // bcrypt 사용하기
    // hash 알고리즘을 사용해 비밀번호를 암호화하는데 hash 메서드의 두 번째 인자는 salt이다.
    // 원본 password를 salt 시켜 준다.
    const salt = process.env.BCRYPT_USER_SALT;
    const hashedPassword = await bcrypt.hash(
      createUserInput.password,
      Number(salt),
    );
    return this.usersRepository.save({
      ...createUserInput,
      password: hashedPassword,
    });
  }

  async update({ email, updateUserInput }) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    // 수정된 입력값 저장
    const result = await this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });
    return result;
  }

  async delete({ email }) {
    // 소프트 삭제 - softDelete
    const result = await this.usersRepository.softDelete({ email });
    return result.affected ? true : false;
  }
}
