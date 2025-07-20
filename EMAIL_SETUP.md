# Email Setup Guide for LoanLens

## 🚀 Setting up Resend Email Service

### Step 1: Get Your Resend API Key

1. Go to [Resend.com](https://resend.com) and sign up for a free account
2. Navigate to the API Keys section
3. Create a new API key
4. Copy the API key (it starts with `re_`)

### Step 2: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Resend API Key
VITE_RESEND_API_KEY=re_your_actual_api_key_here
```

### Step 3: Verify Domain (Optional but Recommended)

For production use, verify your domain in Resend:
1. Go to Domains section in Resend dashboard
2. Add your domain (e.g., `yourdomain.com`)
3. Follow the DNS verification steps
4. Update the `from` email in `src/services/emailService.ts`

### Step 4: Test the Email Functionality

1. Start your development server: `npm run dev`
2. Navigate to the Portfolio page
3. Select some loans
4. Choose a document template from PropCollect dropdown
5. Click "📧 Send Email" button

## 📧 Email Templates

The system includes three pre-configured templates:

### Basic Docs
- Identity Proof (Aadhar/PAN)
- Address Proof
- Income Proof (Salary Slips)
- Bank Statements (Last 6 months)
- Employment Certificate

### Property Docs
- Property Registration Documents
- Encumbrance Certificate
- Property Tax Receipts
- Building Approval Plans
- NOC from Society/Association
- Property Valuation Report

### Advanced Docs
- Business Financial Statements
- IT Returns (Last 3 years)
- GST Registration Certificate
- Partnership Deed/Company Documents
- Projected Financial Statements
- Collateral Security Documents
- Insurance Policies

## 🔧 Customization

### Adding New Templates

Edit `src/pages/admin/Portfolio.tsx` and add new templates to the `communicationTemplates` object:

```typescript
'new-template': {
  title: 'New Template Title',
  documents: [
    'Document 1',
    'Document 2',
    'Document 3'
  ],
  message: 'Your custom message here.'
}
```

### Modifying Email Design

Edit the `generateEmailHTML` function in `src/services/emailService.ts` to customize the email appearance.

## 🆓 Free Tier Limits

- **Resend**: 3,000 emails/month
- **SendGrid**: 100 emails/day
- **Mailgun**: 5,000 emails/month for 3 months

## 🔒 Security Notes

- Never commit your API key to version control
- Use environment variables for all sensitive data
- Consider using a backend service for production email sending

## 🐛 Troubleshooting

### Common Issues

1. **"Failed to send emails" error**
   - Check if your API key is correct
   - Verify your Resend account is active
   - Check the browser console for detailed error messages

2. **Emails not received**
   - Check spam folder
   - Verify the recipient email addresses
   - Check Resend dashboard for delivery status

3. **Rate limiting**
   - Check your Resend usage in the dashboard
   - Consider upgrading if you exceed free tier limits

## 📞 Support

- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
- GitHub Issues: Create an issue in this repository 