// Backend API endpoint (Node.js/Express)
// Install: npm install express resend cors body-parser dotenv

require('dotenv').config();
const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// CORS configuration for kesarsecurities.in
app.use(cors({
  origin: ['https://kesarsecurities.in', 'https://www.kesarsecurities.in', 'http://localhost'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Kesar Securities Contact API',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact (POST)'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Contact API is running' });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate input
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Phone validation (Indian numbers)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = phone.replace(/\s+/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit phone number'
      });
    }

    console.log(`Processing contact form from: ${name} (${email})`);

    // Send thank you email to user
    const thankYouEmail = await resend.emails.send({
      from: 'Kesar Securities <noreply@kesarsecurities.in>', // Must match your verified domain
      to: email,
      subject: 'Thank You for Contacting Kesar Securities',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container { 
              max-width: 600px; 
              margin: 20px auto; 
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 600;
            }
            .content { 
              padding: 40px 30px;
              background: white;
            }
            .content p {
              margin: 0 0 15px 0;
              color: #555;
            }
            .message-box {
              background: #f8f9fa;
              padding: 20px;
              border-left: 4px solid #667eea;
              border-radius: 5px;
              margin: 20px 0;
            }
            .message-label {
              font-weight: 600;
              color: #667eea;
              margin-bottom: 10px;
            }
            .button { 
              display: inline-block; 
              padding: 14px 32px; 
              background: #667eea; 
              color: white !important; 
              text-decoration: none; 
              border-radius: 6px; 
              margin-top: 25px;
              font-weight: 600;
              transition: background 0.3s ease;
            }
            .button:hover {
              background: #5568d3;
            }
            .footer { 
              text-align: center; 
              padding: 30px; 
              background: #f8f9fa;
              color: #666; 
              font-size: 13px;
              line-height: 1.8;
            }
            .footer strong {
              color: #333;
            }
            .divider {
              height: 1px;
              background: #e0e0e0;
              margin: 25px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Reaching Out!</h1>
            </div>
            <div class="content">
              <p>Dear <strong>${name}</strong>,</p>
              <p>Thank you for contacting Kesar Securities. We have successfully received your message and our team will review it carefully.</p>
              <p>We strive to respond to all inquiries within <strong>24-48 hours</strong> during business days. One of our financial advisors will get back to you as soon as possible.</p>
              
              <div class="message-box">
                <div class="message-label">Your Message:</div>
                <div>${message}</div>
              </div>

              <div class="divider"></div>

              <p><strong>Need Immediate Assistance?</strong></p>
              <p>If you have an urgent query, please feel free to contact us:</p>
              <p>📞 Phone: <strong>98191 53214</strong><br>
              📧 Email: <strong>support@kesarsecurities.in</strong></p>

              <div style="text-align: center;">
                <a href="https://kesarsecurities.in" class="button">Visit Our Website</a>
              </div>
            </div>
            <div class="footer">
              <strong>Kesar Securities</strong><br>
              701, Swami Krupa, D. L. Vaidya Road,<br>
              Near Akkalkot Swami Maharaj Math, Dadar, Mumbai – 400028<br>
              <br>
              Email: support@kesarsecurities.in | Phone: 98191 53214<br>
              <br>
              <em>Empowering investors with trusted advisory and expert financial insights.</em>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Thank you email sent:', thankYouEmail.data.id);

    // Send notification email to support
    const supportEmail = await resend.emails.send({
      from: 'Kesar Securities Contact Form <noreply@kesarsecurities.in>', // Must match your verified domain
      to: 'support@kesarsecurities.in',
      replyTo: email,
      subject: `🔔 New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container { 
              max-width: 650px; 
              margin: 20px auto; 
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
              color: white; 
              padding: 30px; 
              text-align: center;
            }
            .header h2 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }
            .content { 
              padding: 30px;
            }
            .field { 
              margin-bottom: 20px; 
              padding: 15px; 
              background: #f8f9fa; 
              border-radius: 6px;
              border-left: 4px solid #667eea;
            }
            .label { 
              font-weight: 600; 
              color: #667eea;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 8px;
              display: block;
            }
            .value {
              color: #333;
              font-size: 15px;
              word-wrap: break-word;
            }
            .value a {
              color: #667eea;
              text-decoration: none;
            }
            .value a:hover {
              text-decoration: underline;
            }
            .message-field {
              background: white;
              border: 2px solid #e0e0e0;
              padding: 20px;
              border-radius: 6px;
              margin-top: 10px;
              white-space: pre-wrap;
              line-height: 1.6;
            }
            .actions {
              margin-top: 25px;
              padding-top: 25px;
              border-top: 2px solid #e0e0e0;
              text-align: center;
            }
            .btn {
              display: inline-block;
              padding: 12px 24px;
              margin: 5px;
              border-radius: 6px;
              text-decoration: none;
              font-weight: 600;
              font-size: 14px;
            }
            .btn-primary {
              background: #667eea;
              color: white !important;
            }
            .btn-secondary {
              background: #28a745;
              color: white !important;
            }
            .timestamp {
              text-align: center;
              padding: 20px;
              background: #f8f9fa;
              color: #666;
              font-size: 13px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🔔 New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">👤 Name</span>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <span class="label">📧 Email Address</span>
                <div class="value">
                  <a href="mailto:${email}">${email}</a>
                </div>
              </div>
              
              <div class="field">
                <span class="label">📞 Phone Number</span>
                <div class="value">
                  <a href="tel:+91${phone}">+91 ${phone}</a>
                </div>
              </div>
              
              <div class="field">
                <span class="label">💬 Message</span>
                <div class="message-field">${message}</div>
              </div>

              <div class="actions">
                <a href="mailto:${email}" class="btn btn-primary">Reply via Email</a>
                <a href="tel:+91${phone}" class="btn btn-secondary">Call Customer</a>
              </div>
            </div>
            <div class="timestamp">
              <strong>Received:</strong> ${new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'long'
              })}
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Support notification sent:', supportEmail.data.id);

    res.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We will get back to you within 24-48 hours.',
      thankYouEmailId: thankYouEmail.data.id,
      supportEmailId: supportEmail.data.id
    });

  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    res.status(500).json({
      success: false,
      message: 'We apologize, but there was an error sending your message. Please try again or contact us directly at support@kesarsecurities.in',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Kesar Securities Contact API running on port ${PORT}`);
  console.log(`📧 Emails will be sent from: noreply@kesarsecurities.in`);
  console.log(`📬 Support notifications sent to: support@kesarsecurities.in`);
});