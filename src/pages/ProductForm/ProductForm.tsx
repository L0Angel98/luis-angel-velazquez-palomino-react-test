import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import stylesModule from './ProductForm.module.sass';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createProducts } from "../../redux/productsSlice";
import getNextId from "./helpers/getNextId";
import fileToDataURL from "./helpers/fileToDataURL";

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [itemUpdate, setItemUpdate] = useState({ id: 0, image: ""});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {data} = useSelector((state: RootState) =>( {data: state.products.data}));


  const handleProduct = (newProduct) => {
    dispatch(createProducts([newProduct, ...data]))
  }

  const handleUpdate = (product, id) => {
    let historyData = [...data]
    const index = data.findIndex(item => item.id === id)
    if(index != -1 ){
      historyData[index] = product;
    }

    dispatch(createProducts(historyData))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || (!!!id && !image )|| !description || !category) {
      setError("Todos los campos son requeridos.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("image", image ? image : itemUpdate.image);
    formData.append("description", description);
    formData.append("category", category);

    try {
      const resp = await axios.post("https://fakestoreapi.com/products", formData);
      // Manejar éxito
      if(resp.status === 200 && resp.data.id){
       

        if(id){
          const imageURL =  image ? await fileToDataURL(image) : itemUpdate.image
          handleUpdate({id: itemUpdate?.id ,title, price, image: imageURL, description, category}, itemUpdate?.id)
        }else {
          const imageURL = image ? await fileToDataURL(image) : null;
          handleProduct({id: getNextId(data) ,title, price, image: imageURL, description, category})
        }

        navigate(`/products`)
        
      }
     
    } catch (err) {
      setError("Error al crear el producto.");
    }
  };

  const handleLoadDataToUpdate = () => {
    const index =  data.findIndex(item => item.id === Number(id))
    if(index != -1){
      const product = data[index];
      setTitle(product.title);
      setPrice(String(product.price));
      setCategory(product.category);
      setDescription(product.description);
      setItemUpdate({id: product.id, image: product.image})
    }
  }

  useEffect(() => {
    if(id){
      handleLoadDataToUpdate();
    }
  },[id])

  return (
    <form onSubmit={handleSubmit} className={stylesModule.formContainer}>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Título"
      required
      className={stylesModule.formInput}
    />
    <input
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      placeholder="Precio"
      required
      className={stylesModule.formInput}
    />
    <input
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Descripción"
      required
      className={stylesModule.formInput}
    />
    <input
      type="text"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      placeholder="Categoría"
      required
      className={stylesModule.formInput}
    />
    <input
      type="file"
      onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
      required={!!!id}
      className={stylesModule.formInput}
    />
    <button type="submit" className={stylesModule.formButton}>{id ? "Actualizar" : "Crear Producto"}</button>
    {error && <div className={stylesModule.formError}>{error}</div>}
  </form>
  );
};

export default ProductForm;
