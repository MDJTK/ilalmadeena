// ==========================
// Global Elements
// ==========================
const startNowBtn = document.getElementById('startNowBtn');
const modalOverlay = document.getElementById('registrationModal');
const closeBtn = modalOverlay.querySelector('.close-btn');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const programForm = document.getElementById('programForm');
const shiftSelect = document.getElementById('shift');
const divisionField = document.getElementById('division');
const divisionLabel = document.getElementById('divisionLabel');
const itemSelect = document.getElementById('item');
const groupSongFields = document.getElementById('groupSongFields');
const membersContainer = document.getElementById('membersContainer');
const addMemberBtn = document.getElementById('addMemberBtn');

const maxMembers = 4;

// ==========================
// Nav Toggle
// ==========================
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', !expanded);
  navLinks.classList.toggle('open');
});

// ==========================
// Modal Handling
// ==========================

// Open modal
startNowBtn.addEventListener('click', () => {
  modalOverlay.classList.add('active');
  modalOverlay.setAttribute('aria-hidden', 'false');
  trapFocus(modalOverlay);
});

// Trap focus inside modal
function trapFocus(element) {
  const focusableElementsString =
    'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  let focusableElements = Array.from(element.querySelectorAll(focusableElementsString));

  const firstTabStop = focusableElements[0];
  const lastTabStop = focusableElements[focusableElements.length - 1];

  firstTabStop.focus();

  function keyListener(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstTabStop) {
        e.preventDefault();
        lastTabStop.focus();
      } else if (!e.shiftKey && document.activeElement === lastTabStop) {
        e.preventDefault();
        firstTabStop.focus();
      }
    }
  }

  element.addEventListener('keydown', keyListener);

  function cleanup() {
    element.removeEventListener('keydown', keyListener);
    modalOverlay.removeEventListener('transitionend', cleanup);
  }

  modalOverlay.addEventListener('transitionend', cleanup);
}

// SweetAlert confirm before closing modal
function confirmCloseModal() {
  Swal.fire({
    title: 'Are you sure?',
    text: "Your entered data will be lost if you close.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, close it',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      startNowBtn.focus(); // Move focus first
      modalOverlay.classList.remove('active');
      modalOverlay.setAttribute('aria-hidden', 'true');
    }
  });
}

// Close modal events
closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  confirmCloseModal();
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) confirmCloseModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains('active')) {
    confirmCloseModal();
  }
});

// ==========================
// Form Submission
// ==========================
programForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const messageEl = document.getElementById("message");
  const submitBtn = document.getElementById("submit-button");

  messageEl.textContent = "Submitting..";
  messageEl.style.display = "block";
  submitBtn.disabled = true;

  const formData = new FormData(this);
  const keyValuePairs = [];
  for (const pair of formData.entries()) {
    keyValuePairs.push(encodeURIComponent(pair[0]) + "=" + encodeURIComponent(pair[1]));
  }
  const formDataString = keyValuePairs.join("&");

  fetch("https://script.google.com/macros/s/AKfycbxHYnKShRAhnhFnrvP9Zx2DhkFtQwjXJXPtsAuGX-gB0UPjtRx37ExxhmC1ZYnkD0sSXg/exec", {
    redirect: "follow",
    method: "POST",
    body: formDataString,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok) return response.text();
      else throw new Error("Failed to submit the form.");
    })
    .then(() => {
      messageEl.textContent = "Data submitted successfully!";
      messageEl.style.display = "block";
      messageEl.style.backgroundColor = "green";
      messageEl.style.color = "beige";
      submitBtn.disabled = false;
      programForm.reset();

      setTimeout(() => {
        messageEl.textContent = "";
        messageEl.style.display = "none";
      }, 2600);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your register has been completed",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((error) => {
      console.error(error);
      messageEl.textContent = "An error occurred while submitting the form.";
      messageEl.style.display = "block";

      Swal.fire({
        position: "center",
        icon: "error",
        title: "An error occurred while submitting the form.",
        showConfirmButton: false,
        timer: 1500,
      });
    });
});

// ==========================
// Items Based on Class + Gender
// ==========================
function updateItems() {
  try {
    const classLevel = parseInt(document.getElementById('class').value);
    const genderElement = document.querySelector('input[name="Gender"]:checked');
    const itemSelect = document.getElementById('item');

    if (!genderElement) return;
    const gender = genderElement.value;

    itemSelect.innerHTML = '';
    let items = [];

    if (classLevel >= 1 && classLevel <= 2) {
      items = gender === 'male'
        ? ['Story Telling', 'Action Song', 'Drawing', 'Group Song']
        : ['Story Telling', 'Action Song', 'Word picking', 'Drawing', 'Memory Test', 'Group Song'];
    } else if (classLevel >= 3 && classLevel <= 5) {
      items = gender === 'male'
        ? ['ഖുർആൻ പാരായണം', 'മലയാള പ്രസംഗം', 'ഇംഗ്ലീഷ് പ്രസംഗം', 'മലയാള മദ്ഹ് ഗാനം', 'അറബിക് മദ്ഹ് ഗാനം', 'Group Song']
        : ['ഖുർആൻ പാരായണം', 'നഫീസത്ത് മാല', 'ഡ്രോയിംഗ്', 'ഇംഗ്ലീഷ് പ്രസംഗം', 'മലയാള പ്രസംഗം'];
    } else if (classLevel >= 6 && classLevel <= 12) {
      items = gender === 'male'
        ? ['ഖുർആൻ പാരായണം', 'മലയാള പ്രസംഗം', 'ഇംഗ്ലീഷ് പ്രസംഗം', 'മലയാള മദ്ഹ് ഗാനം', 'അറബിക് മദ്ഹ് ഗാനം', 'Group Song']
        : ['ഖുർആൻ പാരായണം', 'നഫീസത്ത് മാല', 'കഥാ രചന', 'കവിത രചന', 'മലയാള പ്രസംഗം', 'ഇംഗ്ലീഷ് പ്രസംഗം'];
    }

    items.forEach(item => {
      const option = document.createElement('option');
      option.value = item;
      option.textContent = item;
      itemSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error updating items:', error);
  }
}

document.getElementById('class').addEventListener('change', updateItems);
document.querySelectorAll('input[name="Gender"]').forEach(radio =>
  radio.addEventListener('change', updateItems)
);

// ==========================
// Group Song Members
// ==========================
itemSelect.addEventListener('change', function () {
  if (this.value === "Group Song") {
    groupSongFields.style.display = "block";
  } else {
    groupSongFields.style.display = "none";
    membersContainer.innerHTML = "";
  }
});

addMemberBtn.addEventListener('click', function () {
  const currentCount = membersContainer.querySelectorAll(".member-field").length;
  if (currentCount < maxMembers) {
    const memberNumber = currentCount + 1;
    const memberDiv = document.createElement('div');
    memberDiv.classList.add("member-field");

    memberDiv.innerHTML = `
      <label>Member ${memberNumber}:</label>
      <div class="member-input">
        <label>ID:</label>
        <input type="text" minlength="2" maxlength="4" placeholder="Enter ID" name="${memberNumber}.ID" required>
        <label>Name:</label>
        <input type="text" placeholder="Member's Name" name="${memberNumber}.Name" required>
        <button type="button" class="deleteMemberBtn">✖</button>
      </div>
    `;

    memberDiv.querySelector('.deleteMemberBtn').addEventListener('click', function () {
      memberDiv.remove();
      renumberMembers();
    });

    membersContainer.appendChild(memberDiv);
    renumberMembers();
  } else {
    alert("You can only add up to 4 members.");
  }
});

function renumberMembers() {
  const memberFields = membersContainer.querySelectorAll(".member-field");
  memberFields.forEach((field, index) => {
    const memberNumber = index + 1;
    field.querySelector("label").textContent = `Member ${memberNumber}:`;

    const idInput = field.querySelector("input[name$='.ID']");
    const nameInput = field.querySelector("input[name$='.Name']");

    if (idInput) idInput.setAttribute("name", `${memberNumber}.ID`);
    if (nameInput) nameInput.setAttribute("name", `${memberNumber}.Name`);
  });
}
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', !expanded);
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active'); // 👈 adds animation
});
// ✅ Detect mobile device
function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

// Close modal on overlay click (desktop only)
modalOverlay.addEventListener('click', (e) => {
  if (!isMobile() && e.target === modalOverlay) {
    confirmCloseModal();
  }
});

// Close modal on Escape key (desktop only)
document.addEventListener('keydown', (e) => {
  if (!isMobile() && e.key === "Escape" && modalOverlay.classList.contains('active')) {
    confirmCloseModal();
  }
});
