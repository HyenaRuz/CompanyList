import { Link } from 'react-router-dom'
import './DefaultButton.scss'


function DefaultButton({title, to}) {
    return (
        <Link className="defaultButton" to={to}>
            <p className='defaultButton__title'>{title}</p>
        </Link>   
    )
}

export default DefaultButton