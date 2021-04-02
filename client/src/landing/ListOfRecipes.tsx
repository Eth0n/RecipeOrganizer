import { useEffect, useState } from "react";
import { Api } from "../api/Api";
import { IShortRecipe } from "../interfaces/interfaces";
import  RecipeCard from "./RecipeCard";

function ListOfRecipes() {

    const mockList : IShortRecipe[] = [
        {
            name: "First recipe",
            duration: 200,
            id: 999
        },
        {
            name: "Second recipe",
            id: 998,
            duration: 300,
        }
    ]
    const [list, setList] = useState<IShortRecipe[]>([...mockList]);

    useEffect(() => {
        Api.getRecipes().then((recipes) => {
            setList(recipes);
        });
    }, []);

    return (
        <div className="section">
            <div className="tile">
                {list.map((recipe: IShortRecipe) => {
                    return <RecipeCard 
                        key={recipe.id}
                        {...recipe}
                    />
                })}
            </div>
        </div>
    );
}

export default ListOfRecipes;