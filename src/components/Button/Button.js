import "./button.sass"

export default function Button({label, onClick}){
    return <button
        onClick={onClick}
        className="custom-button"
    >
        <div className="plus">+</div>
        <div className="label">{label}</div>
    </button>
}