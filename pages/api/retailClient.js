import { requestHeaders } from '../../utils/headers';
import { baseUrl } from '../../utils/constants';

export const makeCall = async (
  token,
  path = '/',
  method = 'GET',
  body = '',
  twoFAcode = '',
) => {
  const targetUrl = `${baseUrl}${path}`;
  let headers;

  if (twoFAcode !== '') {
    headers = requestHeaders(true, token, twoFAcode);
  } else {
    headers = requestHeaders(false, token);
  }

  console.log(headers);
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
    console.log('this is api call response', callRetail);

    return callRetail;
  } catch (e) {
    return e;
  }
};
