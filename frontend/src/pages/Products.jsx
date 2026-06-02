import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {

    const [products, setProducts] = useState([]);

    const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    stock_quantity: ""
});

    useEffect(() => {

        fetchProducts();

    }, []);

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
const createProduct = async (e) => {

    e.preventDefault();

    try {

        await api.post("/products/", {
            ...formData,
            price: parseFloat(formData.price),
            stock_quantity: parseInt(formData.stock_quantity)
        });

        fetchProducts();

        setFormData({
            name: "",
            sku: "",
            price: "",
            stock_quantity: ""
        });

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.detail ||
            "Error creating product"
        );

    }
};

const deleteProduct = async (id) => {

    try {

        if (!window.confirm("Delete product?")) {
    return;
}

await api.delete(`/products/${id}`);

        fetchProducts();

    } catch (error) {

        console.log(error);

        alert("Unable to delete product");

    }
};

    return (
        <div className="container">

            <h1>Products</h1>

            <form onSubmit={createProduct}>

    <h3>Add Product</h3>

    <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
    />

    <input
        type="text"
        name="sku"
        placeholder="SKU"
        value={formData.sku}
        onChange={handleChange}
        required
    />

    <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
    />

    <input
        type="number"
        name="stock_quantity"
        placeholder="Stock"
        value={formData.stock_quantity}
        onChange={handleChange}
        required
    />

    <button type="submit">
        Add Product
    </button>

</form>

<br />
            <table border="1">

                <thead>
                    <tr>
    <th>ID</th>
    <th>Name</th>
    <th>SKU</th>
    <th>Price</th>
    <th>Stock</th>
    <th>Action</th>
</tr>
                </thead>

                <tbody>

                    {products.map((product) => (

                        <tr key={product.id}>

    <td>{product.id}</td>
    <td>{product.name}</td>
    <td>{product.sku}</td>
    <td>{product.price}</td>
    <td>{product.stock_quantity}</td>

    <td>
        <button
            onClick={() => deleteProduct(product.id)}
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

export default Products;

