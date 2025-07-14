// Script for contacting 

document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("button");

    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const sendingText = "Sending...";
        const successText = "Message sent! Thank you!";
        const errorText = "Failed to send!";
        const defaultText = "Send";

        btn.innerHTML = sendingText;
        btn.className = "default-btn";
        btn.disabled = true;

        const serviceID = "service_1ctybzj";
        const templateID = "template_tke9agv";
    
        emailjs.sendForm(serviceID, templateID, this).then(() => {
            btn.innerHTML = successText;
            btn.className = "default-btn";
            this.reset();

            setTimeout(() => {
                btn.innerHTML = defaultText;
                btn.disabled = false;
            }, 1250);
        },  (err) => {
                console.error("EmailJS error: ", err);
                btn.innerHTML = errorText;
                btn.className = "default-btn";

                setTimeout(() => {
                    btn.innerHTML = defaultText;
                    btn.disabled = false;
                }, 1250);
            }
        );
    });
});
  