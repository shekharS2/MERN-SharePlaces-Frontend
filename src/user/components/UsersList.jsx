import UsersItem from './UsersItem';
// import Card from '../../shared/components/UIElements/Card';
import './UsersList.css';

const UsersList = (props) => {
    
    return <>
        {props.items.length === 0 ? 
            (
                <div className='center'>
                    <h2>No users found.</h2>
                </div>
            )
        :
            (
                <ul className='users-list'>
                    {props.items.map((user) => {
                        return (
                            <UsersItem
                                key={user.id} 
                                id={user.id} 
                                image={user.image} 
                                name={user.name}
                                placeCount={user.places.length} 
                            />
                        );
                    })}
                </ul>
            )
        }
    </>;
}

export default UsersList;