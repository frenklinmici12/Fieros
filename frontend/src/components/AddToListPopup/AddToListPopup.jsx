import "./AddToListPopup.css"

function AddToListPopup( {onClose} ) {
    return (
        <div className="AddToListPopup-overlay">
            <div className="AddToListPopup">
                <h2>Add to List</h2>
                
                <div className="rating">
                    <label htmlFor="rating">Rating: </label>
                    <input type="number" id="rating" name="rating" min="1" max="10"/>
                    <span>/10</span>
                </div>

                <div className="status">
                    <label htmlFor="status">Status: </label>
                    <select id="status" name="status">
                        <option value="Select...">Select...</option>
                        <option value="Beaten">Beaten</option>
                        <option value="Dropped">Dropped</option>
                        <option value="Owned">Owned</option>
                        <option value="Currently Playing">Currently Playing</option>
                        <option value="Wishlist">Wishlist</option>
                    </select>
                </div>

                <div className="thoughts">
                    <label htmlFor="thoughts">Thoughts:</label>
                    <textarea id="thoughts" name="thoughts" placeholder="Write your thoughts here..."></textarea>
                </div>

                <div className="navigation">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onClose}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default AddToListPopup