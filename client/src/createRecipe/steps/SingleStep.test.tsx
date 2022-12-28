import {
    SingleStep,
    SingleStepProps,
    UiTextDelete,
    UiTextEdit,
} from "./SingleStep";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getMockStep } from "../../tests/integration/mocks/MockStep";
import { NO_OP } from "../../tests/integration/mocks/MockHandler";

describe("SingleStep.test.tsx", () => {
    xit("shows a the number of the step in front of the step", () => {});
    it("shows the description", async () => {
        const description = "my description";
        render(
            <SingleStep
                {...getExtendedSingleStepProps({
                    step: getMockStep({ description }),
                })}
            />
        );
        await screen.findByText(description, { exact: true });
    });
    it("click on edit button show the Edit mode of the step", async () => {
        render(<SingleStep {...getExtendedSingleStepProps()} />);

        const editButton = screen.getByText(UiTextEdit);
        userEvent.click(editButton);

        const deleteButton = screen.queryByText(UiTextDelete, { exact: true });
        expect(deleteButton).toBeNull();

        const editButtonAfterClick = screen.queryByText(UiTextEdit, {
            exact: true,
        });
        expect(editButtonAfterClick).toBe(null);
    });

    function getExtendedSingleStepProps(
        extension?: Partial<SingleStepProps>
    ): SingleStepProps {
        return {
            step: getMockStep({}),
            availableUnits: [],
            deleteStep: NO_OP,
            ...extension,
        };
    }
});
