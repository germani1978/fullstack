function Filter({ handleFilter, nameFilter }) {
    return <input onChange={handleFilter} value={nameFilter} />
}

export default Filter
