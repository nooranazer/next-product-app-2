'use client'
import api from "@/api";
import { AddProductType } from "@/types/productType";
import { Button, TextField } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditProduct = () => {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<AddProductType>({
        title: '',
        price: 0,
        stock: 0,
        thumbnail: '',
        description: ''
    });

    useEffect(() => {
        if (!id) return; // Prevent the API call if the ID is not available

        api.get(`/${id}`)
            .then((res) => {
                setProduct(res.data);  
            })
            .catch((error) => {
                console.error("Cannot find product:", error);
                alert("Product not found");
            });
    }, [id]);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value  // Convert to number if it's price or stock
        }));
    };

    
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        // Update the product using API
        const res = await api.patch(`/${id}`, {
        title: product.title,
        price: product.price,
        stock: product.stock,
        thumbnail: product.thumbnail,
        description: product.description
        });

        alert('Product updated successfully!');

        // Save only the edited product to localStorage
        localStorage.setItem('editedproduct', JSON.stringify(product));

        // Redirect back to the product list
        router.push('/productlist');
    } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product.');
    }
    };

    return (
        <div className="container">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Stock"
                    name="stock"
                    type="number"
                    value={product.stock}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Thumbnail URL"
                    name="thumbnail"
                    value={product.thumbnail}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                />
                <Button type="submit" variant="contained" color="primary">
                 Update Product
                </Button>
            </form>
        </div>
    );
};

export default EditProduct;
