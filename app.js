const SUPABASE_URL = "https://dtzqacynctupawaguitf.supabase.com/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0enFhY3luY3R1cGF3YWd1aXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5NTMyNDgsImV4cCI6MjEwOTUyOTI0OH0.Vjoevh-GYI9JkKxWBgH-CqKufs3DHNB2vb8LZtY79rA";

/* =========================================
   HEALTHCARE PLUS - APPOINTMENT SYSTEM
   ========================================= */

// 1. HOSPITAL DETAILS
const hospitals = [
    { name: "City Care Hospital", location: "Bengaluru" },
    { name: "Apollo Hospital", location: "Bengaluru" },
    { name: "Manipal Hospital", location: "Bengaluru" },
    { name: "Fortis Hospital", location: "Bengaluru" },
    { name: "Narayana Health", location: "Bengaluru" },
    { name: "Aster CMI Hospital", location: "Bengaluru" },
    { name: "Sakra World Hospital", location: "Bengaluru" },
    { name: "People Tree Hospital", location: "Bengaluru" },
    { name: "KIMS Hospital", location: "Bengaluru" },
    { name: "BGS Gleneagles Hospital", location: "Bengaluru" },
    { name: "Vikram Hospital", location: "Mysuru" },
    { name: "JSS Hospital", location: "Mysuru" },
    { name: "KMC Hospital", location: "Mangaluru" },
    { name: "AJ Hospital", location: "Mangaluru" },
    { name: "Hubli Hospital", location: "Hubballi" },
    { name: "District Hospital", location: "Belagavi" }
];

// 2. DOCTOR DETAILS
const doctors = [
    { id: 1, name: "Dr. Arun Kumar", specialty: "Cardiologist", qualification: "MBBS, MD", experience: "12 years", treats: "heart", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Dr. Priya Sharma", specialty: "Dermatologist", qualification: "MBBS, MD", experience: "10 years", treats: "skin", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: "Dr. Ravi Shetty", specialty: "Neurologist", qualification: "MBBS, DM", experience: "15 years", treats: "brain", photo: "https://randomuser.me/api/portraits/men/46.jpg" },
    { id: 4, name: "Dr. Sneha Rao", specialty: "Pediatrician", qualification: "MBBS, MD", experience: "8 years", treats: "child", photo: "https://randomuser.me/api/portraits/women/68.jpg" },
    { id: 5, name: "Dr. Kiran Raj", specialty: "Orthopedic", qualification: "MBBS, MS", experience: "11 years", treats: "bone", photo: "https://randomuser.me/api/portraits/men/52.jpg" },
    { id: 6, name: "Dr. Meera Nair", specialty: "Gynecologist", qualification: "MBBS, MS", experience: "9 years", treats: "women", photo: "https://randomuser.me/api/portraits/women/32.jpg"},
    { id: 7, name: "Dr. Sanjay Rao", specialty: "Dentist", qualification: "BDS, MDS", experience: "7 years", treats: "teeth", photo: "https://randomuser.me/api/portraits/men/75.jpg" },
    { id: 8, name: "Dr. Anjali Das", specialty: "ENT Specialist", qualification: "MBBS, MS", experience: "10 years", treats: "ear", photo: "https://randomuser.me/api/portraits/women/45.jpg" },
    { id: 9, name: "Dr. Mohan Kumar", specialty: "General Physician", qualification: "MBBS, MD", experience: "14 years", treats: "general", photo: "https://randomuser.me/api/portraits/men/68.jpg" },
    { id: 10, name: "Dr. Divya Menon", specialty: "Psychiatrist", qualification: "MBBS, MD", experience: "8 years", treats: "mental", photo: "https://randomuser.me/api/portraits/women/11.jpg" },
    { id: 11, name: "Dr. Akash Patel", specialty: "Urologist", qualification: "MBBS, MS", experience: "9 years", treats: "urine", photo: "https://randomuser.me/api/portraits/women/12.jpg" },
    { id: 12, name: "Dr. Kavya Reddy", specialty: "Ophthalmologist", qualification: "MBBS, MS", experience: "10 years", treats: "eye", photo: "https://randomuser.me/api/portraits/men/15.jpg"},
    { id: 13, name: "Dr. Nitin Rao", specialty: "Pulmonologist", qualification: "MBBS, MD", experience: "13 years", treats: "lung", photo:"https://randomuser.me/api/portraits/women/25.jpg" },
    { id: 14, name: "Dr. Pooja Shetty", specialty: "Endocrinologist", qualification: "MBBS, DM", experience: "8 years", treats: "diabetes", photo: "https://randomuser.me/api/portraits/men/22.jpg" },
    { id: 15, name: "Dr. Varun Shah", specialty: "Gastroenterologist", qualification: "MBBS, DM", experience: "12 years", treats: "stomach", photo: "https://randomuser.me/api/portraits/women/36.jpg" },
    { id: 16, name: "Dr. Neha Rao", specialty: "Oncologist", qualification: "MBBS, MD", experience: "11 years", treats: "cancer", photo: "https://randomuser.me/api/portraits/men/40.jpg" },
    { id: 17, name: "Dr. Suresh Babu", specialty: "General Physician", qualification: "MBBS", experience: "6 years", treats: "general", photo: "https://randomuser.me/api/portraits/women/50.jpg" },
    { id: 18, name: "Dr. Asha Kumar", specialty: "Cardiologist", qualification: "MBBS, MD", experience: "9 years", treats: "heart", photo: "https://randomuser.me/api/portraits/men/55.jpg" }
];

let patient = {};
let selectedDoctor = null;
let currentBooking = null;

// 3. LOCAL STORAGE FUNCTIONS
function getBookings() {
    try {
        return JSON.parse(localStorage.getItem("doctorBookings")) || [];
    } catch (error) {
        return [];
    }
}

function saveBookings(bookings) {
    localStorage.setItem("doctorBookings", JSON.stringify(bookings));
}

// 4. PAGE NAVIGATION
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.remove("hidden");
        window.scrollTo(0, 0);
    }

    if (pageId === "dashboardPage") {
        refreshDashboard();
    }

    if (pageId === "bookingPage") {
        updateAvailableSlots();
    }
}

// 5. HTML SAFETY
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function localDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// 6. LOGIN
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("loginName").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
        alert("Please enter your name and email.");
        return;
    }

    patient.name = name;
    patient.email = email;

    document.getElementById("welcomeName").textContent = name;

    const patientNameInput = document.getElementById("patientName");
    if (patientNameInput) {
        patientNameInput.value = name;
    }

    showPage("dashboardPage");
});

// 7. PATIENT DETAILS
document.getElementById("patientForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    patient.name = document.getElementById("patientName").value.trim();
    patient.dob = document.getElementById("dob").value;
    patient.gender = document.getElementById("gender").value;
    patient.mobile = document.getElementById("mobile").value.trim();
    patient.address = document.getElementById("address").value.trim();
    patient.location = document.getElementById("patientLocation").value;
    patient.disease = document.getElementById("disease").value;
    patient.duration = document.getElementById("duration").value;
    patient.symptoms = document.getElementById("symptoms").value.trim();

    if (!patient.name || !patient.dob || !patient.mobile || !patient.disease) {
        alert("Please fill in all required patient details.");
        return;
    }

    if (new Date(patient.dob) >= new Date()) {
        alert("Please enter a valid date of birth.");
        return;
    }

    const summary = document.getElementById("patientSummary");
    if (summary) {
        summary.innerHTML = `
            <p><strong>Patient:</strong> ${escapeHTML(patient.name)}</p>
            <p><strong>Category:</strong> ${escapeHTML(patient.disease)}</p>
            <p><strong>Location:</strong> ${escapeHTML(patient.location)}</p>
        `;
    }

    displayDoctors();
    showPage("doctorPage");
});

// 8. DISPLAY DOCTORS
function displayDoctors() {
    const doctorList = document.getElementById("doctorList");
    if (!doctorList) return;

    const disease = String(patient.disease || "").toLowerCase();

    const matchingDoctors = doctors.filter(doctor => {
        return doctor.treats === disease ||
            doctor.specialty.toLowerCase().includes(disease);
    });

    // If no exact category match is found, show all doctors.
    const results = matchingDoctors.length ? matchingDoctors : doctors;

    doctorList.innerHTML = results.map(doctor => `
        <div class="doctor-card">
            <img src="${doctor.photo}" alt="Doctor"
                 style="width:90px;height:90px;border-radius:50%;object-fit:cover;">
            <h3>${escapeHTML(doctor.name)}</h3>
            <p>${escapeHTML(doctor.specialty)}</p>
            <p>${escapeHTML(doctor.qualification)}</p>
            <p>Experience: ${escapeHTML(doctor.experience)}</p>
            <button type="button" onclick="selectDoctor(${doctor.id})">
                Select Doctor
            </button>
        </div>
    `).join("");
}

// 9. SELECT DOCTOR
function selectDoctor(doctorId) {
    selectedDoctor = doctors.find(doctor => doctor.id === doctorId);

    if (!selectedDoctor) {
        alert("Doctor not found.");
        return;
    }

    const selectedDoctorElement = document.getElementById("selectedDoctor");

    if (selectedDoctorElement) {
        selectedDoctorElement.innerHTML = `
            <h3>${escapeHTML(selectedDoctor.name)}</h3>
            <p>${escapeHTML(selectedDoctor.specialty)}</p>
            <p>${escapeHTML(selectedDoctor.qualification)}</p>
            <p>Experience: ${escapeHTML(selectedDoctor.experience)}</p>
        `;
    }

    loadHospitals();
    showPage("bookingPage");
}

// 10. LOAD ALL HOSPITALS
function loadHospitals() {
    const hospitalSelect = document.getElementById("hospital");
    if (!hospitalSelect) return;

    hospitalSelect.innerHTML = '<option value="">Select Hospital</option>';

    hospitals.forEach(hospital => {
        hospitalSelect.innerHTML += `
            <option value="${escapeHTML(hospital.name)}">
                ${escapeHTML(hospital.name)} - ${escapeHTML(hospital.location)}
            </option>
        `;
    });

    const locationSelect = document.getElementById("hospitalLocation");

    if (locationSelect) {
        hospitalSelect.addEventListener("change", function() {
            const selectedHospital = hospitals.find(
                hospital => hospital.name === this.value
            );

            locationSelect.value = selectedHospital
                ? selectedHospital.location
                : "";
        });
    }
}

// 11. TIME SLOTS
const timeSlots = {
    Morning: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"],
    Evening: ["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"]
};

// 12. CREATE SLOT MANAGER DISPLAY
function createSlotManager() {
    const timeSlot = document.getElementById("timeSlot");

    if (!timeSlot || document.getElementById("slotManager")) return;

    const manager = document.createElement("div");
    manager.id = "slotManager";
    manager.style.marginTop = "18px";
    manager.style.padding = "15px";
    manager.style.border = "1px solid #ddd";
    manager.style.borderRadius = "10px";

    timeSlot.insertAdjacentElement("afterend", manager);
}

// 13. UPDATE AVAILABLE AND BOOKED SLOTS
function updateAvailableSlots() {
    const dateInput = document.getElementById("appointmentDate");
    const sessionInput = document.getElementById("session");
    const timeSlot = document.getElementById("timeSlot");
    const slotMessage = document.getElementById("slotMessage");

    if (!dateInput || !sessionInput || !timeSlot) return;

    createSlotManager();

    const date = dateInput.value;
    const session = sessionInput.value;
    const allSlots = timeSlots[session] || [];
    const bookings = getBookings();

    const bookedSlots = bookings.filter(booking => {
        return booking.date === date &&
            booking.doctorId === selectedDoctor?.id &&
            booking.session === session;
    });

    const bookedTimes = bookedSlots.map(booking => booking.time);

    timeSlot.innerHTML = '<option value="">Select Time Slot</option>';

    allSlots.forEach(time => {
        const isBooked = bookedTimes.includes(time);

        const option = document.createElement("option");
        option.value = time;
        option.textContent = isBooked ? `${time} - BOOKED` : `${time} - AVAILABLE`;
        option.disabled = isBooked;

        timeSlot.appendChild(option);
    });

    const manager = document.getElementById("slotManager");

    if (manager) {
        manager.innerHTML = `
            <h3>Slot Manager</h3>
            <p>
                <span style="color:green;font-weight:bold;">● AVAILABLE</span>
                &nbsp;&nbsp;
                <span style="color:red;font-weight:bold;">● BOOKED</span>
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:12px;">
                ${allSlots.map(time => {
                    const booked = bookedTimes.includes(time);

                    return `
                        <span style="
                            display:inline-block;
                            padding:10px;
                            border-radius:7px;
                            color:white;
                            background:${booked ? "#dc3545" : "#198754"};
                            font-size:13px;
                        ">
                            ${time}<br>
                            ${booked ? "BOOKED" : "AVAILABLE"}
                        </span>
                    `;
                }).join("")}
            </div>
            <p style="margin-top:12px;">
                Booked: ${bookedTimes.length} / ${allSlots.length}
            </p>
        `;
    }

    if (slotMessage) {
        slotMessage.textContent = bookedTimes.length === allSlots.length &&
            allSlots.length > 0
            ? "All slots are booked for this session."
            : "Choose an available time slot.";
    }
}

// 14. DATE AND SESSION CHANGE EVENTS
document.getElementById("appointmentDate")?.addEventListener("change", function() {
    updateAvailableSlots();
});

document.getElementById("session")?.addEventListener("change", function() {
    updateAvailableSlots();
});

// 15. BOOK APPOINTMENT
document.getElementById("bookingForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!selectedDoctor) {
        alert("Please select a doctor first.");
        return;
    }

    const hospital = document.getElementById("hospital").value;
    const hospitalLocation = document.getElementById("hospitalLocation").value;
    const date = document.getElementById("appointmentDate").value;
    const session = document.getElementById("session").value;
    const time = document.getElementById("timeSlot").value;

    if (!hospital || !date || !session || !time) {
        alert("Please select hospital, date, session and time slot.");
        return;
    }

    if (date < localDate(new Date())) {
        alert("Please select today or a future date.");
        return;
    }

    const bookings = getBookings();

    const alreadyBooked = bookings.some(booking =>
        booking.doctorId === selectedDoctor.id &&
        booking.date === date &&
        booking.session === session &&
        booking.time === time
    );

    if (alreadyBooked) {
        alert("Sorry! This slot has already been booked. Please select another slot.");
        updateAvailableSlots();
        return;
    }

    const token = "HC" + Date.now().toString().slice(-8);

    currentBooking = {
        token: token,
        patientName: patient.name,
        email: patient.email || "",
        dob: patient.dob || "",
        gender: patient.gender || "",
        mobile: patient.mobile || "",
        address: patient.address || "",
        patientLocation: patient.location || "",
        disease: patient.disease || "",
        duration: patient.duration || "",
        symptoms: patient.symptoms || "",
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        hospital: hospital,
        hospitalLocation: hospitalLocation,
        date: date,
        session: session,
        time: time,
        status: "Confirmed"
    };

    bookings.push(currentBooking);

    try {
        saveBookings(bookings);
    } catch (error) {
        alert("Could not save the booking. Please check your browser storage.");
        return;
    }

    showBookingReceipt(currentBooking);

    // Refresh the slot manager after booking.
    updateAvailableSlots();

    showPage("successPage");
});

// 16. SHOW BOOKING CONFIRMATION
function showBookingReceipt(booking) {
    const receipt = document.getElementById("bookingReceipt");
    if (!receipt) return;

    receipt.innerHTML = `
        <h2>Appointment Confirmed!</h2>

        <div class="token">
            <p>Your Token Number</p>
            <h2>${escapeHTML(booking.token)}</h2>
        </div>

        <h3>Patient Details</h3>
        <p><strong>Name:</strong> ${escapeHTML(booking.patientName)}</p>
        <p><strong>Email:</strong> ${escapeHTML(booking.email)}</p>
        <p><strong>Date of Birth:</strong> ${escapeHTML(booking.dob)}</p>
        <p><strong>Gender:</strong> ${escapeHTML(booking.gender)}</p>
        <p><strong>Mobile:</strong> ${escapeHTML(booking.mobile)}</p>
        <p><strong>Address:</strong> ${escapeHTML(booking.address)}</p>
        <p><strong>Patient Location:</strong> ${escapeHTML(booking.patientLocation)}</p>
        <p><strong>Category:</strong> ${escapeHTML(booking.disease)}</p>

        <hr>

        <h3>Doctor Details</h3>
        <p><strong>Doctor:</strong> ${escapeHTML(booking.doctorName)}</p>
        <p><strong>Specialization:</strong> ${escapeHTML(booking.specialty)}</p>

        <hr>

        <h3>Appointment Details</h3>
        <p><strong>Hospital:</strong> ${escapeHTML(booking.hospital)}</p>
        <p><strong>Location:</strong> ${escapeHTML(booking.hospitalLocation)}</p>
        <p><strong>Date:</strong> ${escapeHTML(booking.date)}</p>
        <p><strong>Session:</strong> ${escapeHTML(booking.session)}</p>
        <p><strong>Time:</strong> ${escapeHTML(booking.time)}</p>
        <p><strong>Status:</strong> <span style="color:green;">CONFIRMED</span></p>
    `;
}

// cANCEL APPOINTMENT FUNCTION

function cancelAppointment(token) {
  if (!confirm("Are you sure you want to cancel this appointment?")) {
    return;
  }

  let appointments = JSON.parse(
    localStorage.getItem("appointments") || "[]"
  );

  appointments = appointments.map(appointment => {
    if (appointment.token === token) {
      appointment.status = "Cancelled";
    }
    return appointment;
  });

  localStorage.setItem("appointments", JSON.stringify(appointments));

  alert("Appointment cancelled successfully!");

  location.reload();
}

// 17. DASHBOARD
function refreshDashboard() {
    const bookings = getBookings();

    const welcomeName = document.getElementById("welcomeName");
    if (welcomeName && patient.name) {
        welcomeName.textContent = patient.name;
    }

    const monthLabel = document.getElementById("monthLabel");
    const calendar = document.getElementById("calendar");

    if (monthLabel && calendar) {
        const today = new Date();
        monthLabel.textContent = today.toLocaleString("en", {
            month: "long",
            year: "numeric"
        });

        calendar.innerHTML = "";

        const days = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
        ).getDate();

        for (let day = 1; day <= days; day++) {
            const cell = document.createElement("span");
            cell.textContent = day;
            cell.style.padding = "8px";
            cell.style.textAlign = "center";

            if (day === today.getDate()) {
                cell.style.background = "#0d6efd";
                cell.style.color = "white";
                cell.style.borderRadius = "50%";
            }

            calendar.appendChild(cell);
        }
    }

    const dashboardDoctors = document.getElementById("dashboardDoctors");

    if (dashboardDoctors) {
        dashboardDoctors.innerHTML = doctors.slice(0, 3).map(doctor => `
            <div class="doctor-card">
                <h3>${escapeHTML(doctor.name)}</h3>
                <p>${escapeHTML(doctor.specialty)}</p>
            </div>
        `).join("");
    }

    const upcomingList = document.getElementById("upcomingList");

    if (upcomingList) {
        const upcoming = bookings
            .filter(booking => booking.date >= localDate(new Date()))
            .sort((a, b) => a.date.localeCompare(b.date));

        upcomingList.innerHTML = upcoming.length
            ? upcoming.map(booking => `
                <div class="appointment-card">
                    <p><strong>${escapeHTML(booking.patientName)}</strong></p>
                    <p>${escapeHTML(booking.doctorName)}</p>
                    <p>${escapeHTML(booking.date)} - ${escapeHTML(booking.time)}</p>
                    <p>Token: ${escapeHTML(booking.token)}</p>
                    <p style="color:${booking.status === "Cancelled" ? "gray" : "red"};">
    ${booking.status || "Booked"}
</p>

${booking.status !== "Cancelled" ? `
    <button onclick="cancelAppointment('${booking.token}')"
        class="cancel-btn">
        Cancel Appointment
    </button>
` : ""}
                </div>
            `).join("")
            : "<p>No appointments booked yet.</p>";
    }
}

// 18. PRINT RECEIPT
function printReceipt() {
    window.print();
}

// 19. INITIAL PAGE SETUP
const appointmentDateInput = document.getElementById("appointmentDate");

if (appointmentDateInput) {
    appointmentDateInput.min = localDate(new Date());
}

const dobInput = document.getElementById("dob");

if (dobInput) {
    dobInput.max = localDate(new Date());
}

refreshDashboard();
showPage("homePage");