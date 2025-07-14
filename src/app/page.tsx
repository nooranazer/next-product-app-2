'use client';
import Link from 'next/link';
import React  from 'react';
import "../style/Home.css"
import { Button } from '@mui/material';

const HomePage = () => {
  return (
    <div className="home">
     <h1> PRODUCT APP</h1>
      <Link href="/productlist" passHref>
        <Button variant="contained" color="primary">
         get start here
        </Button>
      </Link>
    </div>
  )
}

export default HomePage