// Import necessary hooks and functions from React
import { createContext, useState, useContext, useEffect } from "react";

// Create a context for managing movie-related state globally
const MovieContext = createContext();

/**
 * Custom hook to access the MovieContext.
 * This allows any component to use the movie context without importing useContext separately.
 */
export const useMovieContext = () => useContext(MovieContext);

/**
 * Provides movie-related state and functions to the entire application.
 * This component wraps around other components that need access to the movie context.
 * 
 * @param {ReactNode} children - The components that will have access to the movie context.
 */
export const MovieProvider = ({ children }) => {
    // State to store favorite movies
    const [favorites, setFavorites] = useState([]);

    /**
     * useEffect to load stored favorites from localStorage when the component mounts.
     * It ensures that favorite movies persist even after a page refresh.
     */
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");

        // If there are stored favorites, parse and set them to state
        if (storedFavs) setFavorites(JSON.parse(storedFavs));
    }, []); // Runs only once when the component mounts

    /**
     * useEffect to update localStorage whenever the 'favorites' state changes.
     * This keeps the localStorage synchronized with the latest favorite movies.
     */
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]); // Runs whenever 'favorites' state updates

    /**
     * Adds a movie to the favorites list.
     * @param {Object} movie - The movie object to add.
     */
    const addToFavorites = (movie) => {
        setFavorites((prev) => [...prev, movie]);
    };

    /**
     * Removes a movie from the favorites list.
     * @param {number} movieId - The ID of the movie to remove.
     */
    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
    };

    /**
     * Checks if a movie is in the favorites list.
     * @param {number} movieId - The ID of the movie to check.
     * @returns {boolean} - True if the movie is in favorites, false otherwise.
     */
    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId);
    };

    // Context value containing favorites state and related functions
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    };

    // Provide the movie context to child components
    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};