import Land from "./land";
import "../style/map.css";

const RowOfLand = ({ row }) => {
  return (
    <div className="row">
      {row.map((land, index) => {
        return <Land key={index} land={land}></Land>;
      })}
    </div>
  );
};

export default RowOfLand;
