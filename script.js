// Constructor Function
function Guest(name, roomNumber, stayTime) {
    this.name = name;
    this.roomNumber = roomNumber;
    this.stayTime = stayTime;
}
// Guest Data
const guests = [
    new Guest("Jayden Lindon", 401, 2),
    new Guest("Aiden Lindon", 402, 3),
    new Guest("Kayden Lindon", 403, 2)
];

const form = document.getElementById("checkInForm");
const guestListDiv = document.getElementById("guestList");
const messageDiv = document.getElementById("message");

// Function to render guests 
function renderGuestList() {
    guestListDiv.innerHTML = "";
    guests.forEach(guest => {
        const card = document.createElement("div");
        card.classList.add("guest-card");
        card.innerHTML = `
          <h3>${guest.name}</h3>
          <p>Room: <strong>${guest.roomNumber}</strong></p>
          <p>Stay: ${guest.stayTime} night(s)</p>
        `;
        guestListDiv.appendChild(card);
    });
}
// Display list on load
renderGuestList();

form.addEventListener("submit", function (e) {
      e.preventDefault();
      messageDiv.textContent = "";
      messageDiv.className = "";

      // Get values
      const name = document.getElementById("guestName").value.trim();
      const room = parseInt(document.getElementById("roomNumber").value);
      const stay = parseInt(document.getElementById("stayTime").value);

      // Input fields
      if (!name || !room || !stay) {
        messageDiv.textContent = "Please fill in all fields.";
        messageDiv.className = "error";
        return;
      }

      // Check for availability
      const roomTaken = guests.some(g => g.roomNumber === room);
      if (roomTaken) {
        messageDiv.textContent = "Room " + room + " is already occupied! Please choose another.";
        messageDiv.className = "error";
        return;
      }

      // Add new guest
      const newGuest = new Guest(name, room, stay);
      guests.push(newGuest);

      // Update list
      renderGuestList();

      // Success message
      messageDiv.textContent = "Guest checked in successfully!";
      messageDiv.className = "success";

      // Clear inputs
      form.reset();
    });