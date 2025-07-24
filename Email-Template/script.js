const emailData = {
  inbox: [
    { sender: "LinkedIn", subject: "Starbucks hiring “Real Estate Manager”", body: "New job alert: Starbucks is looking for a Real Estate Manager.", code: "" },
    { sender: "Uber", subject: "Your Uber verification code", body: "To finish logging in to your Uber account, enter this verification code:", code: "6687" },
    { sender: "Facebook", subject: "Someone liked your photo", body: "You have a new like on your recent post!", code: "" }
  ],
  starred: [
    { sender: "GitHub", subject: "You got a new star!", body: "Your repository just received a new star from a developer.", code: "" }
  ],
  snoozed: [
    { sender: "Coursera", subject: "Reminder: Your course starts tomorrow", body: "Don't forget to log in and start learning tomorrow!", code: "" }
  ],
  important: [
    { sender: "Bank", subject: "Account Alert", body: "Suspicious login attempt was detected from another device.", code: "" }
  ],
  trash: [
    { sender: "SpammyMail", subject: "You won a free iPhone!", body: "Click here to claim your prize... (just kidding, don't!)", code: "" }
  ]
};

const sidebarItems = document.querySelectorAll('#sidebar-list li');
const emailList = document.getElementById('email-list');
const emailContent = document.getElementById('email-content');
const searchInput = document.getElementById('searchInput');

let currentCategory = "inbox";
let currentEmails = [];

function loadEmails(category) {
  currentCategory = category;
  currentEmails = emailData[category];
  renderEmailList(currentEmails);
}

function renderEmailList(emails) {
  emailList.innerHTML = '';
  emails.forEach((email, idx) => {
    const div = document.createElement('div');
    div.className = 'email-item';
    div.innerHTML = `<strong>${email.sender}</strong>${email.subject}`;
    div.addEventListener('click', () => {
      document.querySelectorAll('.email-item').forEach(e => e.classList.remove('active'));
      div.classList.add('active');
      showEmail(email);
    });
    emailList.appendChild(div);
    if (idx === 0) div.click();
  });
}

function showEmail(email) {
  let html = `
    <h4>${email.subject}</h4>
    <p><strong>Hi User,</strong></p>
    <p>${email.body}</p>
  `;
  if (email.code) html += `<h2>${email.code}</h2>`;
  html += `
    <a href="#" class="btn" id="helpBtn">Help Center</a>
    <p class="footer-note">If you didn’t make this request, please ignore this message.</p>
  `;
  emailContent.innerHTML = html;
  emailContent.classList.remove('animate');
  setTimeout(() => emailContent.classList.add('animate'), 10);
}

sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    sidebarItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const category = item.dataset.category;
    searchInput.value = '';
    loadEmails(category);
  });
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "helpBtn") {
    e.preventDefault();
    alert("Redirecting to Help Center...");
  }
});

searchInput.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = currentEmails.filter(email =>
    email.sender.toLowerCase().includes(query) ||
    email.subject.toLowerCase().includes(query)
  );
  renderEmailList(filtered);
});

loadEmails("inbox");
