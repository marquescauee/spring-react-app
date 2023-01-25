function Form({ botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar }) {
    return (
        <form>
            <input type='text' value={obj.name} onChange={eventoTeclado} name="name" placeholder="Name" className="form-control"></input>
            <input type='text' value={obj.brand} onChange={eventoTeclado} name="brand" placeholder="Brand" className="form-control"></input>

            {
                botao

                ?

                <input type='button' value='Cadastrar' onClick={cadastrar} className="btn btn-primary"></input>
                
                :

                <div>
                    <input type='button' onClick={alterar} value='Alterar' className="btn btn-warning"></input>
                    <input type='button' onClick={remover} value='Remover' className="btn btn-danger"></input>
                    <input type='button' onClick={cancelar} value='Cancelar' className="btn btn-secondary"></input>
                </div>
            }

        </form>
    )
}

export default Form;