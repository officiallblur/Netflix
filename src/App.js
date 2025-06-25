import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Row from './components/Row';
import requests from './requests';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedies" fetchUrl={requests.fetchComedyMovies} />
    </div>
  );
}

export default App;
