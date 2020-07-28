import { useState, useCallback, useRef, useEffect } from "react";
import BACKENDADDRESS from "../constants/BackendAddress";
import { useHistory } from "react-router-dom";

export const useAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const activeRequests = useRef([]);
  const error = useRef();
  const history = useHistory();

  // useCallback prevents API from being called multiple times when other components render
  const sendRequest = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-Type": "application/json" }
    ) => {
      setIsLoading(true);

      if (body) {
        body = JSON.stringify(body);
      }

      // create an abortController object which can be used to cancel request later on
      const httpAbortController = new AbortController();
      activeRequests.current.push(httpAbortController);
      try {
        const response = await fetch((url = BACKENDADDRESS + url), {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });
        const responseData = await response.json();

        // response.ok = response with status code of 200+ = no errors
        // By default responses with error status codes do not throw errors
        if (!response.ok || !responseData) {
          let err = new Error(responseData.message || response.statusText);
          err.status = responseData.status || response.status;
          throw err;
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        // 503 when cannot connect to server
        error.current = { message: err.message, status: err.status || 503 };
        if (400 <= err.status && err.status < 500) {
          history.replace("/error/400", error);
        } else history.replace("/error/500", error);
      }
    },
    [history]
  );

  useEffect(() => {
    // cancel API request if parent component unmounts eg when you change page
    return () => {
      activeRequests.current.forEach((request) => {
        request.abort();
      });
    };
  }, []);

  return [sendRequest, isLoading];
};
