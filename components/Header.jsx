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

import React, { useContext } from 'react';
import { TopNavigation } from '@cloudscape-design/components';
import { ProfileContext } from '../context/profileContext';
import { useRouter } from 'next/router';
import { UserContext } from '../context/UserContext';

export default function Header() {
  const { userProfile, setUserProfile } = useContext(ProfileContext);
  const router = useRouter();
  const { setAuthToken, authToken } = useContext(UserContext);

  const handleLogoClick = e => {
    e.preventDefault();
    router.push('/');
  };

  const name = userProfile?.name;

  const signout = async () => {
    try {
      const revokeResponse = await fetch(
        `/api/oauth/revoke?token=${authToken}`,
        {
          method: 'POST',
        },
      );
      const data = await revokeResponse.json();
      setAuthToken([]);
    } catch (error) {
      console.log('this was the token error', error);
    }
  };

  const onMenuClick = async e => {
    if (e.detail.id === 'signout') {
      await signout();
      setUserProfile({});
      await router.push('/');
    }
  };

  return (
    <TopNavigation
      identity={{
        href: '/',
        title: 'Coin Auth',
        logo: {
          src: '../images/rose-interiors-logo.png',
          alt: 'rose-interiors-logo',
          onClick: handleLogoClick,
        },
      }}
      utilities={[
        {
          type: 'menu-dropdown',
          text: name ? userProfile?.name : '',
          iconName: 'user-profile',
          iconAlign: 'right',
          onItemClick: name ? onMenuClick : null,
          items: name ? [{ id: 'signout', text: 'Sign out' }] : [],
        },
      ]}
      i18nStrings={{
        searchIconAriaLabel: 'Search',
        searchDismissIconAriaLabel: 'Close search',
        overflowMenuTriggerText: 'More',
        overflowMenuTitleText: 'All',
        overflowMenuBackIconAriaLabel: 'Back',
        overflowMenuDismissIconAriaLabel: 'Close menu',
      }}
    />
  );
}
