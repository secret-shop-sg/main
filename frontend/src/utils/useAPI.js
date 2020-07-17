import {useState,useCallback,useRef,useEffect} from 'react';
import BACKENDADDRESS from "../constants/BackendAddress";

export const useAPI = () => {
    const [isLoading, setIsLoading] = useState(false);
    const activeRequests = useRef([]);

    // useCallback prevents API from being called multiple times when other components render
    const sendRequest = useCallback(
        async (url, method = "GET", body = null, headers ={}) => {
            setIsLoading(true);
            
            // create an abortController object which can be used to cancel request later on
            const httpAbortController = new AbortController();
            activeRequests.current.push(httpAbortController);

            try{
                const response = await fetch(
                    url=BACKENDADDRESS+url, {
                    method,
                    body,
                    headers,
                    signal:httpAbortController.signal
                    }
                );
                const responseData = await response.json();

                // response.ok = response with status code of 200+ = no errors
                // By default responses with error status codes do not throw errors
                if (!response.ok){
                    throw new Error(responseData.message)
                }
                setIsLoading(false);
                return responseData;
                
            }
            catch(err){
                alert(err.message);
            }
    }, [])

    useEffect(()=>{
        // cancel API request if parent component unmounts eg when you change page
        return () => {
            activeRequests.current.forEach(request => {request.abort()});
        };
    },[])

    return [sendRequest,isLoading];
}
