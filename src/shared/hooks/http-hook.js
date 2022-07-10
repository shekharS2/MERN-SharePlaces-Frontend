import { useCallback, useEffect, useRef, useState } from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();    

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
        async (
            url, 
            method='GET',
            body=null,
            headers={}
        ) => {
            setIsLoading(true);

            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);
                
            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal
                });
        
                const responseData = await response.json();

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    reqCtrl => reqCtrl !== httpAbortCtrl
                );


                if(!response.ok) { // ok : 2xx error code, !ok : 4xx or 5xx error code
                    throw new Error(responseData.message);
                }

                setIsLoading(false);
                return responseData;
            } catch (err) {
                // If condition removes error due to strict-mode
                if(err.message !== 'The user aborted a request.'){
                    setError(err.message);
                    setIsLoading(false);
                    throw err;
                }
            }
    }, []);

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {

        return () => { // useEffect clean up function
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
        clearError
    };
};