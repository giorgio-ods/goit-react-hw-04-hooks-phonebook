import { useState, useEffect } from "react";
import Input from "./Components/Input/Input";
import ContactsList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";
import { nanoid } from "nanoid";

function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("contacts")) ?? [
        { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
        { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
        { id: "id-3", name: "Eden Clements", number: "645-17-79" },
        { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
      ]
    );
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleInputChange = (data) => {
    const { name, phone } = data;
    const addNewContact = {
      id: nanoid(),
      name,
      phone,
    };

    const checkName = contacts.find(
      (cont) => cont.name.toLowerCase() === name.toLowerCase()
    );

    if (checkName) {
      alert(
        "This name has already been added to your contact list. Please check it "
      );
      return;
    }

    setContacts([...contacts, addNewContact]);
  };

  const filterContacts = () => {
    const modified = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(modified)
    );
  };

  const refreshFilter = (evt) => {
    setFilter(evt.currentTarget.value);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Input onSubmit={handleInputChange} />
      <h3>Contacts list</h3>
      <Filter value={filter} onChange={refreshFilter} />
      <ContactsList contacts={filterContacts()} onChange={deleteContact} />
    </div>
  );
}

export default App;
