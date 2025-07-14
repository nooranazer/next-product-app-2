"use client";

import { AddProductType } from '@/types/productType';
import React, { useState } from 'react';
import api from '@/api';
import { TextField, Button } from '@mui/material';
import Link from 'next/link';
import '../../style/AddProduct.css'; 
import { useRouter } from 'next/navigation';

const AddProduct = () => {
  const router = useRouter()
  const [product, setProduct] = useState<AddProductType>({
    
    title: '',
    price: 0,
    stock: 0,
    thumbnail: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  // Check if the value is empty and treat it as 0 (useful for number inputs)
  // Convert the value to a number
  const updatedValue = value === '' ? 0 : parseInt(value, 10);

  setProduct(prev => ({
    ...prev,
    [name]: name === 'price' || name === 'stock' ? updatedValue : value
  }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem('newProduct', JSON.stringify(product))


    try {
      const res = await api.post('/add', product);
      console.log('Product added:', res.data);
      alert('Product added successfully!');
      router.push('/productlist')
      // setProduct({
      //   id:0,
      //   title: '',
      //   price: 0,
      //   stock: 0,
      //   thumbnail: '',
      //   description: ''
      // });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('❌ Failed to add product');
    }
  };

  return (
    <div className="container add-product-container">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">➕ Add New Product</h2>

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

          <div className="d-flex justify-content-between mt-4">
            <Link href="/productlist" className="btn btn-outline-secondary">
              ← Back
            </Link>
            <Button type="submit" variant="contained" color="primary">
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
