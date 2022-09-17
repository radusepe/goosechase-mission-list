import "./Controls.css";

type Props = {
  isSorted: boolean;
  onChangeSort: () => void;
  filters: MissionType[];
  onChangeFilter: (filter: MissionType) => void;
};

const FILTER_TYPES: MissionType[] = ["gps", "photo", "text"];

export const Controls = ({
  isSorted,
  onChangeSort,
  filters,
  onChangeFilter,
}: Props) => {
  const buildOnChangeSort = (filter: MissionType) => () => {
    return onChangeFilter(filter);
  };

  return (
    <div className="control-bar">
      <div className="control-group">
        <div>Sort by Name</div>
        <input type="checkbox" checked={isSorted} onChange={onChangeSort} />
      </div>
      <div className="control-filters">
        {FILTER_TYPES.map((filter) => {
          return (
            <div key={filter} className="control-group">
              <div>{filter}</div>
              <input
                type="checkbox"
                checked={filters.includes(filter)}
                onChange={buildOnChangeSort(filter)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
