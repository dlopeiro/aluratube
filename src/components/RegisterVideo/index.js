import React from "react";
import { StyledRegisterVideo } from "./styles";

// this is a Custom Hook
function useForm(formProps) {
    const [values, setValues] = React.useState(formProps.initialValues);

    return {
        values,
        handleChange: (event) => {
            const value = event.target.value;
            const name = event.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

export default function RegisterVideo() {
    const formAdd = useForm({
        initialValues: { title: "", url: "" }
    });
    const [formVisible, setFormVisible] = React.useState(false);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisible(true)}> 
                +
            </button>
            {/* ternário */}
            {/* operadores de curto-circuito */}
            {formVisible
                ? (
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        console.log(formAdd.values);
                        setFormVisible(false);
                        formAdd.clearForm();
                    }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisible(false)}>
                            X
                        </button>
                        <input
                            placeholder="Video title"
                            name="title"
                            value={formAdd.values.title}
                            onChange={formAdd.handleChange}
                        />
                        <input
                            placeholder="URL"
                            name="url"
                            value={formAdd.values.url}
                            onChange={formAdd.handleChange}
                        />
                        <button type="submit">
                            Upload
                        </button>
                    </div>
                </form>
                )
                : false}
        </StyledRegisterVideo>
    );
};
