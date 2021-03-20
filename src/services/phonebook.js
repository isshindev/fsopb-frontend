import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

function getAll() {
    return axios
        .get(baseUrl)
        .then(response => response.data);
}

function create(person) {
    return axios
        .post(baseUrl, person)
        .then(response => response.data);
}

function deletePerson(person) {
    return axios
        .delete(baseUrl + `/${person.id}`)
}

function update(person) {
    return axios
        .put(baseUrl + `/${person.id}`, person)
        .then(response => response.data);
}

export default { getAll, create, deletePerson, update};