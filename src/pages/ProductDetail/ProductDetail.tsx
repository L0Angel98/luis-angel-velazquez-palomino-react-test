// src/pages/ProductDetails/ProductDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import stylesModule from './ProductDetail.module.sass';
import { createProducts } from '../../redux/productsSlice';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {data} = useSelector((state: RootState) =>( {data: state.products.data}))

  const getDataProoduct = () => {
    const index = data.findIndex(productItem => productItem.id === Number(id));
    if(index != -1){
      setProduct(data[index]);
    } else{
      navigate("/404")
    }
  }

  useEffect(() => {
    getDataProoduct();
  }, [id, data]);

  const handleDeleteProduct = () => {
    let productsHistory = [...data];
      const index = data.findIndex(productItem => productItem.id === product?.id);
      if(index != -1){
        productsHistory.splice(index, 1)
        dispatch(createProducts(productsHistory))
        navigate("/products")
      } 
  }


  if (!product) return <div>Loading...</div>;

  return (
    <div className={stylesModule.container}>
    <h1 className={stylesModule.title}>{product.title}</h1>
    <img className={stylesModule.image} src={product.image} alt={product.title} />
    <p className={stylesModule.description}>{product.description}</p>
    <p className={stylesModule.price}>${product.price}</p>
    <div className={stylesModule.buttons}>
      <button className={stylesModule.button} onClick={() => navigate('/products')}>Back to Products</button> 
      <button className={stylesModule.button} onClick={() => navigate(`/products/create/${product.id}`)}>Editar</button> 
      <button className={`${stylesModule.button} ${stylesModule.delete}`} onClick={() => handleDeleteProduct()} disabled={!!!product?.id}>Borrar</button></div>
  </div>
  );
};

export default ProductDetails;
