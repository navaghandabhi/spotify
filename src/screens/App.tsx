import React, { useEffect, useState } from 'react';
import {
  View,
} from 'react-native';
import MusicPlayer from '../Data/Components/MusicPlayer';
import { myMusicList } from '../Data/Constants/myMusicList';
import { useTheme } from 'react-native-paper';
import { setUpPlayer } from '../Data/Services/PlayBackService';


function App(): React.JSX.Element {
  const { colors } = useTheme();
  // useEffect(() => {
  //   setUpPlayer();
  // }, [])
  return (
    <View style={{ backgroundColor: colors.background }}>
      <MusicPlayer track={myMusicList[2]}></MusicPlayer>
    </View>
  );

}


export default App;
