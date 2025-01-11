import { AuthService } from './auth.service';
import { VerifyOtpResponse } from './dto/verify-otp-response.dto';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    sendOtp(phone: string): Promise<boolean>;
    verifyOtp(phone: string, otp: string): Promise<VerifyOtpResponse>;
}
