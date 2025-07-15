"use client";

import { AddProductType } from '@/types/productType';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import api from '@/api';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { Delete, Edit } from '@mui/icons-material';

const ViewPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter()

  const [product, setProduct] = useState<AddProductType | null>(null);

  useEffect(() => {
  if (!id) return; 

  // First, try to get the product from localStorage
  const editedProduct = localStorage.getItem('editedproduct');

  // If there's an edited version, use that
  if (editedProduct) {
    const parse = JSON.parse(editedProduct)
    if (parse.id == id ) {
    setProduct(parse);
    return
    }
    
  } 
    // If no edited version, fall back to fetching from the API
    api.get(`/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Error loading product:", err);
      });
  
}, [id]);

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete?')
    if (!confirmDelete) return

    await api.delete(`/${id}`)
    .then(()=> {
      alert('deleted successfully')
      router.push('/productlist')

      let ids: number[] = []

      const existing = localStorage.getItem('deletedProductIds')
      if (existing) {
        ids = JSON.parse(existing)
      }

      if (!ids.includes(Number(id))) {
        ids.push(Number(id));
        localStorage.setItem('deletedProductIds', JSON.stringify(ids))
      }
    })
    .catch(()=> {
      alert('deleting failed')
    })
  }


  if (!product) return <p className="text-center py-5 text-muted">Loading product details...</p>;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ padding: 2 }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <Link href="/productlist">
          <Button variant="outlined" color="primary" sx={{ position: 'absolute', top: 16, left: 16 }}>
           Back
          </Button>
        </Link>

        <h2 className="text-center mb-4">{product.title}</h2>

        <div className="text-center mb-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid product-img"
            style={{ maxWidth: '300px', borderRadius: '10px' }}
          />
        </div>

        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Stock:</strong> {product.stock} available</p>
        <p><strong>Description:</strong> {product.description}</p>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          sx={{ marginTop: 4 }}
        >
          <Link href={`/productlist/${id}/editproduct`}>
            <Button variant="contained" color="primary" startIcon={<Edit />}>
              Edit 
            </Button>
          </Link>

          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            startIcon={<Delete />}
          >
            Delete
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default ViewPage;
