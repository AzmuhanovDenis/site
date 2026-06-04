import { useEffect, useState } from "react";
import Header from "./components/header/Header.jsx";
import Search from "./components/main/Search.jsx";
import Card from "./components/main/Card.jsx";
import Pagination from "./components/main/Pagination.jsx";
import Filter from "./components/filter/Filter.jsx";

const number_items_onPage = 6;

function App() {
  const [paintings, setPaintings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  //Скрипт получения картин
  useEffect(() => {
      const fetchPaintings = async () => {
        const API = 'https://corsproxy.io/?' + encodeURIComponent("https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@latest");
        const response = await fetch(API);
        const data = await response.json();
        
        const paintingsData = data.paths['/paintings']
            .get
            .responses['200']
            .content['application/json']
            .example;
        
        const formattedPaintings = paintingsData.map((item, index) => ({
            id: index + 1,
            imageUrl: item.imageUrl,
            title: item.title,
            artist: item.artist,
            location: item.location,
            year: item.year
        }));
        
        setPaintings(formattedPaintings);
          } 
      fetchPaintings();
  }, []);

  //Логика пагинации и обрезка кол-во картин
  const totalPages = 9;
    
  const getCurrentPagePaintings = () => {
      const startIndex = (currentPage - 1) * number_items_onPage;
      const endIndex = startIndex + number_items_onPage;
      return paintings.slice(startIndex, endIndex);
  };
  const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      const galleryBlock = document.querySelector('.gallery-block');
  };

  //Скрипт открывания фильтра
  useEffect(() => {
    const openBtn = document.getElementById("openFilter"),
          closeBtn = document.getElementById("closeFilter"),
          overlay = document.getElementById("filterOverlay");

    openBtn.addEventListener("click", () => {
        overlay.classList.add("active");
    });
    closeBtn.addEventListener("click", () => {
        overlay.classList.remove("active");
    });

    const timer = setTimeout(() => {
        const groups = document.querySelectorAll(".filter-group");
        
        groups.forEach(group => {
          const header = group.querySelector(".filter-group-header");
          if (header) {
            header.addEventListener("click", () => {
              group.classList.toggle("active");
            });
          }
        });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const currentPaintings = getCurrentPagePaintings();

  return (
    <>
      <header>
        <div className="container">
          <Header />
        </div>
      </header>
      
      <main>
        <div className="container">
          <Search />
        </div>

        <div className="container">
          <div className="gallery-block">

            {currentPaintings.map((painting, index) => (
              <Card
                key={painting.id}
                imageUrl={painting.imageUrl}
                text_top_d={painting.title}
                text_bottom_d={`${painting.year}`}
                artist={painting.artist}
                location={painting.location}
              />
            ))}
          </div>
        </div>
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
        
        <div className="filter-overlay" id="filterOverlay">
          <div className="filter-header">
            <button className="close-btn" id="closeFilter">
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.386207 14.8252C0.165517 15.049 0.165517 15.3846 0.386207 15.6084C0.606897 15.8322 0.937931 15.8322 1.15862 15.6084L7.88966 8.8951L14.731 15.8322C14.9517 16.0559 15.2828 16.0559 15.5034 15.8322C15.7241 15.6084 15.7241 15.2727 15.5034 15.049L8.66207 8.11189L15.8345 0.951049C16.0552 0.727273 16.0552 0.391608 15.8345 0.167832C15.6138 -0.0559441 15.2828 -0.0559441 15.0621 0.167832L7.88966 7.32867L0.937931 0.27972C0.717241 0.0559441 0.386207 0.0559441 0.165517 0.27972C-0.0551724 0.503497 -0.0551724 0.839161 0.165517 1.06294L7.22759 8.11189L0.386207 14.8252Z" />
                </svg>
            </button>
          </div>
          
          <Filter filter_title="artist">
            <div className="select-container">
              <select>
                  <option value="" disabled selected hidden>Select the artist</option>
                  <option value="1">Claude Monet</option>
                  <option value="2">Pablo Picasso</option>
                  <option value="3">Joshua Reynolds</option>
                  <option value="4">William Turner</option>
                  <option value="5">John Constable</option>
              </select>
            </div>
          </Filter>

          <Filter filter_title="location"> 
            <div className="select-container">
              <select>
                  <option value="" disabled selected hidden>Select the location</option>
                  <option value="1">Louvre Museum</option>
                  <option value="2">Van Gogh Museum</option>
                  <option value="3">State Tretyakov Gallery</option>
                  <option value="4">Thyssen-Bornemisza National Museum</option>
                  <option value="5">New York Historical Society Museum</option>
              </select>
            </div>
          </Filter>

          <Filter filter_title="years">
            <div className="inputs-years">
              <input type="number" placeholder="From" />
              <span className="dash">
                  <svg width="16" height="2" viewBox="0 0 16 2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.7 1.4H15.4C15.6 1.4 15.7 1.3 15.9 1.2C15.9 1 16 0.9 16 0.7C16 0.5 15.9 0.4 15.8 0.2C15.7 0.0999998 15.5 0 15.3 0H8.7H7.3H0.7C0.5 0 0.4 0.0999998 0.2 0.2C0.1 0.4 0 0.5 0 0.7C0 0.9 0.1 1 0.2 1.2C0.3 1.3 0.5 1.4 0.7 1.4H7.4H8.7Z" />
                  </svg>
              </span>
              <input type="number" placeholder="To" />
            </div>
          </Filter>

          <div className="filter-footer">
            <span className="result-span">show the results</span>
            <span className="clear-span">clear</span>
          </div>
        </div>
    </>
  );
}

export default App
