import { useState } from "react"

const Lista = () => {
    const [textInput, setTextInput] = useState("");
    const [quehacer, setQuehaceres] = useState(getLista());

    function getLista() {
        var storedArray = localStorage.getItem('localToDoList');
        if (storedArray == null) {
            return [];
        } else {
            return JSON.parse(storedArray);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setQuehaceres((quehacerActual) => {
            return [
                ...quehacerActual,
                { id: crypto.randomUUID(), title: textInput, completed: false },
            ]
        })
        guardarLista(quehacer);
        setTextInput("");
    }

    function guardarLista(plist) {
        localStorage.setItem('localToDoList', JSON.stringify(plist));
    }


    function checkToDo(id, completed) {
        setQuehaceres(quehacerActual => {
            return quehacerActual.map(toDo => {
                if (toDo.id === id) {
                    toDo.completed = completed;
                    return { ...toDo, completed }
                }
                return toDo;
            })
        })
    }

    function eliminarToDO() {
        setQuehaceres(quehacerActual => {
            return quehacerActual.filter(toDo => !toDo.completed);
        })
        guardarLista(quehacer);
    }

    function eliminarLista() {
        setQuehaceres([]);
        guardarLista(quehacer);
    }


    return (
        <div className="lista">
            <h1>Lista de quehaceres</h1>
            <form onSubmit={handleSubmit} className="input">
                <input type="text" placeholder="Tarea" value={textInput} onChange={(event) => {
                    setTextInput(event.target.value);
                }} />
                <button>Crear nuevo</button>
            </form>
            <div className="checkbox">
                <ul className="TodoList">
                    {quehacer.map(toDo => {
                        return (
                            <li key={toDo.id}>
                                <label>
                                    <input type="checkbox" checked={toDo.completed} onChange={event => {
                                        checkToDo(toDo.id, event.target.checked)
                                    }}></input>
                                    {toDo.title}
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="btnEliminar">
                <button className="btn" onClick={() => {
                    eliminarLista();
                }}>Eliminar todo</button>
                <button className="btn" onClick={() => {
                    eliminarToDO();
                }}>Eliminar completados</button>
            </div>
        </div>
    );
};

export default Lista;

/*
    const lista = ["Claudia", "Patricia", "Daniel", "Rodrigo"];
                {
                    quehacer !== "" && <h1>Checkbox: {quehacer}</h1>

                }
                <form>
                    <input type="checkbox" class="quehaceres" />
                    <label>quehacer 1</label>
                </form>
*/