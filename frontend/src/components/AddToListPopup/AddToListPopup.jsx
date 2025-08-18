import "./AddToListPopup.css"

function AddToListPopup( {onClose} ) {
    return (
        <div className="AddToListPopup">
            <h2>Add to List</h2>
            <button onClick={onClose}>Exit</button>
            <button onClick={onClose}>Save</button>
        </div>
    )
}

export default AddToListPopup