import * as React from 'react';
import { useContext, useEffect } from 'react';
import { ProfileContext } from '../context/profileContext';
import { AssetContext } from '../context/assetContext';
import { HelpPanel, ColumnLayout } from '@cloudscape-design/components';

function Profile(props) {
  const {
    userProfile,
    profileLoading: profileLoaded,
    getProfile,
  } = useContext(ProfileContext);

  const token = props.token;
  //   const profileValues = userProfile.length > 0;
  useEffect(() => {
    if (Object.keys(userProfile).length === 0) {
      getProfile(token);
    }
  }, []);

  return (
    <>
      <HelpPanel
        loading={profileLoaded}
        loadingText="Loading your profile..."
        header={<h3>Profile Info</h3>}
      >
        <ColumnLayout variant="text-grid" borders="horizontal" columns={2}>
          <h4>Name:</h4>
          {userProfile?.name}

          <h4>User Type:</h4>

          {userProfile?.user_type}

          <h4>Native Currency:</h4>
          {userProfile?.native_currency}
        </ColumnLayout>
      </HelpPanel>
    </>
  );
}

export default Profile;
