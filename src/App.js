import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import useAuth from './hooks/useAuth';

import PageGrid from './components/layout/PageGrid';
import ProtectedRoute from './components/ProtectedRoute';

//Public Components
import Index from './pages/Index';
import PastCards from './pages/PastCards';
import Rules from './pages/Rules';
import Login from './pages/user/Login';
import Maintenance from './pages/Maintenance';
import ErrorPage from './pages/500';
import ForgotPassword from './pages/user/ForgotPassword';
import ResetPassword from './pages/user/ResetPassword';
import AdminLogin from './pages/admin/AdminLogin';

//User Components
import UserDashboard from './pages/user/UserDashboard';

//Admin Components
import AdminDashboard from './pages/admin/AdminDashboard';
import NewSeasonForm from './pages/admin/season/NewSeasonForm';
import EditSeasonList from './pages/admin/season/EditSeasonList';
import EditSeasonForm from './pages/admin/season/EditSeasonForm';
import NewCardForm from './pages/admin/card/NewCardForm';
import EditCardForm from './pages/admin/card/EditCardForm';
import EditBidsForm from './pages/admin/bids/EditBidsForm';
import CardTable from './pages/admin/card/CardTable';
import EditUser from './pages/admin/user/EditUser';
import SendEmail from './pages/admin/user/SendEmail';

import './App.css';

function App() {
	const { userId, token, isAdmin, login, logout } = useAuth();

	const routes = (
		<Switch>
			<Route path='/' exact component={Index} />
			<Route path='/season/:seasonID/card/:cardID' component={Index} />
			<Route path='/pastcards' exact component={PastCards} />
			<Route path='/rules' exact component={Rules} />
			<Route path='/maintenance' exact component={Maintenance} />
			<Route path='/500' exact component={ErrorPage} />
			<Route path='/login' exact component={Login} />
			<Route path='/forgotpassword' exact component={ForgotPassword} />
			<Route
				path='/resetpassword/:resetToken'
				exact
				component={ResetPassword}
			/>
			<Route path='/admin' exact component={AdminLogin} />
			<ProtectedRoute
				path='/user/:userID'
				exact
				component={UserDashboard}
				userRoute
			/>
			<ProtectedRoute
				path='/admin/dashboard'
				exact
				component={AdminDashboard}
				adminRoute
			/>
			<ProtectedRoute
				path='/admin/season/new'
				exact
				component={NewSeasonForm}
				adminRoute
			/>
			<ProtectedRoute
				path='/admin/season/:seasonID/edit'
				exact
				component={EditSeasonForm}
				adminRoute
			/>
			<ProtectedRoute
				path='/admin/season/:seasonID/card/new'
				exact
				component={NewCardForm}
				adminRoute
			/>
			<ProtectedRoute
				path='/admin/season/:seasonID/card/:cardID/edit'
				exact
				component={EditCardForm}
				adminRoute
			/>
			<ProtectedRoute
				path='/admin/season/:seasonID/card/:cardID/table'
				exact
				component={CardTable}
				adminRoute
			/>
			<ProtectedRoute
				path='/admin/season/:seasonID/card/:cardID/fight/:fightID/edit'
				exact
				component={EditBidsForm}
				adminRoute
			/>
			<ProtectedRoute
				path='/admin/season'
				exact
				component={EditSeasonList}
				adminRoute
			/>
			<ProtectedRoute
				path='/admin/user/edit'
				exact
				component={EditUser}
				adminRoute
			/>
			<ProtectedRoute
				path='/admin/user/email'
				exact
				component={SendEmail}
				adminRoute
			/>
			<Redirect to='/' />
		</Switch>
	);

	return (
		<div className='App'>
			<AuthContext.Provider
				value={{
					isLoggedIn: !!token,
					isAdmin,
					token,
					userId,
					login,
					logout
				}}>
				<BrowserRouter>
					<PageGrid>{routes}</PageGrid>
				</BrowserRouter>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
