"use client";

import { AddProductType } from '@/types/productType';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import api from '@/api';
import { Button } from '@mui/material';
import Link from 'next/link';

const ViewPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<AddProductType | null>(null);

  useEffect(() => {
    if (!id) return;

    const local = localStorage.getItem('editedproduct')
    if (local) {
      const editedProduct = JSON.parse(local);
      setProduct(editedProduct);
    } else {
      
      api.get(`/${id}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.error('Error loading your product:', err);
        });
    }

  }, [id]);

  if (!product) return <p className="text-center py-5 text-muted">Loading product details...</p>;

  return (
    <div className="container view-product-container py-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">{product.title}</h2>

        <div className="text-center mb-4">
          <img src={product.thumbnail} alt={product.title} className="img-fluid product-img" />
        </div>

        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Stock:</strong> {product.stock} available</p>
        <p><strong>Description:</strong> {product.description}</p>

        <div className="d-flex justify-content-between mt-4">
          <a href="/productlist" className="btn btn-outline-primary">← Back to Products</a>

          {/* Corrected Link for Edit Product Button */}
          <Link href={`/productlist/[id]/editproduct`} as={`/productlist/${id}/editproduct`} passHref>
            <Button variant="contained" color="primary">
              Edit Product
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
