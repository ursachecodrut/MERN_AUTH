import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Routing
import PrivateRoute from './components/routing/PrivateRoute';

// Screens
import PrivateRoute from './components/screens/PrivateScreen';
import LoginRoute from './components/screens/LoginScreen';
import RegisterRoute from './components/screens/RegisterScreen';

const App = () => {
	return (
		<Router>
			<div className="app">
				<Switch>
					<PrivateRoute exact path="/" component={PrivateScreen} />
					<Route exact path="/login" component={LoginScreen} />
					<Route exact path="/register" component={RegisterScreen} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
