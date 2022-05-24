import * as crypto from 'crypto';

export const hashPwd = (par: string): string => {
  const hmac = crypto.createHmac(
    'sha512',
    'dkje;jdkjfje;kjkdjfelj jdkjekl;j ljdfkejkdhfeljkplfhekhdfjdkfhephfjdkeeklf', //* To jest tzw. sól
  );
  hmac.update(par);
  return hmac.digest('hex');
};
