import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        api.get("/dashboard/")
            .then((response) => {
                setDashboard(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    if (!dashboard) {
        return <h2>Loading...</h2>;
    }

    return (
    <div className="container">

        <h1>Inventory Dashboard</h1>

        <div className="dashboard-grid">

            <div className="card">
                <h2>Products</h2>
                <p>{dashboard.total_products}</p>
            </div>

            <div className="card">
                <h2>Customers</h2>
                <p>{dashboard.total_customers}</p>
            </div>

            <div className="card">
                <h2>Orders</h2>
                <p>{dashboard.total_orders}</p>
            </div>

            <div className="card">
                <h2>Low Stock</h2>
                <p>{dashboard.low_stock_products}</p>
            </div>

        </div>

    </div>
);
}

export default Dashboard;