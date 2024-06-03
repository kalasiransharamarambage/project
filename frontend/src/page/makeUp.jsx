import Sidebar from "../component/sidebar";
import './allProduct.css' 
import LocalMallIcon from '@mui/icons-material/LocalMall';


const Allproduct= () => {
  return (
    <div>
      
      <div className="bigRect1">
        <div className="smallRect1">
          <div className="smallRect2">
            <div className="mainPhoto">
              <a href="#"><img
                src="../src/assets/33.jpg"
                alt="Description 1"
                className="rectImage"
              />
              </a>
              <div className="rectHeading">
              <h5 className="rect-head-head">Eye Shadow</h5>
            </div>
            <div className="buyNow">
            <button className="buy-button">Buy now</button>
            <button className="cart-button"><LocalMallIcon/></button>
            
            </div>
            </div>
            
          </div>

          <div className="smallRect2">
            <div className="mainPhoto">
            <a href="#">
              <img
                src="../src/assets/32.jpg"
                alt="Description 1"
                className="rectImage"
              />
              </a>
              <div className="rectHeading">
              <h5 className="rect-head-head">Lip Stick</h5>
            </div>
            <div className="buyNow">
            <button className="buy-button">Buy now</button>
            <button className="cart-button"><LocalMallIcon/></button>
            </div>
            </div>
           
          </div>

          <div className="smallRect2">
            <div className="mainPhoto">
            <a href="#">
              <img
                src="../src/assets/11.jpeg"
                alt="Description 1"
                className="rectImage"
              />
              </a>
              <div className="rectHeading">
              <h5 className="rect-head-head">Eye Shadow</h5>
            </div>
            <div className="buyNow">
            <button className="buy-button">Buy now</button>
            <button className="cart-button"><LocalMallIcon/></button>
            </div>
            </div>
           
          </div>
        </div>

        <div className="smallRect1-1">
          <div className="smallRect2">
            <div className="mainPhoto">
            <a href="#">
              <img
                src="../src/assets/21.jpeg"
                alt="Description 1"
                className="rectImage"
              />
              </a>
              <div className="rectHeading">
              <h5 className="rect-head-head">Mascara</h5>
            </div>
            <div className="buyNow">
            <button className="buy-button">Buy now</button>
            <button className="cart-button"><LocalMallIcon/></button>
            </div>
            </div>
           
          </div>

          <div className="smallRect2">
            <div className="mainPhoto">
            <a href="#">
              <img
                src="../src/assets/34.jpg"
                alt="Description 1"
                className="rectImage"
              />
              </a>
              <div className="rectHeading">
              <h5 className="rect-head-head">Faundation Cream</h5>
            </div>
            <div className="buyNow">
            <button className="buy-button">Buy now</button>
            <button className="cart-button"><LocalMallIcon/></button>
            </div>
            </div>
            
          </div>

          <div className="smallRect2">
            <div className="mainPhoto">
            <a href="#">
              <img
                src="../src/assets/19.jpeg"
                alt="Description 1"
                className="rectImage"
              />
              </a>
              <div className="rectHeading">
              <h5 className="rect-head-head">Lip Stick</h5>
            </div>
            <div className="buyNow">
            <button className="buy-button">Buy now</button>
            <button className="cart-button"><LocalMallIcon/></button>
            </div>
            </div>
            
          </div>

         
            
          
        

        

          

         
        </div>
      </div>
    </div>
  );
};

export default Allproduct; 