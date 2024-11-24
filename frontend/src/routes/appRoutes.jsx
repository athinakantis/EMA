import Error from '../pages/Error/Error';
import Login from '../pages/Login/Login';
import List from '../pages/EmployeeList/EmployeeList';
import Root from '../pages/Root/Root';
import Form from '../pages/Form/Form';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Login />,
            },
            {
                path: '/employees',
                element: <List />,
            },
            {
                path: '/add',
                element: <Form />,
            },
        ],
    },
]);

export default router;