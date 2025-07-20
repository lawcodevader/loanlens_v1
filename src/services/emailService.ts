import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY || 're_iimmbzxq_KMibbhVVEhLqSqSQnqY1BLAv');

export interface EmailTemplate {
  title: string;
  documents: string[];
  message: string;
}

export interface Applicant {
  id: string;
  applicantName: string;
  email?: string; // You'll need to add email to your mock data
}

// Custom email sending function that uses our proxy
const sendEmailViaProxy = async (emailData: any): Promise<{ data: any; error: any }> => {
  try {
    const response = await fetch('/api/resend/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { data: null, error: errorData };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const sendDocumentRequestEmail = async (
  applicant: Applicant,
  template: EmailTemplate
): Promise<boolean> => {
  try {
    // For demo purposes, we'll use a placeholder email
    // In production, you'd get the actual email from your database
    const recipientEmail = applicant.email || `applicant-${applicant.id}@example.com`;
    
    const emailData = {
      from: 'LoanLens <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: template.title,
      html: generateEmailHTML(applicant, template),
    };

    const { data, error } = await sendEmailViaProxy(emailData);

    if (error) {
      console.error('Resend error:', error);
      return false;
    }

    console.log('Email sent successfully:', data);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

const generateEmailHTML = (applicant: Applicant, template: EmailTemplate): string => {
  const documentsList = template.documents.map(doc => `<li>${doc}</li>`).join('');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${template.title}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .document-list { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .document-list ul { margin: 0; padding-left: 20px; }
        .document-list li { margin: 8px 0; }
        .cta-button { 
          display: inline-block; 
          background: #4f46e5; 
          color: white; 
          padding: 12px 24px; 
          text-decoration: none; 
          border-radius: 6px; 
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>LoanLens</h1>
          <p>Document Request</p>
        </div>
        
        <div class="content">
          <h2>Dear ${applicant.applicantName},</h2>
          
          <p>${template.message}</p>
          
          <div class="document-list">
            <h3>Required Documents:</h3>
            <ul>
              ${documentsList}
            </ul>
          </div>
          
          <p><strong>Please upload these documents through your LoanLens portal or reply to this email with the documents attached.</strong></p>
          
          <a href="http://localhost:5173/documents" class="cta-button">Upload Documents</a>
          
          <p>If you have any questions, please don't hesitate to contact our support team.</p>
          
          <p>Best regards,<br>
          The LoanLens Team</p>
        </div>
        
        <div class="footer">
          <p>This is an automated message from LoanLens. Please do not reply to this email.</p>
          <p>Loan ID: ${applicant.id}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendBulkEmails = async (
  applicants: Applicant[],
  template: EmailTemplate
): Promise<{ success: number; failed: number; details: string[] }> => {
  const results = {
    success: 0,
    failed: 0,
    details: [] as string[]
  };

  for (const applicant of applicants) {
    const success = await sendDocumentRequestEmail(applicant, template);
    if (success) {
      results.success++;
      results.details.push(`✅ Sent to ${applicant.applicantName} (${applicant.id})`);
    } else {
      results.failed++;
      results.details.push(`❌ Failed to send to ${applicant.applicantName} (${applicant.id})`);
    }
  }

  return results;
}; 