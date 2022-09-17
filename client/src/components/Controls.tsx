import "./Controls.css";

type Props = {
  isSorted: boolean;
  onChangeSort: () => void;
};
export const Controls = ({ isSorted, onChangeSort }: Props) => {
  return (
    <div className="control-bar">
      <div className="control-sort">
        <div>Sort by Name</div>
        <input type="checkbox" checked={isSorted} onChange={onChangeSort} />
      </div>
    </div>
  );
};
