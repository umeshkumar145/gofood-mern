import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  let [isLoading, setIsLoading] = useState(false)
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    try {
      const response = await fetch("https://gofood-mern-backend-5wvd.onrender.com/api/auth/foodData", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
      const data = await response.json();
      console.log("Data received from API:", data);
      setFoodItems(data[0] || []);  // Default to empty array if data[0] is undefined
      setFoodCat(data[1] || []);     // Default to empty array if data[1] is undefined
      } else {
        console.error("Failed to fetch food data", response.status);
      }
    } catch (error) {
      console.error("Error loading food items:", error);
      setFoodItems([]);  // Ensure foodItems is an array even if the fetch fails
      setFoodCat([]);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "9" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn text-white bg-danger" onClick={() => setSearch('')}>X</button>
              </div>
            </div>
            {/* Carousel Images */}
            <div className="carousel-item active">
              <img src="https://static.vecteezy.com/system/resources/previews/036/804/331/non_2x/ai-generated-assorted-indian-food-on-dark-wooden-background-free-photo.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://png.pngtree.com/background/20230528/original/pngtree-variety-of-indian-food-is-served-on-a-table-picture-image_2778395.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {Array.isArray(foodCat) && foodCat.length > 0 ? foodCat.map((category) => (
          <div key={category._id} className='row mb-3'> {/* Use _id for unique key */}
            <div className='fs-3 m-3'>
              {category.CategoryName}
            </div>
            <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left, rgb(0, 255, 137), rgb(0, 0, 0))" }} />
            {Array.isArray(foodItems) && foodItems.length > 0 ? (
              foodItems
                .filter((item) => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                .map((filteredItem) => (
                  <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3'> {/* Use _id for unique key */}
                    <Card foodName={filteredItem.name} item={filteredItem} options={filteredItem.options[0]} ImgSrc={filteredItem.img} />
                  </div>
                ))
            ) : (
              <div>No items available for this category</div>
            )}
          </div>
        )) : <div><img src="https://loading.io/assets/mod/spinner/spinner/lg.gif" width={300} className= {` ${ isLoading ? ''  : 'hidden'} ` } alt="" Please wait until we are fetching categories.../>
          Please wait until we fetch Categories...
          </div>}
      </div>
      <Footer />
    </div>
  );
}
