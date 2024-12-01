const API_URL = "http://localhost:5001/api/contacts";


document.getElementById("create-contact").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value; 
    const email = document.getElementById("email").value;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, email }),
        });
        const result = await response.json();
        alert("Kontakt skapad!");
        console.log(result);
        getContacts();
    } catch (error) {
        console.error("Error:", error);
    }
});


const getContacts = async () => {
    try {
        const response = await fetch(API_URL);
        const contacts = await response.json();
        const contactsList = document.getElementById("contacts-list");
        contactsList.innerHTML = "";

        contacts.forEach((contact) => {
            const li = document.createElement("li");
            li.textContent = `${contact.name} - ${contact.phone} - ${contact.email}`;


            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Radera";
            deleteButton.addEventListener("click", () => deleteContact(contact._id));

  
            const editButton = document.createElement("button");
            editButton.textContent = "Redigera";
            editButton.addEventListener("click", () => editContact(contact._id));

            li.appendChild(deleteButton);
            li.appendChild(editButton);
            contactsList.appendChild(li);
        });
    } catch (error) {
        console.error("Error:", error);
    }
};


const deleteContact = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Kontakt raderad!");
            getContacts();
        } else {
            alert("Kunde inte radera kontakten");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};


const editContact = async (id) => {
    const name = prompt("Ange nytt namn:");
    const phone = prompt("Ange nytt telefonnummer:");
    const email = prompt("Ange ny e-post");

    if (!name || !phone || !email) {
        alert("Alla fält måste vara ifyllda!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, email }),
        });

        if (response.ok) {
            alert("Kontakt uppdaterad!");
            getContacts();
        } else {
            alert("Kunde inte uppdatera kontakten");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

document.getElementById("get-contacts").addEventListener("click", getContacts);
