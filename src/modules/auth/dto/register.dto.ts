import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { OmitType } from '@nestjs/mapped-types';

export class RegisterDto extends OmitType(CreateUserDto, ['role'] as const) {}