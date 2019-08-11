import { useState, useEffect } from "react";

const useHttp = (url, dependencies) => {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setData] = useState(null);
    useEffect(() => {
        setIsLoading(true);
        console.log("sending http request" + url);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch.");
                }
                return response.json();
            })
            .then(data => {
                setIsLoading(false);
                setData(data);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, dependencies);
    return [isLoading, fetchedData];
};
export default useHttp;
