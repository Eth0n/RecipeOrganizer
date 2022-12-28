import React, { Fragment, useState } from "react";
import { AutoCompleter } from "./AutoCompleter";
import "./AutoComplete.css";
import { Path, UseFormRegister } from "react-hook-form";
import { IFormValues } from "../../createRecipe/interfaces/interfaces";
import { Key } from "ts-key-enum";

export interface AutocompleteProps {
    formName: Path<IFormValues>;
    suggestions: string[];
    label: string;
    placeholder: string;
    onPickIngredient: (ingredient: string) => void;
    register?: UseFormRegister<IFormValues>;
}

export interface AutocompleteState {
    activeSuggestion: number;
    filteredSuggestions: string[];
    showSuggestions: boolean;
    userInput: string;
}

export function Autocomplete(props: AutocompleteProps) {
    const [autoCompleteState, setAutoCompleteState] =
        useState<AutocompleteState>({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: "",
        });

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const userInput = event.target.value;
        setAutoCompleteState({
            activeSuggestion: 0,
            filteredSuggestions: AutoCompleter.getFilteredSuggestions(
                userInput,
                props.suggestions
            ),
            showSuggestions: true,
            userInput,
        });
    }

    function onClick(event: React.MouseEvent<HTMLLIElement>) {
        const pickedOption = event.currentTarget.textContent || "";
        props.onPickIngredient(pickedOption);
        setAutoCompleteState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: pickedOption,
        });
    }

    function onKeyDown(event: React.KeyboardEvent) {
        const key = event.key as Key;
        const newState = AutoCompleter.onKeyDown(autoCompleteState, key);
        if (newState) {
            setAutoCompleteState(newState);
            props.onPickIngredient(newState.userInput);
        }
    }

    function getSuggestionListComponent() {
        const {
            activeSuggestion,
            filteredSuggestions,
            showSuggestions,
            userInput,
        } = autoCompleteState;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }
                            return (
                                <li
                                    className={className}
                                    key={suggestion}
                                    onClick={onClick}
                                >
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>No suggestions available.</em>
                    </div>
                );
            }
        }
        return suggestionsListComponent;
    }

    const labelFor = `recipe-${props.label.toLowerCase()}-autocomplete-input`;

    return (
        <Fragment>
            <div className="field">
                <label className="label" htmlFor={labelFor}>
                    {props.label}
                </label>
                <div className="control">
                    <input
                        {...props.register?.(props.formName)}
                        className="input"
                        type="text"
                        placeholder={props.placeholder}
                        id={labelFor}
                        value={autoCompleteState.userInput}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                    />
                </div>
            </div>

            {getSuggestionListComponent()}
        </Fragment>
    );
}
