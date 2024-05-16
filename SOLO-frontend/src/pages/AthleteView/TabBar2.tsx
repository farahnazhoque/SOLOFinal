import React from 'react';
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, person, settings } from 'ionicons/icons';

const TabBar2: React.FC = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="athleteprofile" href="/athlete-view-account">
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab="athleteeditprofile" href="/athlete-edit-profile">
        <IonIcon icon={person} />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>

    </IonTabBar>
  );
};

export default TabBar2;
