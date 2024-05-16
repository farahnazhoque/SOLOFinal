import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import DynamicHeader from '../../components/AthleteView/DynamicHeader';  // Import the header component
import MediaSection from '../../components/AthleteView/MediaSection';
import { useHistory } from 'react-router-dom';
import TabBar2 from '../AthleteView/TabBar2';

interface AthleteViewProps {
    onNextClick: () => void; // Define only the method type here
}

const AthleteViewMedia: React.FC = (AthleteViewProps) => {
    const history = useHistory(); // Use useHistory inside the component
    const [name, setName] = useState(''); // Renamed state variable
  
    const onBackClick = () => {
      history.push('/athlete-view-account'); // Navigation function
    };
    const onNextClick = () => {
      history.push('/account-question-2'); // Assuming route needs update
    };
  
    const CurrentViewMoreClick = () => {
      history.push('/athlete-current-media'); 
    };

    const PastViewMoreClick = () => {
      history.push('/athlete-past-media'); 
    };

    const currentMedia = [
      { id: '1', name: 'xxx.png', imageUrl: 'path_to_image_xxx.png' },
      { id: '2', name: 'yyy.png', imageUrl: 'path_to_image_yyy.png' }
    ];
  
    const pastMedia = [
      { id: '1', name: 'xxx.png', imageUrl: 'path_to_image_xxx.png' },
      { id: '2', name: 'yyy.png', imageUrl: 'path_to_image_yyy.png' }
    ];
  
    return (
      <IonPage>
        <DynamicHeader title="My Media" />
        <IonContent>
          <MediaSection title="Current Media" mediaItems={currentMedia} onViewMore={CurrentViewMoreClick} />
          <MediaSection title="Past Media" mediaItems={pastMedia} onViewMore={PastViewMoreClick} />
        </IonContent>

          <TabBar2 />
      </IonPage>
    );
  };
  
  export default AthleteViewMedia;