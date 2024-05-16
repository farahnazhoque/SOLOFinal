import React from 'react';
import {
  IonIcon, IonLabel, IonTabBar, IonTabButton, IonRouterOutlet, IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, person, personAdd } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import CoachHomeView from './CoachHome';
import ProfileView from './ProfileView';
import AddAthleteView from './AddAthleteView';

const TabBar: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/coach-home" component={CoachHomeView} />
          <Route exact path="/profile-view" component={ProfileView} />
          <Route exact path="/add-athlete-view" component={AddAthleteView} />
          <Redirect exact from="/" to="/coach-home" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="coach-home" href="/coach-home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile-view">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
          <IonTabButton tab="add-athlete-view" href="/add-athlete-view">
            <IonIcon icon={personAdd} />
            <IonLabel>Add Athlete</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default TabBar;
