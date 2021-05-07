function CreateRecipeForm(props: any) {
    return (
        <div className="section">
            <div className="field">
                <label className="label" htmlFor="recipe-name-input">
                    Name
                </label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Name vom Rezept"
                        id={"recipe-name-input"}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateRecipeForm;
