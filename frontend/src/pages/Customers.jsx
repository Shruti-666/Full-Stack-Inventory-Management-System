import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {

    const [customers, setCustomers] = useState([]);

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {

        api.get("/customers/")
            .then((response) => {
                setCustomers(response.data);
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

    const createCustomer = async (e) => {

        e.preventDefault();

        try {

            await api.post("/customers/", formData);

            fetchCustomers();

            setFormData({
                full_name: "",
                email: "",
                phone: ""
            });

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "Error creating customer"
            );

        }
    };

    const deleteCustomer = async (id) => {

        try {

           if (!window.confirm("Delete customer?")) {
    return;
}

await api.delete(`/customers/${id}`);

            fetchCustomers();

        } catch (error) {

            console.log(error);

            alert("Unable to delete customer");

        }
    };

    return (
        <div className="container">

            <h1>Customers</h1>

            <form onSubmit={createCustomer}>

                <h3>Add Customer</h3>

                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Add Customer
                </button>

            </form>

            <br />

            <table border="1">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {customers.map((customer) => (

                        <tr key={customer.id}>

                            <td>{customer.id}</td>
                            <td>{customer.full_name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>

                            <td>

                                <button
                                    onClick={() =>
                                        deleteCustomer(customer.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Customers;