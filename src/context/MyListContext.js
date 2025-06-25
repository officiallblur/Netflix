import React, { createContext, useContext, useState, useEffect } from 'react';

const MyListContext = createContext();

export const MyListProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);

  // Load list from localStorage on mount
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('myList')) || [];
    setMyList(storedList);
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  const addToList = (movie) => {
    if (!myList.find((item) => item.id === movie.id)) {
      setMyList((prev) => [...prev, movie]);
    }
  };

  const removeFromList = (movieId) => {
    setMyList((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isInList = (movieId) => {
    return myList.some((movie) => movie.id === movieId);
  };

  return (
    <MyListContext.Provider value={{ myList, addToList, removeFromList, isInList }}>
      {children}
    </MyListContext.Provider>
  );
};

export const useMyList = () => useContext(MyListContext);
