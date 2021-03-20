import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Header, Input, List, Text, Image, Button, Weather } from './components';


export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [keyword, setKeyword] = useState("")
    const [error, setError] = useState();
    const results = !keyword
        ? countries
        : countries.filter(country => country.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
    
    useEffect(() => {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => setError(error.message));
    }, []);

    let display
    if (results.length === 1) {
        const country = results[0]
        display = (
            <>
                <Header grade="1">{country.name}</Header>
                <Text>capital {country.capital} </Text>
                <Text>populations {country.population}</Text>
                <Image src={country.flag} alt={country.name} width="200"/>

                <Weather city={country.capital}/>
            </>
        )
    } else {
        if (error) {
            display = <Text>{error}</Text>
        } else if (results.length > 10 && keyword.length > 0) {
            display = <Text>Too many matches, specify another filter</Text>
        } else {
            display = (
                <List>
                    { results.map((country) => {
                        return <List.Item
                            key={country.numericCode}>
                            {country.name}
                            <Button onClick={() => setKeyword(country.name)}>show</Button>
                        </List.Item>
                    })}
                </List>
            )
        }
    }

    return (
        <>  
            <Input label="find countries" value={keyword} onTextChange={setKeyword} />
            {display}
        </>
    );
}
