import GridLoader from "react-spinners/GridLoader";

export default function Loader() {
  return (
    <div className="loaderBg">
      <div className="loaderCont">
        <div>
          <h2>Loading data...</h2>
        </div>
        <GridLoader color="darkgrey" loading={true} />
      </div>
    </div>
  );
}
