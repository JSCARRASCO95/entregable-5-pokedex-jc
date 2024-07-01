import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/pokedex/PokeCard';
import PokeSelect from '../components/pokedex/PokeSelect';
import Pagination from '../components/pagination/Pagination';
import "./styles/pokedex.css";

const Pokedex = () => {

  const [inputValue, setInputValue] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(12); 
  const trainer = useSelector((store) => store.trainer);
  const [typeFilter, setTypeFilter] = useState('');

  const [pokemons, getPokemons, getType] = useFetch();

    
  useEffect (() => {
    if (typeFilter) {
      getType(typeFilter);
    } else {
      const url = "https://pokeapi.co/api/v2/pokemon/?limit=1400";
    getPokemons(url);
    }
    
  }, [typeFilter]);

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.trim().toLowerCase());
    textInput.current.value = "";
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setPage(1);
  } 
  
    const cbFilter = (poke) => {
    return poke.name.includes(inputValue);
  }

  const [page, setPage] = useState(1);
  const quantity = itemsPerPage;
  const filteredPokemons = pokemons?.results?.filter(cbFilter) || [];
  const total = Math.ceil(filteredPokemons.length / quantity);

  const paginatedPokemons = () => {
    const end = quantity * page;
    const start = end - quantity;
    return filteredPokemons.slice(start, end);
  }
  
  return (
    <div className='pokedex'>
        <h3 className='pokedex__wave'><span>Welcome {trainer}, </span>Here you could find your favorite pokemon, let's go!</h3>
        <div className='pokedex__filters'>
        <div className='pokedex__items-per-page'>
            <label htmlFor='itemsPerPage' className='pokedex__label'>Items:</label>
            <input 
              type='number' 
              id='itemsPerPage' 
              value={itemsPerPage} 
              onChange={handleItemsPerPageChange} 
              className='pokedex__input-number' 
              min={1} 
            />
          </div>
            <form onSubmit={handleSubmit}>
              <input ref={textInput} type="text" />
              <button>Search</button>
            </form>
            <PokeSelect
              setTypeFilter={setTypeFilter}            
            />
        </div>
        <div className='pokedex__container'>
          {
            paginatedPokemons().map((poke) => (
              <PokeCard
                key={poke.url}
                url={poke.url}
              />
            ))
          }
        </div>
        <Pagination
        page={page}
        setPage={setPage}
        total={total}
      />        
    </div>
  )
}

export default Pokedex;
