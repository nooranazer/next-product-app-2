"use client";
import { ProductType } from '@/types/productType';
import React, { useEffect, useState } from 'react';
import api from '@/api';
import '../../style/ProductList.css'
import Link from 'next/link';
import { Skeleton } from '@mui/material';

const ProductList = () => {
  const [product, setProduct] = useState<ProductType[]>([]);

  useEffect(() => {
    api.get('/')
      .then((res) => {
    const apiProduct = res.data.products
    // First, get the product from localStorage if available
    const savedProduct = localStorage.getItem('newProduct');
    let productsFromLocalStorage: ProductType[] = [];
    
    if (savedProduct) {
      // If there's a saved product, add it to the product array
      productsFromLocalStorage = [JSON.parse(savedProduct)];
    }
    
    //editproduct
    const updatedProduct = JSON.parse(localStorage.getItem('editedproduct') || 'null')
    const updatedApiProducts = updatedProduct 
    ? apiProduct.map((p:ProductType[]) => p.id === updatedProduct.id ? updatedProduct : p )
    : apiProduct


    // Combine products from API and the saved product
    const allProducts = [...productsFromLocalStorage, ...updatedApiProducts];
    setProduct(allProducts);
    })
    .catch((err) => {
    console.error('No products found:', err);
    });
   }, []);

  return (
    <div className="product-container container">
      <div className="d-flex justify-content-end mb-3">
        <Link href="/addproduct" className="btn btn-primary">
          Add Product
        </Link>
      </div>
      <h1 className="product-heading">Find Your Product</h1>

      {product.length === 0 ? (
        <Skeleton variant="rectangular" width={210} height={118} />
      ) : (
        <div className="product-grid">
          {product.map((item, index) => (
            <div className="product-card" key={item.id || index}> {/* Use item.id if exists, else fallback to index */}
              <img src={item.thumbnail} alt={item.title} className="product-image" />
              <h2 className="product-title">{item.title}</h2>
              <p className="product-price">₹{item.price}</p>
              <p className="product-stock">{item.stock} in stock</p>
              <Link href={`/productlist/${item.id}`}>
                <button className="product-btn btn">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
