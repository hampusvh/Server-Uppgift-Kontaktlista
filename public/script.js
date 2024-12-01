const API_URL = "http://localhost:5001/api/contacts";


document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch("http://localhost:5001/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error("Inloggning misslyckades!");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("Inloggad!");
    } catch (error) {
        console.error("Error:", error);
        alert("Felaktiga inloggningsuppgifter.");
    }
});

document.getElementById("create-contact").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    try {
        const token = localStorage.getItem("token");
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, phone, email }),
        });

        if (!response.ok) {
            throw new Error("Kunde inte skapa kontakt");
        }

        alert("Kontakt skapad!");
        getContacts();
    } catch (error) {
        console.error("Error:", error);
        alert("Fel vid skapande av kontakt.");
    }
});

const getContacts = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Kunde inte hämta kontakter");
        }

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
        alert("Kunde inte hämta kontakter.");
    }
};

const deleteContact = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Kunde inte radera kontakt");
        }

        alert("Kontakt raderad!");
        getContacts();
    } catch (error) {
        console.error("Error:", error);
        alert("Fel vid radering av kontakt.");
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
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, phone, email }),
        });

        if (!response.ok) {
            throw new Error("Kunde inte uppdatera kontakt");
        }

        alert("Kontakt uppdaterad!");
        getContacts();
    } catch (error) {
        console.error("Error:", error);
        alert("Fel vid uppdatering av kontakt.");
    }
};

document.getElementById("get-contacts").addEventListener("click", getContacts);
