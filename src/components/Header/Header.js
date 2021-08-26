import { createTheme, MenuItem, TextField, ThemeProvider } from '@material-ui/core';
import React from 'react'
import './Header.css';
import categories from '../../data/category';

export const Header = ({setCategory, category, setWord, word}) => {

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            },
            type: 'dark'
        },
    });

    const handleChange = (language) => {
        setCategory(language);
        setWord('');
    };

    return (
        <div className='header'>
            <span className='title'>{word?word:"Word Hunt"}</span>
            <div className='inputs'>
                <ThemeProvider theme={darkTheme}>
                    <TextField 
                        className="search"
                        id="standard-basic" 
                        label="Search a Word"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                    />
                    <TextField
                        className='select'
                        id='standard-select-currency'
                        select
                        label="Language"
                        value={category}
                        onChange={(e) => handleChange(e.target.value)}
                    >
                        {
                            categories.map((option) =>(
                                <MenuItem
                                    key={option.label}
                                    value={option.label}
                                >
                                    {option.value}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default Header;