# Resume Helper - Free AI Resume Analysis for Students

A personal project I built to help my friends and fellow students improve their resumes for job applications. It's completely free and focuses on practical, actionable feedback.

## 🎯 Why I Built This

During my job search, I spent hours wondering if my resume was good enough. I wished I had a friend who could give me honest, helpful feedback without judgment. So I built this tool to be that friend for other students.

## ✨ Features

- **File Upload**: Support for PDF and DOCX files with real text extraction
- **AI Analysis**: Comprehensive resume evaluation using Google AI (Gemini)
- **ATS Compatibility**: Check how well your resume works with applicant tracking systems
- **Detailed Feedback**: Get specific suggestions for improvement
- **Privacy First**: Files are automatically deleted after analysis
- **100% Free**: No signup, no premium features, just helpful feedback

## 🚀 Live Demo

**🌐 [Try it now - Resume Helper](https://your-app-name.vercel.app)**

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **AI**: Google AI (Gemini) API
- **PDF Processing**: PDF.js for real text extraction
- **DOCX Processing**: Mammoth.js for real text extraction
- **Deployment**: Vercel
- **Icons**: Lucide React

## 🚀 Quick Setup for Development

1. **Clone and install**:
   ```bash
   git clone <your-repo>
   cd resume-helper
   npm install
   ```

2. **Environment setup**:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and contact info
   ```

3. **Get Google AI API Key** (FREE):
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add to `.env`: `VITE_GOOGLE_AI_API_KEY=your_api_key_here`

4. **Update contact information** in `.env`:
   ```
   VITE_CONTACT_EMAIL=your.email@example.com
   VITE_PORTFOLIO_URL=https://yourportfolio.com
   VITE_GITHUB_URL=https://github.com/yourusername
   ```

5. **Start development**:
   ```bash
   npm run dev
   ```

## 🌍 Deploy to Vercel (Production)

### Quick Deploy
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add environment variables in Vercel dashboard:
   - `VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key`
   - `VITE_CONTACT_EMAIL=your.email@example.com`
   - `VITE_PORTFOLIO_URL=https://yourportfolio.com`
   - `VITE_GITHUB_URL=https://github.com/yourusername`
4. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 💰 Cost Considerations

### Google AI (Gemini) - FREE Tier:
- **60 requests per minute** - Free
- **Perfect for students** - No cost for typical usage
- **Rate limits** - More than enough for personal projects

### Vercel Hosting - FREE Tier:
- **100GB bandwidth** per month
- **Unlimited personal projects**
- **Custom domains** included
- **Automatic HTTPS** and global CDN

**Total cost for students: $0** 🎉

## 📁 Project Structure

```
src/
├── services/
│   └── resumeAnalysisService.ts    # Real Google AI integration + text extraction
├── components/
│   ├── FileUpload.tsx              # File upload with drag & drop
│   ├── LoadingSpinner.tsx          # Beautiful loading animation
│   ├── ResumeAnalysis.tsx          # Comprehensive results display
│   ├── Header.tsx                  # Navigation with personal branding
│   └── Footer.tsx                  # Contact info & portfolio links
├── pages/
│   ├── HomePage.tsx                # Personal landing page
│   ├── ReviewPage.tsx              # Main analysis page
│   └── AboutPage.tsx               # How it works + personal story
└── utils/
    ├── pdfGenerator.ts             # PDF report generation
    └── mockData.ts                 # Fallback data for testing
```

## 🔧 Key Features

### Real Text Extraction
- **PDF files**: Uses PDF.js to extract actual text
- **DOCX files**: Uses Mammoth.js to extract actual text
- **No mock data**: Each resume gets unique analysis

### AI-Powered Analysis
- **Google AI (Gemini)**: Advanced language model
- **Structured feedback**: Scores, strengths, improvements
- **ATS optimization**: Applicant tracking system compatibility
- **Actionable recommendations**: Prioritized improvement suggestions

### Student-Focused Design
- **Encouraging tone**: Supportive feedback for job seekers
- **Practical advice**: Real-world resume improvement tips
- **Privacy first**: No data storage, automatic file deletion
- **Mobile responsive**: Works on all devices

## 🤝 Contributing

This is a personal project, but I welcome feedback and suggestions! If you're a student who's used this tool, I'd love to hear how it helped.

## 📧 Contact

- **Email**: [Update in .env file]
- **Portfolio**: [Update in .env file]  
- **GitHub**: [Update in .env file]

## 💝 For Students

This tool is my way of paying it forward. Job searching is stressful enough without worrying about whether your resume is good enough. I hope this helps you put your best foot forward!

Remember: This tool gives you feedback, but you know your experiences best. Use the suggestions as a starting point, not absolute rules.

Good luck with your job search! 🚀

---

*Built with ❤️ for students everywhere*

## 📊 Recent Updates

- ✅ **Real text extraction** from PDF and DOCX files
- ✅ **Google AI integration** for personalized analysis  
- ✅ **Vercel deployment** ready with environment variables
- ✅ **Mobile responsive** design
- ✅ **PDF report generation** for saving results
- ✅ **Privacy focused** - no data storage