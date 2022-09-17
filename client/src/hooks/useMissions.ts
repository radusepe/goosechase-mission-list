import { useEffect, useState, useCallback } from "react";

type UseMissionsAPI = {
  isSortedByName: boolean;
  onChangeSortByName: () => void;
  missions: Mission[];
};

export const useMissions = (): UseMissionsAPI => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isSortedByName, setIsSortedByName] =
    useState<boolean>(getPersistedSort);

  const onChangeSortByName = () => {
    setIsSortedByName((value) => !value);
  };

  useEffect(() => {
    window.localStorage.getItem("sortedByName");
    const persistedSortedByName = window.localStorage.getItem("sortedByName");
    console.log({ persistedSortedByName });
    setIsSortedByName(persistedSortedByName !== null);
  }, []);

  useEffect(() => {
    setPersistedSort(isSortedByName);
  }, [isSortedByName]);

  useEffect(() => {
    const fetchMissionsBasedOnState = async () => {
      const data = await fetchMissions({
        sort: isSortedByName ? "name" : undefined,
      });
      setMissions(data);
    };
    fetchMissionsBasedOnState();
  }, [isSortedByName]);

  return {
    missions,
    isSortedByName,
    onChangeSortByName,
  };
};

const url = "http://localhost:3001/api/missions";

type QueryParams = {
  sort: "name" | undefined;
};
const fetchMissions = async (params: QueryParams): Promise<Mission[]> => {
  const response = await fetch(url + buildParams(params), {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

  const data = await response.json();

  return data;
};

const buildParams = ({ sort }: QueryParams): string => {
  let paramArray = [];
  if (sort) {
    paramArray.push(`sort=${sort}`);
  }

  if (paramArray.length > 0) {
    return "?" + paramArray.join("&");
  }
  return "";
};

// persistence
const SORT_KEY = "sortedByName";
const getPersistedSort = (): boolean => {
  window.localStorage.getItem(SORT_KEY);
  const persistedSortedByName = window.localStorage.getItem("sortedByName");
  console.log({ persistedSortedByName });
  return persistedSortedByName !== null;
};
const setPersistedSort = (isSortedByName: boolean) => {
  if (isSortedByName) {
    window.localStorage.setItem(SORT_KEY, "true");
  } else {
    window.localStorage.removeItem(SORT_KEY);
  }
};
