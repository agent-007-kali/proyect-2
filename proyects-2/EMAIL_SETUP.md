# 🚀 Email Setup Guide for Your AI Developer Contact Form

## Option 1: Formspree (Easiest - FREE)

### Setup Steps:
1. **Go to** https://formspree.io
2. **Sign up** for a free account
3. **Create a new form** in your dashboard
4. **Copy your form ID** (looks like: `xxxxxxxx`)
5. **Replace** `YOUR_FORM_ID` in `/src/components/ContactForm.tsx` with your actual form ID

### Example:
```javascript
const response = await fetch('https://formspree.io/f/xyz12345', {
```

**✅ Pros:** Free, no backend needed, spam protection, easy setup
**📧 Emails go to:** Whatever email you configured in Formspree

---

## Option 2: EmailJS (Alternative)

### Setup Steps:
1. **Go to** https://www.emailjs.com
2. **Sign up** and create a service (Gmail, Outlook, etc.)
3. **Create an email template** in their dashboard
4. **Get your credentials:**
   - Service ID
   - Template ID
   - Public Key
5. **Install:** `npm install @emailjs/browser`
6. **Replace the handleSubmit function** with this code:

```javascript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',      // Replace with your EmailJS Service ID
      'YOUR_TEMPLATE_ID',     // Replace with your EmailJS Template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        project_type: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        reply_to: formData.email,
      },
      'YOUR_PUBLIC_KEY'       // Replace with your EmailJS Public Key
    );

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '', email: '', company: '', projectType: '',
        budget: '', timeline: '', message: ''
      });
      onClose();
    }, 3000);

  } catch (error) {
    console.error('EmailJS error:', error);
    alert('Sorry, there was an error. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Option 3: Custom Backend (Advanced)

If you have a backend, create an API endpoint that handles the form data and sends emails via:
- **Node.js + Nodemailer**
- **Python + Flask + SMTP**
- **PHP + PHPMailer**
- **Netlify Functions**
- **Vercel API Routes**

---

## 📧 Current Status

Your form currently simulates submission. Once you set up either Formspree or EmailJS, real emails will be sent to your inbox with lead information!

**Need help setting up?** Let me know which option you prefer!
