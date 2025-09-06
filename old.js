
  const startNowBtn = document.getElementById('startNowBtn');
  const modalOverlay = document.getElementById('registrationModal');
  const closeBtn = modalOverlay.querySelector('.close-btn');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');



  // Toggle mobile nav menu
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('open');
  });
  // Prevent modal content scroll when reaching top/bottom
  const modallOverlay = document.getElementById('modalOverlay');
  const registrationForm = document.getElementById('registrationForm');
  const modalContent = document.getElementById('modalContent'); // ✅ add this

  modalContent.addEventListener('scroll', (e) => {
      const element = e.target;
      const atTop = element.scrollTop === 0;
      const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
      
      if (atTop || atBottom) {
          e.preventDefault();
      }
  });

  // Open modal
  startNowBtn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    // Trap focus inside modal
    trapFocus(modalOverlay);
  });


  // Focus trap utility for modal
  function trapFocus(element) {
    const focusableElementsString = 'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    let focusableElements = element.querySelectorAll(focusableElementsString);
    focusableElements = Array.prototype.slice.call(focusableElements);

    const firstTabStop = focusableElements[0];
    const lastTabStop = focusableElements[focusableElements.length - 1];

    // Focus first element
    firstTabStop.focus();

    function keyListener(e) {
      if(e.key === 'Tab') {
        if(e.shiftKey) { // shift + tab
          if(document.activeElement === firstTabStop) {
            e.preventDefault();
            lastTabStop.focus();
          }
        } else { // tab
          if(document.activeElement === lastTabStop) {
            e.preventDefault();
            firstTabStop.focus();
          }
        }
      }
    }
    element.addEventListener('keydown', keyListener);

    // Remove event listener when modal closes
    function cleanup() {
      element.removeEventListener('keydown', keyListener);
      modalOverlay.removeEventListener('transitionend', cleanup);
    }
    modalOverlay.addEventListener('transitionend', cleanup);
  }


const modal = document.getElementById("registrationModal");
const programForm = document.getElementById('programForm');
const shiftSelect = document.getElementById('shift');
const divisionField = document.getElementById('division');
const divisionLabel = document.getElementById('divisionLabel');


// Add form submission handling
document.getElementById("programForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  document.getElementById("message").textContent = "Submitting..";
  document.getElementById("message").style.display = "block";
  document.getElementById("submit-button").disabled = true;

  // Collect the form data
  const formData = new FormData(this);
  const keyValuePairs = [];
  for (const pair of formData.entries()) {
    keyValuePairs.push(
      encodeURIComponent(pair[0]) + "=" + encodeURIComponent(pair[1])
    ); // Properly encode data
  }

  const formDataString = keyValuePairs.join("&");

  // ✅ Use your Apps Script Web App URL here
  fetch(
    "https://script.google.com/macros/s/AKfycbxHYnKShRAhnhFnrvP9Zx2DhkFtQwjXJXPtsAuGX-gB0UPjtRx37ExxhmC1ZYnkD0sSXg/exec",
    {
      redirect: "follow",
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    }
  )
    .then(function (response) {
      if (response.ok) {
        return response.text(); // Script might return plain text
      } else {
        throw new Error("Failed to submit the form.");
      }
    })
    .then(function (data) {
      // ✅ Success
      document.getElementById("message").textContent =
        "Data submitted successfully!";
      document.getElementById("message").style.display = "block";
      document.getElementById("message").style.backgroundColor = "green";
      document.getElementById("message").style.color = "beige";
      document.getElementById("submit-button").disabled = false;
      document.getElementById("programForm").reset();

      setTimeout(function () {
        document.getElementById("message").textContent = "";
        document.getElementById("message").style.display = "none";
      }, 2600);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your register has been completed",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch(function (error) {
      console.error(error);
      document.getElementById("message").textContent =
        "An error occurred while submitting the form.";
      document.getElementById("message").style.display = "block";
      Swal.fire({
        position: "center",
        icon: "error",
        title: "An error occurred while submitting the form.",
        showConfirmButton: false,
        timer: 1500,
      });
    });
});


// Add error handling for updateItems
function updateItems() {
    try {
        const classLevel = parseInt(document.getElementById('class').value);
        const genderElement = document.querySelector('input[name="Gender"]:checked');
        
        if (!genderElement) {
            return; // Exit if no gender is selected
        }
        
        const gender = genderElement.value;
        // ... rest of function
    } catch (error) {
        console.error('Error updating items:', error);
    }
}    



// Update items based on selected class and gender
document.getElementById('class').addEventListener('change', updateItems);
document.querySelectorAll('input[name="Gender"]').forEach(function (radio) {
    radio.addEventListener('change', updateItems);
});

function updateItems() {
    const classLevel = parseInt(document.getElementById('class').value);
    const genderElement = document.querySelector('input[name="Gender"]:checked');
    const itemSelect = document.getElementById('item');
    if (!genderElement) {
        return; // Exit if no gender is selected
    }
    
    const gender = genderElement.value;

    itemSelect.innerHTML = '';

    let items = [];

    if (classLevel >= 1 && classLevel <= 2) {
        // Sub-junior items
        if (gender === 'male') {
            items = ['Story Telling' , 'Action Song' , 'Drawing', 'Group Song'];
        } else {
            items = ['Story Telling' , 'Action Song', 'Word picking', 'Drawing', 'Memory Test',  'Group Song'];
        }
    } else if (classLevel >= 3 && classLevel <= 5) {
        // Junior items
        if (gender === 'male') {
            items = ['ഖുർആൻ പാരായണം', 'മലയാള പ്രസംഗം', 'ഇംഗ്ലീഷ് പ്രസംഗം', 'മലയാള മദ്ഹ് ഗാനം', 'അറബിക് മദ്ഹ് ഗാനം', 'Group Song',];
        } else {
            items = ['ഖുർആൻ പാരായണം', 'നഫീസത്ത് മാല','ഡ്രോയിംഗ്' ,'ഇംഗ്ലീഷ് പ്രസംഗം' , 'മലയാള പ്രസംഗം'];
        }
    } else if (classLevel >= 6 && classLevel <= 12) {
        // Senior items
        if (gender === 'male') {
            items = ['ഖുർആൻ പാരായണം', 'മലയാള പ്രസംഗം', 'ഇംഗ്ലീഷ് പ്രസംഗം', 'മലയാള മദ്ഹ് ഗാനം', 'അറബിക് മദ്ഹ് ഗാനം', 'Group Song'];
        } else {
            items = ['ഖുർആൻ പാരായണം' , 'നഫീസത്ത് മാല' , 'കഥാ രചന' , 'കവിത രചന','മലയാള പ്രസംഗം' , 'ഇംഗ്ലീഷ് പ്രസംഗം'];
        }
    }

    // Populate item dropdown
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        itemSelect.appendChild(option);
    });   
}

    const classLevel = parseInt(document.getElementById('class').value);

// Group Song Members Logic
const itemSelect = document.getElementById('item');
const groupSongFields = document.getElementById('groupSongFields');
const membersContainer = document.getElementById('membersContainer');
const addMemberBtn = document.getElementById('addMemberBtn');

const maxMembers = 4;

// 🔄 Function to re-number all members
function renumberMembers() {
    const members = membersContainer.querySelectorAll(".member-field");
    members.forEach((memberDiv, index) => {
        const num = index + 1;
        // Update main label
        memberDiv.querySelector("label").textContent = `Member ${num}:`;
        // Update input labels + ids + names
        const idLabel = memberDiv.querySelector(".member-input label:nth-of-type(1)");
        const idInput = memberDiv.querySelector("input[type='text']:first-of-type");
        const nameLabel = memberDiv.querySelector(".member-input label:nth-of-type(2)");
        const nameInput = memberDiv.querySelector("input[type='text']:last-of-type");

        idLabel.textContent = `ID:`;
        idInput.id = `ID${num}`;
        idInput.name = `ID${num}`;

        nameLabel.textContent = `Name:`;
        nameInput.id = `member${num}`;
        nameInput.name = `Member-${num}`;

        // Update delete button aria-label
        const deleteBtn = memberDiv.querySelector(".deleteMemberBtn");
        deleteBtn.setAttribute("aria-label", `Remove Member ${num}`);
    });
}

itemSelect.addEventListener('change', function() {
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
                <input type="text" minlength="2" maxlength="4" 
                       placeholder="Enter ID" 
                       name="${memberNumber}.ID" required>
                <label>Name:</label>
                <input type="text" 
                       placeholder="Member's Name" 
                       name="${memberNumber}.Name" required>
                <button type="button" class="deleteMemberBtn">✖</button>
            </div>
        `;

        // Delete functionality
        memberDiv.querySelector('.deleteMemberBtn').addEventListener('click', function () {
            memberDiv.remove();
            renumberMembers(); // re-number after delete
        });

        membersContainer.appendChild(memberDiv);
        renumberMembers(); // re-number after add
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


// Close modal function


// Close modal on overlay click (outside modal content)
modalOverlay.addEventListener('click', (e) => {
  if(e.target === modalOverlay) {
    closeModal();
  }
});
// Close modal with confirmation
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
      // 🔹 Move focus FIRST
      startNowBtn.focus();

      // 🔹 Then hide modal
      modalOverlay.classList.remove('active');
      modalOverlay.setAttribute('aria-hidden', 'true');
    }
  });
}


// Close modal on close button click
closeBtn.addEventListener('click', confirmCloseModal);

// Close modal on overlay click
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    confirmCloseModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if(e.key === "Escape" && modalOverlay.classList.contains('active')){
    confirmCloseModal();
  }
});
// Close modal on close button click
closeBtn.addEventListener('click', (e) => {
  e.preventDefault(); // prevent immediate close
  confirmCloseModal(); // run SweetAlert confirmation
});
