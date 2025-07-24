import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react'; // Import useEffect

interface SearchBarProps {
    getSearchItem(searchText: string, typesQueryString: string): void;
    initialSearchText?: string; // New prop for initial search text
}

const SearchBar: React.FC<SearchBarProps> = ({ getSearchItem, initialSearchText }) => {

    const [searchText, setSearchText] = useState<string>(initialSearchText || ""); // Initialize with prop or empty string
    const typesQueryString = "artist%2Calbum%2Ctrack%2Cplaylist";

    // Update internal searchText when initialSearchText prop changes
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