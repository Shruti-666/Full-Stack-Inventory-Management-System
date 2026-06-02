import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {

    const [orders, setOrders] = useState([]);

    const [customers, setCustomers] = useState([]);

    const [products, setProducts] = useState([]);

    const [formData, setFormData] = useState({
        customer_id: "",
        product_id: "",
        quantity: ""
    });

    useEffect(() => {

        fetchOrders();
        fetchCustomers();
        fetchProducts();

    }, []);

    const fetchOrders = () => {

        api.get("/orders/")
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const fetchCustomers = () => {

        api.get("/customers/")
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const fetchProducts = () => {

        api.get("/products/")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const createOrder = async (e) => {

        e.preventDefault();

        try {

            await api.post("/orders/", {
                customer_id: parseInt(formData.customer_id),
                items: [
                    {
                        product_id: parseInt(formData.product_id),
                        quantity: parseInt(formData.quantity)
                    }
                ]
            });

            fetchOrders();
            fetchProducts();

            setFormData({
                customer_id: "",
                product_id: "",
                quantity: ""
            });

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "Unable to create order"
            );

        }

    };

    return (
        <div className="container">

            <h1>Orders</h1>

            <form onSubmit={createOrder}>

                <h3>Create Order</h3>

                <select
                    name="customer_id"
                    value={formData.customer_id}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Customer
                    </option>

                    {customers.map((customer) => (

                        <option
                            key={customer.id}
                            value={customer.id}
                        >
                            {customer.full_name}
                        </option>

                    ))}

                </select>

                <select
                    name="product_id"
                    value={formData.product_id}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Product
                    </option>

                    {products.map((product) => (

                        <option
                            key={product.id}
                            value={product.id}
                        >
                            {product.name}
                        </option>

                    ))}

                </select>

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Create Order
                </button>

            </form>

            <br />

            <table border="1">

                <thead>

                    <tr>
                        <th>Order ID</th>
                        <th>Customer ID</th>
                        <th>Total Amount</th>
                    </tr>

                </thead>

                <tbody>

                    {orders.map((order) => (

                        <tr key={order.id}>

                            <td>{order.id}</td>
                            <td>{order.customer_id}</td>
                            <td>{order.total_amount}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Orders;