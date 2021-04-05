import './App.sass';
import Header from './landing/Header';
import ListOfRecipes from './landing/ListOfRecipes'
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
              <Route path="/receipts/3">
                  <RecipeDetails 
                    durantion={300}
                    id={500}
                    ingredients={[]}
                    name={"Schniposa"} />
              </Route>
          </Switch>
          <ListOfRecipes />

      </BrowserRouter>
  );
}

export default App;
