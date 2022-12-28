import { useEffect, useState } from "react";
import { Api } from "../api/Api";
import { IShortRecipe } from "../interfaces/interfaces";
import  RecipeCard from "./recipeCard/RecipeCard";

function ListOfRecipes() {

    const [list, setList] = useState<IShortRecipe[]>([]);

    useEffect(() => {
        Api.getRecipes().then((recipes) => {
            setList(recipes);
        });
    }, []);

    return (
        <div className="section">
                <div className="tile">
                    {list.map((recipe: IShortRecipe) => {
                        return (
                            <RecipeCard key={recipe.links.self.href} {...recipe} />
                        );
                    })}
                </div>
        </div>
    );
}

export default ListOfRecipes;