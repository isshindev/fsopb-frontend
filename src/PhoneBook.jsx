import React, { useEffect, useState } from 'react';
import { Input as TextInput, Button, Form, Header, List, Notification } from './components';
import phonebookService from './services/phonebook';

export default function PhoneBook() {
    const [people, setPeople] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [keyword, setKeyword] = useState("");
    const [notification, setNotification] = useState();

    const filtered = !keyword
        ? people
        : people.filter(p => p.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));

    function addOrUpdate() {
        const oldPerson = people.find(p => p.name === newName);
        if (oldPerson) {
            updatePerson(oldPerson);
        } else {
            addPerson();
        }
    }

    function addPerson() {
        const newPerson = {
            name: newName,
            number: newNumber,
        };
        phonebookService.create(newPerson)
            .then(person => {
                setPeople(people.concat(person));
                setNewName("");
                setNewNumber("");
                showNotification("success", `Successfully created ${person.name}!`)
            })
            .catch(error => showError(error));
    }

    function updatePerson(oldPerson) {
        const oldPersonWithNewNumber = {
            ...oldPerson,
            number: newNumber,
        };
        phonebookService.update(oldPersonWithNewNumber)
            .then(person => {
                setPeople(people.map(p => p.id === person.id ? person : p))
                showNotification("success", `Successfully updated ${person.name}!`)
            })
            .catch(error => showError(error));
    }

    function showError(error) {
        showNotification("error", error.response ? error.response.data.error : error.message)
    }

    function showNotification(type, message) {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    }

    function handleDelete(person) {
        if (window.confirm("Are you sure you want to delete " + person.name)) {
            phonebookService
                .deletePerson(person)
                .then(response => {
                    let personRemoved = people.filter(p => p.id !== person.id);
                    setPeople([...personRemoved]);
                    showNotification("success", `Successfully deleted ${person.name}`);
                })
                .catch(error => showNotification("error", error));
        }
    }

    useEffect(() => {
        phonebookService
            .getAll()
            .then(data => setPeople(data))
            .catch(error => showNotification("error", error.message));
    }, []);


    return (
        <div>
            <Notification data={notification} />
            <Header grade="1">PhoneBook</Header>
            <TextInput label="filter shown with" value={keyword} onTextChange={setKeyword} />
            <Header grade="2">Add New</Header>
            <Form onSubmit={addOrUpdate} >
                <TextInput label="name" value={newName} onTextChange={setNewName} />
                <TextInput label="number" value={newNumber} onTextChange={setNewNumber} />

                <Button type="submit">add</Button>
            </Form>

            <Header grade="2">Numbers</Header>
            <List>
                {filtered.map((person => (
                    <List.Item key={person.id}>
                        {person.name} {person.number}
                        <Button onClick={() => handleDelete(person)}>Delete</Button>
                    </List.Item>
                )))}
            </List>
        </div>
    );
}

