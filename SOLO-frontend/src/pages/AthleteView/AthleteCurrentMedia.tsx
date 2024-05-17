import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonButton, IonModal } from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import DynamicHeader from '../../components/AthleteView/DynamicHeader';  // Import the header component
import MediaSection from '../../components/AthleteView/MediaSection';
import TabBar2 from '../AthleteView/TabBar2';

const AthleteCurrentMedia: React.FC = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [currentMedia, setCurrentMedia] = useState([
    { id: '1', name: 'xxx.png', imageUrl: 'path_to_image_xxx.png' },
    { id: '2', name: 'yyy.png', imageUrl: 'path_to_image_yyy.png' }
  ]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList[0]) {
      const file = fileList[0];
      const imageUrl = URL.createObjectURL(file);
      setCurrentMedia(prevMedia => [
        ...prevMedia,
        { id: `id_${prevMedia.length + 1}`, name: file.name, imageUrl: imageUrl }
      ]);
      setShowModal(false);
    }
  };

  const takePhoto = async () => {
    try {

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera // Ensure you're specifying the camera as the source
      });

      console.log(image);

      if (image.webPath) {
        // handle image display or storage
      } else {
        console.error('No image path available');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
    setShowModal(false);
  };

  return (
    <IonPage>
      <DynamicHeader title="Your Media" />
      <IonContent>
        <MediaSection title="" mediaItems={currentMedia} onViewMore={() => console.log('View more current media')} />
        <IonButton onClick={() => setShowModal(true)}>Add Media</IonButton>
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <div style={{ padding: '20px' }}>
            <IonButton expand="block" onClick={() => document.getElementById('file-upload')?.click()}>Upload from Files</IonButton>
            <IonButton expand="block" onClick={takePhoto}>Take a Video/Photo</IonButton>
            <IonButton color="medium" expand="block" onClick={() => setShowModal(false)}>Cancel</IonButton>
          </div>
          <input
            id="file-upload"
            type="file"
            accept="image/*,video/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </IonModal>
      </IonContent>
      <TabBar2 />
    </IonPage>
  );
};

export default AthleteCurrentMedia;