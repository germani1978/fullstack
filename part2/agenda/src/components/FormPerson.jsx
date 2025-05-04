const FormPerson = ({
    handleForm,
    handleInputName,
    newName,
    handleInputPhone,
    newPhone
}) => (
    <form onSubmit={handleForm}>
        <div>
            name: <input onChange={handleInputName} value={newName} />
        </div>
        <div>
            number: <input onChange={handleInputPhone} value={newPhone} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default FormPerson
