import { Container, withStyles, Switch } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import transitions from '@material-ui/core/styles/transitions';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Definition } from './components/Definition/Definition';
import Header from './components/Header/Header';


function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState('en')
  const [changeTheme, setChangeTheme] = useState(false)

  const ChangeTheme = withStyles({
    switchBase: {
      color: grey[300],
      "&$checked": {
        color: grey[500]
      },
      "&$checked": {
        backgroundColor: grey[500]
      }
    },
    checked: {},
    track: {}
  })(Switch);

  const dictionaryAPI = async() => {
    try {
      const {data} = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`);
      
      setMeanings(data);

    } catch (err) {
      console.log(err);
    }
  };
  
  console.log(meanings);
  useEffect(() => {
    dictionaryAPI();
    return () => {
      
    }
  }, [word, category]);


  return (
    <div 
      className="App" 
      style={
        {
          height: '100vh', 
          backgroundColor: changeTheme ? '#fff' : '#282c34', 
          color: changeTheme ? 'black' : 'white',
          transition: 'all 0.5s linear'
        }
      }
    >
      <Container 
        maxWidth="md" 
        style={
          {
            display:'flex', 
            flexDirection:'column', 
            height:'100vh',
            justifyContent: 'space-evenly'
          }
        }
      >
        <div style={{position: 'absolute', top: 0, right: 15, paddingTop: 10}}>
          <span> {changeTheme?'Dark':'Light'} Mode</span>
          <ChangeTheme checked={changeTheme} onChange={() => setChangeTheme(!changeTheme)} />
        </div>
        <Header 
          category={category} 
          setCategory={setCategory} 
          word={word}
          setWord={setWord}
          setMeanings={setMeanings}
          changeTheme={changeTheme}
        />
        
        {meanings && (<Definition meanings={meanings} word={word} category={category} changeTheme={changeTheme}/>)}
      </Container>
    </div>
  );
}

export default App;
