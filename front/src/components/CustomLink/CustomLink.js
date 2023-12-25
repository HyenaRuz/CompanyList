import { Link } from "react-router-dom";

function CustomLink({children, to}) {
    return (  
        <Link to={to}>
            {children}
        </Link>    
    );
}

export default CustomLink;