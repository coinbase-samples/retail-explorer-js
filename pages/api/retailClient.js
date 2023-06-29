import { requestHeaders } from '../../utils/headers';
import { baseUrl } from '../../utils/constants';

export const makeCall = async (
  token,
  path = '/',
  method = 'GET',
  body = '',
  twoFAcode = ''
) => {
  const targetUrl = `${baseUrl}${path}`;
  const headers =
    twoFAcode !== ''
      ? requestHeaders(true, token, twoFAcode)
      : requestHeaders(false, token);

  try {
    const options = {
      method,
      credentials: 'include',
      headers,
    };

    if (body) {
      options.body = body;
    }

    const callRetail = await fetch(targetUrl, options);

    return callRetail;
  } catch (e) {
    return e;
  }
};
