import "./input.sass"

export default function Input({label, name, value, onChange}) {
    function change({target}){
        if(!onChange) return
        onChange(target.value)
    }
    return <fieldset
        className="custom-input"
    >
        {label && <legend>{label}</legend>}
        <input name={name} onChange={change} defaultValue={value}/>
    </fieldset>
}