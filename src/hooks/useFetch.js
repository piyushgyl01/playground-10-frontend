import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useCallback } from "react";

export const useFetch = (selector, actionCreator, sliceName) => {
  const dispatch = useDispatch();
  const data = useSelector(selector);
  const status = useSelector((state) => state[sliceName].status);
  const error = useSelector((state) => state[sliceName].error);
  const actionCreatorRef = useRef(actionCreator);

  const dispatchAction = useCallback(() => {
    dispatch(actionCreatorRef.current());
  }, [dispatch]);

  useEffect(() => {
    actionCreatorRef.current = actionCreator;
  }, [actionCreator]);

  useEffect(() => {
    if (status === "idle") {
      dispatchAction();
    }
  }, [status, dispatchAction]);

  return { data, status, error };
};