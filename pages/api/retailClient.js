/**
 * Copyright 2023 Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const makeCall = async (
  token,
  path = '/',
  method = 'GET',
  body = '',
  twoFAcode = ''
) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const targetUrl = `${baseUrl}${path}`;
  let headers;

  if (twoFAcode !== '') {
    headers = {
      Accept: 'application/json',
      'CB-VERSION': '2015-04-08',
      Authorization: 'Bearer ' + token,
      'CB-2FA-TOKEN': twoFAcode,
    };
  } else {
    headers = {
      Accept: 'application/json',
      'CB-VERSION': '2015-04-08',
      Authorization: 'Bearer ' + token,
    };
  }

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
