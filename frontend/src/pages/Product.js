// import React, { useContext, useState, useEffect } from 'react';
// import Breadcrumbs from '../components/Breadcrums/Breadcrums';
// import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
// import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
// import RelatedProducts from '../components/RelatedProducts/RelatedProducts';
// import { useParams } from 'react-router-dom';
// import { ShopContext } from '../Context/ShopContext';
// import axios from 'axios'; // Import axios for HTTP requests

// const Product = () => {
//   const { products } = useContext(ShopContext);
//   const { productId } = useParams();
//   const product = products.find((e) => e.id === Number(productId));
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     const fetchDescription = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9000/products/${productId}/description`);
//         setDescription(response.data.description);
//       } catch (error) {
//         console.error('Error fetching description:', error);
//       }
//     };
//     fetchDescription();
//   }, [productId]);

//   return (
//     <div>
//       <Breadcrumbs product={product} />
//       <ProductDisplay product={product} />
//       <DescriptionBox description={description} />
//       <RelatedProducts />
//     </div>
//   );
// };

// export default Product;
