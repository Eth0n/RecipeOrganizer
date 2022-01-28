import { AddSingleStep } from "./AddSingleStep";
import { SingleStep } from "./SingleStep";
import { Step } from "../interfaces/interfaces";
import { useEffect, useState } from "react";
import { Api } from "../../api/Api";
import { IUnit } from "../../interfaces/interfaces";

export interface ListOfStepsProps {
    list: Step[];
    addStepToList: (createdStep: Step) => void;
}

export function ListOfSteps(props: ListOfStepsProps) {
    const [availableUnits, setAvailableUnits] = useState<IUnit[]>([]);

    useEffect(() => {
        Api.getAllUnits().then((units) => {
            setAvailableUnits(units);
        });
    }, [availableUnits.length]);

    return (
        <>
            <AddSingleStep
                availableUnits={availableUnits}
                onStepAdded={props.addStepToList}
            />
            {props.list.length > 0 && (
                <div className="box">
                    {props.list.map((listItem) => {
                        return (
                            <SingleStep
                                availableUnits={availableUnits}
                                key={listItem.id}
                                step={listItem}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}
