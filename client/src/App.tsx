import './App.sass';
import Header from './landing/Header';
import ListOfRecipes from './listOfRecipes/ListOfRecipes'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import RecipeDetails from './recipeDetails/RecipeDetails';

function App() {
  return (
      <BrowserRouter>
          <Header>
              <ul>
                  <li>
                      <Link to="/">Home</Link>
                  </li>
              </ul>
          </Header>

          <Switch>
              <Route path="/receipts/:id" component={RecipeDetails} />
              <Route path="/" exact={true} component={ListOfRecipes} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
