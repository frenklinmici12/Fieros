import "./Genres.css"
import Navbar from "../../components/Navbar/Navbar";

function Genres() {
    //make a genres array, then list them with .map()
    //the list items will be links to their respective pages (can probably just re use search results)
    return (
        <div>
            <Navbar msg="Fieros - Genres"></Navbar>
            <ol>
                <li>Action</li>
                <li>Sci-fi</li> 
            </ol>
        </div>
    );
}

export default Genres