import Chart from "./Chart";
import { useSelector } from "react-redux";
import AdminChart from "../admin/AdminChart";
import userT from "../../types/userT";

const Dashboard = () => {
  const reduxdata = useSelector(
    (state: { user: { user: userT } }) => state.user?.user
  );
  return (
    <div>
      {reduxdata?.pk == 1 ? (
        <AdminChart />
      ) : reduxdata?.is_staff == true ? (
        <Chart />
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
