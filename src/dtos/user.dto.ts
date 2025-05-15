export class CreateUserDto {
    email!: string;
    password!: string;
    name!: string;
}

export class UpdateUserDto {
    email?: string;
    password?: string;
    name?: string;
}

export class UserResponseDto {
    id!: string;
    email!: string;
    name!: string;
    // Note: We don't include password in the response DTO for security
} 