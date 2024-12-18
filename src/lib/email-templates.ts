// src/lib/email-templates.ts
import { COMPANY_INFO, CONTACT_INFO } from "@/data";

const getBaseTemplate = (content: string, icon: string, title: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #1d1d1f;
          margin: 0;
          padding: 0;
          background-color: #fbfbfd;
        }
        .header {
          background: linear-gradient(135deg, #f4511e, #ff7644);
          color: white;
          padding: 48px 20px;
          text-align: center;
          border-radius: 0 0 24px 24px;
        }
        .logo {
          width: 64px;
          height: 64px;
          margin: 0 auto 20px;
          background: white;
          padding: 12px;
          border-radius: 16px;
        }
        .header-title {
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        .header-subtitle {
          font-size: 18px;
          opacity: 0.9;
          font-weight: 400;
        }
        .content {
          max-width: 600px;
          margin: -24px auto 0;
          padding: 32px 24px;
          background: white;
          border-radius: 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        .section {
          margin: 24px 0;
          padding: 24px;
          background: #fbfbfd;
          border-radius: 16px;
        }
        .section-title {
          color: #f4511e;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .field {
          margin: 16px 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .label {
          font-weight: 500;
          color: #6e6e73;
          min-width: 120px;
        }
        .value {
          color: #1d1d1f;
          flex: 1;
        }
        .metadata {
          font-size: 13px;
          color: #6e6e73;
          text-align: center;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #d2d2d7;
        }
        .footer {
          text-align: center;
          padding: 32px 20px;
          color: #6e6e73;
          font-size: 13px;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #f4511e;
          color: white;
          text-decoration: none;
          border-radius: 24px;
          font-weight: 500;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">
          <img src="cid:logo" alt="${COMPANY_INFO.name}" width="40" height="40" />
        </div>
        <div class="header-title">${COMPANY_INFO.name}</div>
        <div class="header-subtitle">${title}</div>
      </div>
      <div class="content">
        ${content}
        <div class="metadata">
          Submitted on ${new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
})}
        </div>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} ${COMPANY_INFO.name}. All rights reserved.</p>
        <p>${CONTACT_INFO.address.street}, ${CONTACT_INFO.address.city}, ${CONTACT_INFO.address.state}</p>
        <p>
          <a href="tel:${CONTACT_INFO.phone.value}" style="color: #f4511e; text-decoration: none;">
            ${CONTACT_INFO.phone.display}
          </a>
          &nbsp;•&nbsp;
          <a href="mailto:${CONTACT_INFO.email.general}" style="color: #f4511e; text-decoration: none;">
            ${CONTACT_INFO.email.general}
          </a>
        </p>
      </div>
    </body>
  </html>
`;

export function getContactFormTemplate(data: any) {
    const content = `
    <div class="section">
      <div class="section-title">📋 Contact Information</div>
      <div class="field">
        <span class="label">Name:</span>
        <span class="value">${data.firstName} ${data.lastName}</span>
      </div>
      <div class="field">
        <span class="label">Email:</span>
        <span class="value">${data.email}</span>
      </div>
      <div class="field">
        <span class="label">Subject:</span>
        <span class="value">${data.subject}</span>
      </div>
    </div>
    <div class="section">
      <div class="section-title">💬 Message</div>
      <div style="white-space: pre-wrap;">${data.message}</div>
    </div>
  `;
    return getBaseTemplate(content, '📬', 'New Contact Form Submission');
}

export function getRegistrationTemplate(data: any, course: any) {
    const content = `
    <div class="section">
      <div class="section-title">📚 Course Details</div>
      <div class="field">
        <span class="label">Course:</span>
        <span class="value">${course.title}</span>
      </div>
      <div class="field">
        <span class="label">Date:</span>
        <span class="value">${data.selectedDate || 'Not specified'}</span>
      </div>
      <div class="field">
        <span class="label">Price:</span>
        <span class="value">$${course.price}</span>
      </div>
    </div>
    
    <div class="section">
      <div class="section-title">👤 Personal Information</div>
      <div class="field">
        <span class="label">Name:</span>
        <span class="value">${data.firstName} ${data.lastName}</span>
      </div>
      <div class="field">
        <span class="label">Email:</span>
        <span class="value">${data.email}</span>
      </div>
      <div class="field">
        <span class="label">Phone:</span>
        <span class="value">${data.phone}</span>
      </div>
      <div class="field">
        <span class="label">Company:</span>
        <span class="value">${data.company || 'Not specified'}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">🚨 Emergency Contact</div>
      <div class="field">
        <span class="label">Name:</span>
        <span class="value">${data.emergencyContact.name}</span>
      </div>
      <div class="field">
        <span class="label">Phone:</span>
        <span class="value">${data.emergencyContact.phone}</span>
      </div>
      <div class="field">
        <span class="label">Relationship:</span>
        <span class="value">${data.emergencyContact.relationship}</span>
      </div>
    </div>
  `;
    return getBaseTemplate(content, '📋', 'New Course Registration');
}

export function getTrainingRequestTemplate(data: any) {
    const content = `
    <div class="section">
      <div class="section-title">👤 Requester Information</div>
      <div class="field">
        <span class="label">Name:</span>
        <span class="value">${data.name}</span>
      </div>
      <div class="field">
        <span class="label">Email:</span>
        <span class="value">${data.email}</span>
      </div>
      <div class="field">
        <span class="label">Phone:</span>
        <span class="value">${data.phone}</span>
      </div>
      <div class="field">
        <span class="label">Company:</span>
        <span class="value">${data.company || 'Not specified'}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">🎓 Training Details</div>
      <div class="field">
        <span class="label">Type:</span>
        <span class="value">${data.trainingType}</span>
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <div style="white-space: pre-wrap; margin-top: 10px;">${data.message}</div>
      </div>
    </div>
  `;
    return getBaseTemplate(content, '📚', 'New Training Request');
}