import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table } from "../../components/Table/Table";
import useColumns from "./TabletProducts/useColumns";
import stylesModule from "./Products.module.sass"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createProducts } from "../../redux/productsSlice";

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const cols = useColumns();
  const dispatch = useDispatch();

  const {data} = useSelector((state: RootState) =>( {data: state.products.data}))

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products`);
        dispatch(createProducts(response.data));
      } catch (err) {
        setError("Error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    if(data.length === 0){
      fetchProducts();
    }
   
  }, []);

 

  const handleDetail = (id: string) => {
    navigate(`/products/${id}`)
  }

  useEffect(() => {
    setProducts(data)
  },[data])

  return (
    <div className={stylesModule.products}>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <div className={stylesModule.containerTable}>
      <Table data={products} columns={cols} handleClickColumn={handleDetail} />
      {/* .... */}
    </div>
    </div>
  );
};

export default Products;
