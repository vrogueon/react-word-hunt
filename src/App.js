import { Container } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Definition } from './components/Definition/Definition';
import Header from './components/Header/Header';

function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState('en')

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
          backgroundColor:'#282c34', 
          color:'white'
        }
      }
    >
      <Container 
        maxWidth="md" 
        style={
          {
            display:'flex', 
            flexDirection:'column', 
            height:'100vh'
          }
        }
      >
        <Header 
          category={category} 
          setCategory={setCategory} 
          word={word}
          setWord={setWord}
          setMeanings={setMeanings}
        />
        
        {meanings && (<Definition meanings={meanings} word={word} category={category}/>)}
      </Container>
    </div>
  );
}

export default App;
