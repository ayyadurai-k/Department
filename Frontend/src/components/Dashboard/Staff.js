import { Helmet, HelmetProvider } from 'react-helmet-async';
import StaffContent from './StaffContent';
import Loader from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../app/actions/getUser';
import { useNavigate } from 'react-router-dom';

const Staff = () => {

    const  user  = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getUser(dispatch, '/staff/dashboard')
    },[dispatch]);

    
    if (user.error) {
        return navigate('/login')
    }


    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>TMC - Staff</title>
                </Helmet>
                {user.loading || !user.user ? <Loader /> : <StaffContent/>}
            </HelmetProvider>
        </>
    )
}

export default Staff