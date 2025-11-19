import React, { useState, useEffect } from 'react';

const Pokemon = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [selectedPokemonUrl, setSelectedPokemonUrl] = useState(null);
    const [pokemonDetails, setPokemonDetails] = useState(null);

    // Función para hacer la llamada a la API para obtener la lista de Pokémon
    const fetchPokemons = (url) => {
        setLoading(true);
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la API');
                }
                return response.json();
            })
            .then((data) => {
                setData(data.results); // Los Pokémon están dentro de la propiedad 'results'
                setNextPage(data.next); // URL para la siguiente página de resultados
                setPreviousPage(data.previous); // URL para la página anterior
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    // Función para hacer la llamada a la API para obtener detalles del Pokémon
    const fetchPokemonDetails = (url) => {
        setLoading(true); // Mientras cargamos los detalles
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los detalles del Pokémon');
                }
                return response.json();
            })
            .then((data) => {
                setPokemonDetails(data); // Guardamos los detalles del Pokémon
                setLoading(false); // Dejamos de estar en estado de carga
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    // Llamada inicial a la API de Pokémon
    useEffect(() => {
        fetchPokemons('https://pokeapi.co/api/v2/pokemon/');
    }, []);

    // Funciones para la paginación
    const handleNextPage = () => {
        if (nextPage) {
            fetchPokemons(nextPage); // Llamamos a la siguiente página
        }
    };

    const handlePreviousPage = () => {
        if (previousPage) {
            fetchPokemons(previousPage); // Llamamos a la página anterior
        }
    };

    // Manejar el clic en un Pokémon
    const handlePokemonClick = (url) => {
        setSelectedPokemonUrl(url); // Guardamos la URL del Pokémon
        fetchPokemonDetails(url); // Llamamos a la función para obtener los detalles del Pokémon
    };

    // Estilos
    const styles = {
        container: {
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            with: '1000px'
        },
        columnLeft: {
            flex: 1,
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            marginRight: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        columnRight: {
            flex: 1,
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        pokemonList: {
            listStyle: 'none',
            padding: 0,
            maxHeight: '400px',
            overflowY: 'auto'
        },
        pokemonItem: {
            padding: '10px',
            margin: '5px 0',
            backgroundColor: '#f8f9fa',
            borderRadius: '5px',
            border: '1px solid #e9ecef'
        },
        pokemonLink: {
            textDecoration: 'none',
            color: '#007bff',
            fontWeight: 'bold',
            cursor: 'pointer',
            textTransform: 'capitalize'
        },
        pagination: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px'
        },
        paginationButton: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        },
        detailBox: {
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            border: '1px solid #e9ecef'
        },
        imageContainer: {
            textAlign: 'center',
            margin: '20px 0'
        },
        pokemonImage: {
            width: '200px',
            height: '200px',
            objectFit: 'contain'
        },
        horizontalScroll: {
            display: 'flex',
            listStyle: 'none',
            padding: 0,
            overflowX: 'auto',
            gap: '10px'
        },
        scrollItem: {
            backgroundColor: '#007bff',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '15px',
            fontSize: '14px',
            textTransform: 'capitalize'
        },
        abilitiesList: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            listStyle: 'none',
            padding: 0
        },
        abilityItem: {
            backgroundColor: '#28a745',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '15px',
            fontSize: '14px',
            textTransform: 'capitalize'
        },
        spriteGallery: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '20px'
        },
        spriteItem: {
            textAlign: 'center',
            border: '1px solid #ddd',
            padding: '10px',
            borderRadius: '5px'
        },
        spriteImage: {
            width: '80px',
            height: '80px',
            objectFit: 'contain'
        }
    };

    if (loading && !data) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Cargando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.columnLeft}>
                <h2>Lista de Pokémon</h2>
                <ul style={styles.pokemonList}>
                    {data && data.map((pokemon) => (
                        <li key={pokemon.name} style={styles.pokemonItem}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePokemonClick(pokemon.url);
                                }}
                                style={styles.pokemonLink}
                            >
                                {pokemon.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Paginación */}
                <div style={styles.pagination}>
                    <button
                        onClick={handlePreviousPage}
                        disabled={!previousPage}
                        style={{
                            ...styles.paginationButton,
                            backgroundColor: !previousPage ? '#6c757d' : '#007bff'
                        }}
                    >
                        Anterior
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={!nextPage}
                        style={{
                            ...styles.paginationButton,
                            backgroundColor: !nextPage ? '#6c757d' : '#007bff'
                        }}
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            <div style={styles.columnRight}>
                {/* Mostrar la información del Pokémon seleccionado */}
                {pokemonDetails && (
                    <div style={styles.detailBox}>
                        <h3 style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                            {pokemonDetails.name}
                        </h3>

                        {/* Imagen principal del Pokémon */}
                        {pokemonDetails.sprites?.other?.dream_world?.front_default && (
                            <div style={styles.imageContainer}>
                                <img
                                    src={pokemonDetails.sprites.other.dream_world.front_default}
                                    alt={pokemonDetails.name}
                                    style={styles.pokemonImage}
                                />
                            </div>
                        )}

                        <p><strong>Altura:</strong> {pokemonDetails.height * 10} cm</p>
                        <p><strong>Peso:</strong> {pokemonDetails.weight / 10} kg</p>

                        <h4>Tipos:</h4>
                        <ul style={styles.horizontalScroll}>
                            {pokemonDetails.types.map((typeInfo) => (
                                <li key={typeInfo.type.name} style={styles.scrollItem}>
                                    {typeInfo.type.name}
                                </li>
                            ))}
                        </ul>

                        <h4>Habilidades:</h4>
                        <ul style={styles.abilitiesList}>
                            {pokemonDetails.abilities.map((abilityInfo) => (
                                <li key={abilityInfo.ability.name} style={styles.abilityItem}>
                                    {abilityInfo.ability.name}
                                </li>
                            ))}
                        </ul>

                        {/* Galería de sprites */}
                        <h4>Sprites:</h4>
                        <div style={styles.spriteGallery}>
                            {pokemonDetails.sprites?.front_default && (
                                <div style={styles.spriteItem}>
                                    <img
                                        src={pokemonDetails.sprites.front_default}
                                        alt="Front Default"
                                        style={styles.spriteImage}
                                    />
                                    <p>Front</p>
                                </div>
                            )}
                            {pokemonDetails.sprites?.back_default && (
                                <div style={styles.spriteItem}>
                                    <img
                                        src={pokemonDetails.sprites.back_default}
                                        alt="Back Default"
                                        style={styles.spriteImage}
                                    />
                                    <p>Back</p>
                                </div>
                            )}
                            {pokemonDetails.sprites?.front_shiny && (
                                <div style={styles.spriteItem}>
                                    <img
                                        src={pokemonDetails.sprites.front_shiny}
                                        alt="Front Shiny"
                                        style={styles.spriteImage}
                                    />
                                    <p>Shiny Front</p>
                                </div>
                            )}
                        </div>

                        <h4>Estadísticas:</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {pokemonDetails.stats.map((statInfo) => (
                                <li key={statInfo.stat.name} style={{ margin: '5px 0' }}>
                                    <strong>{statInfo.stat.name}:</strong> {statInfo.base_stat}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {!pokemonDetails && (
                    <div style={styles.detailBox}>
                        <p>Selecciona un Pokémon para ver sus detalles</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pokemon;