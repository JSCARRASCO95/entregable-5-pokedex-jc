import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import "./styles/pokeInfo.css"

const PokeInfo = () => {

  const [pokemon, getPokemon] = useFetch();

  const { id } = useParams();
 
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  useEffect(() => {
    getPokemon(url);
  }, []);

  return (
    <section className='pokeinfo'>
      <div className='pokeinfo__return'>
      </div>
      <div className="pokeinfo__container-img">
        <figure className='pokeinfo__img'>
          <img className='pokeinfo__img' src={pokemon?.sprites.other['official-artwork'].front_default} alt={pokemon?.name}/>
        </figure>
        <div className={`pokeinfo__bg ${pokemon?.types[0].type.name}-info`}></div>
      </div>
      <div className="pokeinfo__data">
        <h2 className='pokeinfo__name'>{pokemon?.name}</h2>
        <h2 className='pokeinfo__id'>#{pokemon?.id}</h2>
      </div>
      <ul className="pokeinfo__details">
        <li className='pokeinfo__weight'>
          <span className="pokeinfo__spantxt">Weight</span>
          <br />
          <span className="pokeinfo__spanvalue">{pokemon?.weight / 10} kg</span>
        </li>
        <li className='pokeinfo__weight'>
          <span className="pokeinfo__spantxt">Height</span>
          <br />
          <span className="pokeinfo__spanvalue">{pokemon?.height / 10} m</span>
        </li>
      </ul>
      <div className="pokeinfo__type-skills">
        <div className="pokeinfo__types">
          <h3 className="pokeinfo__type-title">Type</h3>
          {
            pokemon?.types.map((type) => (
              <div key={type.type.name} className={`pokeinfo__type ${type.type.name}-info`}>{type.type.name}</div>
            ))
          }
        </div>
        <div className="pokeinfo__skills">
          <h3 className="pokeinfo__skill-title">Native Skills</h3>
          {
            pokemon?.abilities.map((skill) => (
              <div key={skill.slot} className="pokeinfo__skill">{skill.ability.name}</div>
            ))
          }
        </div>
      </div>
      <div className="pokeinfo__box">
        <h2 className='pokeinfo__h2'>STATS</h2>
        <ul  className='pokeinfo__stats'>
          {
            pokemon?.stats.map((stat) => (

                <li key={`${stat.stat.url}`} className='pokeinfo__stats-item'>
                  <span >{stat.stat.name}</span>
                  <span >{stat.base_stat} / 250</span>
                  <div className='pokeinfo__outbar' >
                    <div className='pokeinfo__inbar' style={{width: `${stat.base_stat / 2.5}%`}} ></div>
                  </div>
                </li>

            ))
          }
        </ul>
      </div>
      <div className="pokeinfo__moves">
        <h3 className="pokeinfo__type-title">Moves</h3>
        {
          pokemon?.moves.map((move) => (
            <div key={move.move.name} className="pokeinfo__move">{move.move.name}</div>
          ))
        }
      </div>
    </section>
  )
}

export default PokeInfo;
