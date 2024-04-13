interface ButtonProps {
    btnType?: string; // The type of button (e.g. primary, secondary, neutral)
    url?: string; // The URL to link to
    className?: string; // The class name to pass to the button
    label: string; // The text to display on the button
}

export default function Button(props : ButtonProps) {

    const { btnType, url, className, label } = props;

    if (className && url) {
        return <a href={url} className={`btn ${btnType && "btn-" + btnType}` + " " + className}>{label}</a>
    }
    if (className) {
        return <a className={`btn ${btnType && "btn-" + btnType}` + " " + className}>{label}</a>
    }
    if (url) {
        return <a href={url} className={`btn ${btnType && "btn-" + btnType}`}>{label}</a>
    }
    return <a className={`btn ${btnType && "btn-" + btnType}`}>{label}</a>
}