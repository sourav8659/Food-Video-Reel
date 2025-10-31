import {Route,Routes,Navigate,useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import UserRegister from '../pages/auth/UserRegister';
import ChooseRegister from '../pages/auth/ChooseRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Home from '../pages/general/Home';
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile';

function getCookie(name) {
    const matches=document.cookie.split('; ').find(row => row.startsWith(name + '='));
    return matches ? (matches.split('=')[1] ? matches.split('=')[1] : null) : null;
}

const AppRoutes = () => {
    
    const [token, setToken] = useState(getCookie('token'));
    const navigate=useNavigate();
    
    useEffect(() => {
        const interval = setInterval(() => {
            const newToken = getCookie('token');
            setToken(newToken);
        }, 1); // check every millisecond
        return () => clearInterval(interval);
    }, []);
    
    return (
        <Routes>
            <Route path='/' element={token ? <Home /> : <Navigate to="/register" replace />} />
            <Route path="/register" element={<ChooseRegister />} />
            <Route path='/user/register' element={<UserRegister />} />
            <Route path='/user/login' element={<UserLogin />} />
            <Route path='/food-partner/register' element={<FoodPartnerRegister />} />
            <Route path='/food-partner/login' element={<FoodPartnerLogin />} />
            <Route path="/create-food" element={<CreateFood />} />
            <Route path="/food-partner/:id" element={<Profile />} />
        </Routes>
    )
}

export default AppRoutes
