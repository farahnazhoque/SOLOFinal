import React from 'react';
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, person } from 'ionicons/icons';
import './TabBar2.css'; // Import the CSS file

const TabBar2: React.FC = () => {
  return (
    <IonTabBar slot="bottom" className="custom-tab-bar">
      <IonTabButton tab="athleteprofile" href="/athlete-view-account">
        <IonIcon icon={home} className="tab-icon" />
        <IonLabel className="tab-label"></IonLabel>
      </IonTabButton>

      <IonTabButton tab="athleteeditprofile" href="/athlete-edit-profile">
        <IonIcon icon={person} className="tab-icon" />
        <IonLabel className="tab-label"></IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default TabBar2;


