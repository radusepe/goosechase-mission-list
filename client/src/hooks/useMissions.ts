import { useEffect, useState } from "react";

type UseMissionsAPI = {
  isSortedByName: boolean;
  onChangeSortByName: () => void;
  missions: Mission[];
  filters: MissionType[];
  onChangeFilter: (filter: MissionType) => void;
  onNext: () => void;
  onPrev: () => void;
};

const PAGE_SIZE = 5;

export const useMissions = (): UseMissionsAPI => {
  // State
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isSortedByName, setIsSortedByName] =
    useState<boolean>(getPersistedSort);
  const [filters, setFilters] = useState<MissionType[]>(getPersistedFilter);
  const [offset, setOffset] = useState<number>(0);

  // Handlers
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

  const onNext = () => {
    setOffset((offset) => offset + PAGE_SIZE);
  };

  const onPrev = () => {
    setOffset((offset) => Math.max(offset - PAGE_SIZE, 0));
  };

  // Updates local storage when settings change
  useEffect(() => {
    setPersistedSort(isSortedByName);
    setPersistedFilters(filters);
  }, [isSortedByName, filters]);

  // Fetches missions from server whenever controls have been used
  useEffect(() => {
    const fetchMissionsBasedOnState = async () => {
      const data = await fetchMissions({
        sort: isSortedByName ? "name" : undefined,
        filters,
        offset,
      });
      setMissions(data);
    };
    fetchMissionsBasedOnState();
  }, [isSortedByName, filters, offset]);

  return {
    missions,
    isSortedByName,
    onChangeSortByName,
    filters,
    onChangeFilter,
    onNext,
    onPrev,
  };
};

// Fetching function
const url = "http://localhost:3001/api/missions";
type QueryParams = {
  sort: "name" | undefined;
  filters: MissionType[];
  offset: number;
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

const buildParams = ({ sort, filters, offset }: QueryParams): string => {
  let paramArray = [];
  if (sort) {
    paramArray.push(`sort=${sort}`);
  }
  if (filters.length > 0) {
    paramArray.push(`filter=${JSON.stringify(filters)}`);
  }
  if (offset) {
    paramArray.push(`offset=${offset}`);
  }

  if (paramArray.length > 0) {
    return "?" + paramArray.join("&");
  }
  return "";
};

// Persistence functions
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
