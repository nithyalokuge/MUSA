// Script for the teams' popups

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('team-modal');
  const modalImg = document.getElementById('modal-img');
  const modalBlurb = document.getElementById('modal-blurb');
  const closeBtn = modal.querySelector('.popup-close-btn');

  const memberInfo = {
    Lucy: {
      img: '/img/Lucy.png',
      blurb: 'Hi, I\'m Lucy!<br><br> As the UX/UI designer for the MUSA website, I led user research, created wireframes, and collaborated closely with our developer, Nithya, to bring the designs to life. I also conducted usability testing to make sure the site was accessible and user-friendly. When I\'m not behind the screen, you can usually find me at the park with my dog, Oliver.'
    },
    Nithya: {
      img: '/img/Nithya.png',
      blurb: 'Hi, I\'m Nithya!<br><br> As the Full-Stack developer behind the MUSA website, I built it from the ground up using both front and back-end technologies. I collaborated closely with our designer, Lucy, to create an experience that\'s both functional and visually engaging. When I\'m not coding, you\'ll probably find me reading a good book.'
    },
    Kiera: {
      img: '/img/Kiera.jpg',
      blurb: 'Hi, I\'m Kiera!<br><br> I led content and partnerships for MUSA. I worked closely with museums and community groups throughout the planning and production process to ensure that the final product would be meaningful, helpful, and inclusive. When I\'m not working, you\'ll usually find me outdoors hiking, kayaking, or camping. I\'m a big believer in balancing screentime with time in nature.'
    },
    Robyn: {
      img: '/img/Robyn.png',
      blurb: 'Hi, I\'m Robyn!<br><br> I\'m the project manager and videographer for MUSA. I created all the videos featured in our mobile web app and collaborated closely with Kiera on the content. As a deaf individual, this project is deeply personal, as I\'ve experienced the inaccessibility of many Irish museums and want to help change that. When I\'m not editing, you\'ll find me travelling, playing sports, or spending time with friends and family.'
    },
    Kai: {
      img: '/img/Kai.png',
      blurb: 'Hi, I\'m Kai!<br><br> I create expressive 3D models and interactive content with a background in digital art, game design, and programming. I bring ideas to life, from sketches to immersive media.'
    }
  };

  document.querySelectorAll('.menu-btn').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.member;
      const data = memberInfo[key];
      if (data) {
        modalImg.src = data.img;
        modalImg.alt = `${key}`;
        modalBlurb.innerHTML = data.blurb;
        modal.classList.remove('d-none');
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('d-none');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('d-none');
  });
});
