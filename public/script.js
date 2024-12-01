const API_URL = "http://localhost:5001/api/contacts";

document.getElementById("create-contact-form").addEventListener("submit", async (e) => {
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

    } catch (error) {
        console.error("Error:", error);
    }
});

document.getElementById("get-contacts").addEventListener("click", async () => {
    try {
        const response = await fetch(API_URL);
        const contacts = await response.json();
        const contactsList = document.getElementById("contacts-list");
        contactsList.innerHTML = "";
        
        contacts.ferEach((contact) => {
            const li = document.createElement("li");
            li.textContent = `${contact.name} - ${contact.phone} - ${contact.email}`;
            contactsList.appendChild(li);

        });
    } catch (error) {
        console.error("Error:", error);
    }
});