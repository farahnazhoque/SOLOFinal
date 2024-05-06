import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader'; 
import { useHistory } from 'react-router-dom';
import { ApiService } from '../../../services/api.service';
import '../../components/AccountQuestion.css';

interface AccountQuestion1Props {
  onNextClick: () => void; // Define only the method type here
}


const AccountQuestion1: React.FC<AccountQuestion1Props> = ({
}) => {
  const history = useHistory(); // Use useHistory inside the component
  const [answer, setAnswer] = useState('');

  const onBackClick = () => {
    history.push('/home'); // Navigation function
  }

  
  const onNextClick = async () => {
    // Use ApiService to send 'answer' to your backend
    console.log("testing")
    try {
      
      const response = await ApiService.createAffiliate(answer); // Assuming 'saveName' is a method in your ApiService
      console.log('Name saved:', response.data);
      history.push('/account-question-2');
    } catch (error) {
      console.error('Failed to save name:', error);
    }
  };

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <div className="step-info">Step 1 of 4</div>
          <div className="question">What is your name?</div>
          <input
            type="text"
            placeholder="Enter your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="answer-input"
          />

        </div>
      </IonContent>
      <div className="navigation-buttons">
            <button onClick={onBackClick} className="back-button">BACK</button>
            <button 
              onClick={onNextClick} 
              className="next-button"
              disabled={!answer} // Disable button if answer is empty
            > 
              NEXT
            </button>
          </div>
    </IonPage>
  );
}

export default AccountQuestion1;
