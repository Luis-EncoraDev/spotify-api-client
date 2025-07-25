import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';

interface SearchBarProps {
    getSearchItem(searchText: string, typesQueryString: string): void;
    initialSearchText?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ getSearchItem, initialSearchText }) => {

    const [searchText, setSearchText] = useState<string>(initialSearchText || "");
    const typesQueryString = "artist%2Calbum%2Ctrack%2Cplaylist";

    useEffect(() => {
        if (initialSearchText !== undefined) {
            setSearchText(initialSearchText);
        }
    }, [initialSearchText]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        setSearchText(text);
        if (text === "") {
            getSearchItem(text, "");
        }
    }

    const handleOnKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            getSearchItem(searchText, typesQueryString);
        };
    }

    return (
        <TextField
            label="Search for artist, track, album..."
            sx={{
                width: "30%"
            }}
            value={searchText}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
        />
    )
}

export default SearchBar;