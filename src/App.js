// App.js

import React, {useState,useEffect} from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';


export default function App() {
  const [images,setImages]=useState([]);
  //const [currentPage, setCurrentPage] = useState(1);
  //const [imagesPerPage] = useState(9);  // Number of images to display per page
  const [isLoading,setisLoading]=useState(true);
  const [term,setTerm]=useState('');
  
  useEffect(()=>{
    fetch(`https://pixabay.com/api/?key=${
      process.env.REACT_APP_PIXABAY_KEY}&q=${term}&image_type=photo&pretty=true`)
      .then(res=>res.json())
      .then(data=>{
        setImages(data.hits);
        setisLoading(false);
      })
      .catch(err=>console.log(err));
  },[term]);//whenever term changes this will work again

 /* // Get current images based on pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

*/
  return (
   <div className="container mx-auto">
    <ImageSearch searchText={(text)=>setTerm(text)}/>
     {!isLoading && images.length ===0 && <h1 className="text-6xl text-container mx-auto mt-32">No Images Found</h1> }
     {isLoading ? <h1 className="text-6xl text-container mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
         {images.map(image=>(
          <ImageCard key={image.id} image={image}/>
         ))}
     </div>}
   </div>
  );
}
