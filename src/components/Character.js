import React, { useState, useEffect } from "react";

import Summary from "./Summary";

const Character = props => {
    const [loadedCharacter, setLoadedCharacter] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = () => {
        console.log(
            "Sending Http request for new character with id " +
                props.selectedChar
        );
        setIsLoading(true);
        fetch("https://swapi.co/api/people/" + props.selectedChar)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Could not fetch person!");
                }
                return response.json();
            })
            .then(charData => {
                const loadedCharacter = {
                    id: props.selectedChar,
                    name: charData.name,
                    height: charData.height,
                    colors: {
                        hair: charData.hair_color,
                        skin: charData.skin_color
                    },
                    gender: charData.gender,
                    movieCount: charData.films.length
                };
                setLoadedCharacter(loadedCharacter);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    };
    // shouldComponentUpdate(nextProps, nextState) {
    //   console.log('shouldComponentUpdate');
    //   return (
    //     nextProps.selectedChar !== this.props.selectedChar ||
    //     nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
    //     nextState.isLoading !== this.state.isLoading
    //   );
    // }

    // componentDidUpdate(prevProps) {
    //   console.log('Component did update');
    //   if (prevProps.selectedChar !== this.props.selectedChar) {
    //     this.fetchData();
    //   }
    // }
    //componentDidUpDate, set your dependencies to the variable that you want it to listen for, it will update that when it is changed
    useEffect(() => {
        fetchData();
        // this code will run right before useEffect runs the next time  (componentWillUnmount), a cleanup function
        return () => {
            console.log("cleaning up... unmount");
        };
    }, [props.selectedChar]);

    //dont send a redundent http request from useEffect twice
    // useEffect(() => {
    //     fetchData();
    // }, []);

    // componentWillUnmount() {
    //   console.log('Too soon...');
    // }
    useEffect(() => {
        return () => {
            console.log("component did unmount");
        };
    }, []);

    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter.id) {
        content = (
            <Summary
                name={loadedCharacter.name}
                gender={loadedCharacter.gender}
                height={loadedCharacter.height}
                hairColor={loadedCharacter.colors.hair}
                skinColor={loadedCharacter.colors.skin}
                movieCount={loadedCharacter.movieCount}
            />
        );
    } else if (!isLoading && !loadedCharacter.id) {
        content = <p>Failed to fetch character.</p>;
    }
    return content;
};

export default Character;
