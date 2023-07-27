import { Helmet ,HelmetProvider} from 'react-helmet-async';
import StaffContent from './StaffContent';
import Loader from '../Loader';

const Staff = () => {

    return (
        <>
            <HelmetProvider>
            <Helmet>
                <title>TMC - Staff</title>
            </Helmet>
                <StaffContent />
                {/* <Loader/> */}
            </HelmetProvider>
        </>
    )
}

export default Staff