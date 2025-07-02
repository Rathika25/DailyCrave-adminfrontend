import { useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import './AddSpecial.css';
import { toast } from 'react-toastify'; 

const AddSpecial = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Specials'
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('special', true);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      toast.success(response.data.message || "Special item added!");
      setData({ name: '', description: '', price: '', category: 'Specials' });
      setImage(false);
    } catch (error) {
      console.error(error);
      toast.error("Error uploading special item");
    }
  };

  return (
    <div className="screen">
      <div className="container">
        <form onSubmit={onSubmitHandler} className="flex-col">
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
            <input
              type="file"
              id="image"
              hidden
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Special item name"
              required
            />
          </div>
          <div className="add-product-description flex-col">
            <p>Description</p>
            <textarea
              name="description"
              value={data.description}
              onChange={onChangeHandler}
              rows="6"
              required
              placeholder="Write something"
            ></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Category</p>
              <select name="category" value={data.category} onChange={onChangeHandler}>
                <option value="Specials">Specials</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Price</p>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={onChangeHandler}
                placeholder="₹150"
                required
              />
            </div>
          </div>
          <button type="submit" className="add-btn">
            ADD SPECIAL
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSpecial;
