import "./App.sass";
import Header from "./landing/Header";
import ListOfRecipes from "./listOfRecipes/ListOfRecipes";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import RecipeDetails from "./recipeDetails/RecipeDetails";
import CreateRecipeForm from "./createRecipe/CreateRecipeForm";

function App() {
    return (
        <BrowserRouter>
            <Header>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/createRecipe">Neues Rezept</Link>
                    </li>
                </ul>
            </Header>

            <Switch>
                <Route path="/receipts/:id" component={RecipeDetails} />
                <Route path="/" exact={true} component={ListOfRecipes} />
                <Route path="/createRecipe" component={CreateRecipeForm} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
