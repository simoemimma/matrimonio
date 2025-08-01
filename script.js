// 🔧 Inizializza EmailJS
(function(){
  emailjs.init("pG9Fd_eD7Mva8Qo8e"); // 🔁 Inserisci qui il tuo USER ID di EmailJS
})();

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navUl = document.querySelector('.navbar ul');
  const navLinks = navUl.querySelectorAll('a');
  const activeSectionSpan = document.getElementById('active-section');

  // Funzione toggle menu al click sul bottone
  menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('show');
  });

  // Quando clicchi su una voce del menu
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Cambia voce attiva e testo nel bottone
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Aggiorna testo bottone con la voce selezionata (testo + freccia)
      activeSectionSpan.textContent = link.textContent;

      // Nascondi menu
      navUl.classList.remove('show');

      // Optional: scrolla verso la sezione cliccata
      // e.preventDefault();
      // const target = document.querySelector(link.getAttribute('href'));
      // target.scrollIntoView({behavior: 'smooth'});
    });
  });
});

// Countdown al matrimonio
const countdown = document.getElementById("countdown");
const targetDate = new Date("2025-10-18T15:30:00").getTime();

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    countdown.textContent = "Ci siamo sposati!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.textContent = `${days} giorni, ${hours}h ${minutes}m ${seconds}s`;
};

setInterval(updateCountdown, 1000);
updateCountdown();

// Form RSVP
emailjs.init("pG9Fd_eD7Mva8Qo8e"); // sostituisci con la tua chiave pubblica

document.getElementById("rsvp-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;

  // Raccolta dati
  const nome = form.nome.value;
  const partecipanti = form.persone.value;
  const bambini2 = form.bambini2.value;
  const bambini3 = form.bambini3.value;
  const email = form.email.value;
  const allergie = form.allergie.value;

  // Invio all'invitato
  emailjs.send("service_yrvjten", "template_x38blxp", {
    to_email: email,
    nome: nome,
    partecipanti: partecipanti,
    bambini2: bambini2,
    bambini3: bambini3,
    allergie: allergie
    
  }).then(function () {
    console.log("Mail inviata all'invitato");
  }, function (error) {
    console.error("Errore nell'invio all'invitato", error);
  });

  // Invio a te
  emailjs.send("service_yrvjten", "template_132u7ic", {
    nome: nome,
    partecipanti: partecipanti,
    bambini2: bambini2,
    bambini3: bambini3,
    email: email,
    allergie: allergie
  }).then(function () {
    document.getElementById("form-status").textContent = "Grazie per aver confermato!";
    form.reset();
  }, function (error) {
    document.getElementById("form-status").textContent = "Errore nell'invio. Riprova.";
    console.error("Errore nell'invio a te", error);
  });
});