import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      password: String(profile.id),
      name: profile.displayName,
    };
  }
}
