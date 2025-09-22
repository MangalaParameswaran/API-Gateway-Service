import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";

export class CreateAuthDto {
    @IsString() name: string;
    @IsEmail() email: string;
    @IsString() password: string;
    @IsString() subscription: boolean;
    @IsNumber() plan_price: number;
    @IsDate() expiresAt: Date
}
