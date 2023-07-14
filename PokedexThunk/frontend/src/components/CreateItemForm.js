import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createItem } from '../store/items';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const CreateItemForm = ({ hideForm}) => {
    const dispatch = useDispatch();
    const { pokemonId } = useParams();
  
    const [happiness, setHappiness] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
  
    const updateName = (e) => setName(e.target.value);
    const updateHappiness = (e) => setHappiness(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    const history = useHistory();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const payload = {
        name,
        happiness,
        price
      };
      
      let createdItem = dispatch(createItem(pokemonId, payload));
      if (createdItem) {
        history.push(`/pokemon/items`);
        hideForm();
      }
    };
  
    const handleCancelClick = (e) => {
      e.preventDefault();
      hideForm();
    };
  
    return (
      <section className="create-item-form-holder centered middled">
        <form className="create-item-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={updateName}
          />
          <input
            type="number"
            placeholder="Happiness"
            min="0"
            max="100"
            required
            value={happiness}
            onChange={updateHappiness}
          />
          <input
            type="number"
            placeholder="Price"
            required
            value={price}
            onChange={updatePrice}
          />
          <button type="submit">Add Item</button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
      </section>
    );
}

export default CreateItemForm;