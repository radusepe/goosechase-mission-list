import { useEffect, useState } from "react";

type UseMissionsAPI = {
  isSortedByName: boolean;
  onChangeSortByName: () => void;
  missions: Mission[];
  filters: MissionType[];
  onChangeFilter: (filter: MissionType) => void;
};

export const useMissions = (): UseMissionsAPI => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isSortedByName, setIsSortedByName] =
    useState<boolean>(getPersistedSort);
  const [filters, setFilters] = useState<MissionType[]>(getPersistedFilter);

  const onChangeSortByName = () => {
    setIsSortedByName((value) => !value);
  };

  const onChangeFilter = (type: MissionType) => {
    if (!filters.includes(type)) {
      setFilters((filters) => [...filters, type]);
    } else {
      setFilters((filters) => filters.filter((_type) => _type !== type));
    }
  };

  useEffect(() => {
    setPersistedSort(isSortedByName);
    setPersistedFilters(filters);
  }, [isSortedByName, filters]);

  useEffect(() => {
    const fetchMissionsBasedOnState = async () => {
      const data = await fetchMissions({
        sort: isSortedByName ? "name" : undefined,
        filters,
      });
      setMissions(data);
    };
    fetchMissionsBasedOnState();
  }, [isSortedByName, filters]);

  return {
    missions,
    isSortedByName,
    onChangeSortByName,
    filters,
    onChangeFilter,
  };
};

const url = "http://localhost:3001/api/missions";

type QueryParams = {
  sort: "name" | undefined;
  filters: MissionType[];
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

const buildParams = ({ sort, filters }: QueryParams): string => {
  let paramArray = [];
  if (sort) {
    paramArray.push(`sort=${sort}`);
  }
  if (filters.length > 0) {
    paramArray.push(`filter=${JSON.stringify(filters)}`);
  }

  if (paramArray.length > 0) {
    return "?" + paramArray.join("&");
  }
  return "";
};

// persistence
const SORT_KEY = "sortedByName";
const getPersistedSort = (): boolean => {
  const persistedSortedByName = window.localStorage.getItem(SORT_KEY);
  return persistedSortedByName !== null;
};
const setPersistedSort = (isSortedByName: boolean) => {
  if (isSortedByName) {
    window.localStorage.setItem(SORT_KEY, "true");
  } else {
    window.localStorage.removeItem(SORT_KEY);
  }
};

const FILTER_KEY = "filter";
const getPersistedFilter = (): MissionType[] => {
  const persistedFilters = window.localStorage.getItem(FILTER_KEY);
  if (persistedFilters === null) return [];
  return JSON.parse(persistedFilters);
};
const setPersistedFilters = (filters: MissionType[]) => {
  window.localStorage.setItem(FILTER_KEY, JSON.stringify(filters));
};
