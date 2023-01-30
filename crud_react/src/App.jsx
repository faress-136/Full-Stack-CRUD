import logo from './logo.svg';
import Home from './Components/Home/Home.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


function App() {

  const routers = createBrowserRouter([
    {index:true, path:"/", element:<Home/>}

  ])
  return (
    <>
    <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

export default App;
