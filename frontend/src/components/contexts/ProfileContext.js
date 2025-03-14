import React, { createContext, useState } from 'react';

const ProfileContext = createContext();

function ProfileProvider({ children }) {
    const [username, setUsername] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    return (
        <ProfileContext.Provider value={{ username, phonenumber, address, city, country, setUsername, setPhonenumber, setAddress, setCity, setCountry }}>
            {children}
        </ProfileContext.Provider>
    );
};

export { ProfileContext, ProfileProvider }