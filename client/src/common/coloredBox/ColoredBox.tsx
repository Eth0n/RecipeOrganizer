export enum Color {
    Red = "red",
    Blue = "blue",
}

export interface ColoredBoxProps {
    color: Color;
    text: string | number;
    title?: string;
}

export function ColoredBox(props: ColoredBoxProps) {
    return (
        <span
            style={{
                backgroundColor: props.color,
                color: "white",
            }}
            title={props.title || ""}
        >
            {props.text}
        </span>
    );
}
