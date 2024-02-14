import React from 'react';
import {
  Dimensions,
  View,
} from 'react-native';
import MusicPlayer from '../Data/Components/MusicPlayer';
import { myMusicList } from '../Data/Constants/myMusicList';
import { useTheme } from 'react-native-paper';


function App(): React.JSX.Element {
  const { colors } = useTheme();
  const size = Dimensions.get('window');
  return (
      <View style={{ backgroundColor: colors.background }}>
        <MusicPlayer track={myMusicList[2]}></MusicPlayer>
      </View>
  );
}


export default App;
