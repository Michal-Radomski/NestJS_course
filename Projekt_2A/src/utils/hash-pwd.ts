import * as crypto from 'crypto';

export const hashPwd = (par: string): string => {
  const hmac = crypto.createHmac(
    'sha512',
    /* cspell: disable-next-line */
    'dkje;jdkjfje;kjkdjfelj jdkjekl;j ljdfkejkdhfeljkplfhekhdfjdkfhephfjdkdkjfkehfkehehrdskhfeirheeklf', //* To jest tzw. sól
  );
  hmac.update(par);
  return hmac.digest('hex');
};
