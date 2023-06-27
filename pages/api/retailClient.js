import { requestHeaders } from '../../utils/headers';
export const makeCall = async (
  token,
  path = '/',
  method = 'GET',
  body = '',
  twoFAcode = '',
) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const targetUrl = `${baseUrl}${path}`;
  let headers;

  if (twoFAcode !== '') {
    headers = requestHeaders(true, token, twoFAcode);
  } else {
    headers = requestHeaders(false, token);
  }
 
  console.log(headers)
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
