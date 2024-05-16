import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import DynamicHeader from '../../components/AthleteView/DynamicHeader';  // Import the header component
import MediaSection from '../../components/AthleteView/MediaSection';
import TabBar2 from '../AthleteView/TabBar2';

const AthletePastMedia: React.FC = () => {
    const history = useHistory(); // Use useHistory inside the component
    const [name, setName] = useState(''); // Renamed state variable
  
    const onBackClick = () => {
      history.push('/home'); // Navigation function
    };
    const onNextClick = () => {
      history.push('/account-question-2'); // Assuming route needs update
    };



    const pastMedia = [
      { id: '1', name: 'xxx.png', imageUrl: 'path_to_image_xxx.png' },
      { id: '2', name: 'yyy.png', imageUrl: 'path_to_image_yyy.png' }
    ];
  
  
    return (
        <IonPage>
            <DynamicHeader title="Past Media" />
            <IonContent>
            <MediaSection title="" mediaItems={pastMedia} onViewMore={() => console.log('View more past media')} />
            </IonContent>

            <TabBar2 />
        </IonPage>
    );
  };
  
  export default AthletePastMedia;