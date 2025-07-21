import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

interface SearchBarProps {
    getSearchItem(searchText: string, typesQueryString: string): void
}

const SearchBar: React.FC<SearchBarProps> = ({ getSearchItem }) => {

    const [searchText, setSearchText] = useState<string>("");
    const typesQueryString = "artist%2Calbum%2Ctrack%2Cplaylist";

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        text = text.replaceAll(" ", "%20");
        console.log(text);
        setSearchText(text)
        if (text === "") {
            getSearchItem(text, "");
        }
    }

    const handleOnKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            getSearchItem(searchText, typesQueryString)
        };
    }
    
    return(
    <TextField 
        label="Search for artist, track, album..."
        sx={{
            width: "30%"
        }}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
    />
    )
}

export default SearchBar;