import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Voice from 'react-native-voice';

const VoiceRecorderComponent = ({ setSearchText }) => {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = async () => {
    try {
      if (!isRecording) {
        await Voice.start('en-US');
      } else {
        await Voice.stop();
      }
      setIsRecording(!isRecording);
    } catch (e) {
      console.error(e);
    }
  };

  Voice.onSpeechResults = (event) => {
    setSearchText(event.value[0]); // Set the search text to the recognized speech
  };

  return (
    <View style={{ margin: 10 }}>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={toggleRecording}
      />
    </View>
  );
};

export default VoiceRecorderComponent;
