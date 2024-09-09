import { z } from 'zod';

import { Response } from '../template/response';

const RefreshToken = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const RefreshTokenRes = Response.extend({
  data: RefreshToken.optional(),
});
