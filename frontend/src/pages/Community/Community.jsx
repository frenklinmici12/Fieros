import "./Community.css"
import Navbar from "../../components/Navbar/Navbar";

/* Notes:
    if not logged in, redirect to login page

    core functonality:  - display other user accounts, 
                        - have a search bar to lookup other users, 
                        - show some reviews and ratings

*/

function Community() {
    return (
        <div>
            <Navbar msg="Fieros - About"></Navbar>
            <p>Thank you for visiting Fieros. This is the community section. WIP.</p>
        </div>
    );
}

export default Community