import { Color, ColoredBox, ColoredBoxProps } from "./ColoredBox";
import { render } from "@testing-library/react";

describe("ColoredBox", () => {
    it("has background color from props", () => {
        const { span } = setUp();
        expect(span.style.backgroundColor).toBe(Color.Red);
    });
    it("has title when passed in", () => {
        const expectedTitle = "xyz";
        const props = getExtendedTextInputProps({
            title: expectedTitle,
        });
        const { span } = setUp(props);
        expect(span.title).toBe(expectedTitle);
    });
    it("has not title when not passed in", () => {
        const props = getExtendedTextInputProps({
            title: undefined,
        });
        const { span } = setUp(props);
        expect(span.title).toBe("");
    });
});

function setUp(props?: ColoredBoxProps) {
    const renderProps = props || getExtendedTextInputProps({});
    const utils = render(<ColoredBox {...renderProps} />);
    const span = utils.getByText(renderProps.text) as HTMLSpanElement;
    return {
        span,
        ...utils,
    };
}

function getExtendedTextInputProps(
    extension: Partial<ColoredBoxProps>
): ColoredBoxProps {
    return {
        color: Color.Red,
        text: 2,
        title: "red",
        ...extension,
    };
}
