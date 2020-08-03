import { useState, useCallback, useRef, useEffect } from "react";
import { BACKEND_ADDRESS } from "../constants/Details";
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
      isFormData = false,
      headers = { "Content-Type": "application/json" }
    ) => {
      setIsLoading(true);

      if (body && !isFormData) {
        body = JSON.stringify(body);
      }

      // create an abortController object which can be used to cancel request later on
      const httpAbortController = new AbortController();
      activeRequests.current.push(httpAbortController);
      try {
        let response;
        if (!isFormData) {
          response = await fetch((url = BACKEND_ADDRESS + url), {
            method,
            body,
            headers,
            signal: httpAbortController.signal,
          });
        } else {
          // cannot send header for formData or it wont work
          response = await fetch((url = BACKEND_ADDRESS + url), {
            method,
            body,
            signal: httpAbortController.signal,
          });
        }

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
    // cancel API request if parent component unmounts when you change page
    return () => {
      activeRequests.current.forEach((request) => {
        request.abort();
      });
    };
  }, []);

  return [sendRequest, isLoading];
};
