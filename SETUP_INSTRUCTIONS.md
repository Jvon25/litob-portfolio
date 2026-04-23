# 🚀 Initial Setup Instructions

Your 3D Interactive Portfolio is ready! Follow these steps to get started.

## ⚠️ Prerequisites

Before you begin, make sure you have:

1. **Node.js** (v14+) — [Download here](https://nodejs.org/)
   - Verify: Open terminal/PowerShell and type: `node --version`
   - Should show: `v14.x.x` or higher

2. **Text Editor** — One of:
   - [VS Code](https://code.visualstudio.com/) ⭐ Recommended
   - Sublime Text, Atom, WebStorm, or any code editor

3. **Terminal/PowerShell** — Built-in on all systems

---

## 🎯 5-Minute Setup

### 1️⃣ Open Terminal in Project Folder

**Windows (PowerShell):**
```
Navigate to: C:\Users\Huawei\Desktop\Digital Portfolio
Right-click → Open PowerShell here
OR: Hold Shift + Right-click → Open PowerShell window here
```

**Mac/Linux:**
```
cd ~/Desktop/"Digital Portfolio"
```

### 2️⃣ Install Dependencies

```bash
npm install
```

⏳ This takes 30-60 seconds. You'll see packages downloading.

✅ You'll see: `added X packages`

### 3️⃣ Start Development Server

```bash
npm run dev
```

✅ You should see:
```
VITE v5.0.0  ready in XXX ms

➜ Local:     http://localhost:3000/
➜ Press q to quit
```

Your browser should open automatically to `http://localhost:3000/`

### 4️⃣ Test the 3D Scene

Once the page loads:
- 🖱️ Click and drag to rotate the desk
- 🔍 Scroll to zoom in/out
- 👆 Click the monitor screen
- 📁 Click the desktop icons

---

## 📝 Customize Your Portfolio

### Step 1: Open Project Files

In your code editor (VS Code), open the `Digital Portfolio` folder.

### Step 2: Find TODO Comments

Each section file has `// TODO:` comments. These mark what you need to change.

### Step 3: Replace Placeholder Text

**Most Important — Edit These First:**

#### File: `src/sections/hero.js`
Find and replace:
```javascript
// BEFORE:
[YOUR NAME]
[Your Senior High School Name]
Information Technology (ICT / TVL Track)

// AFTER:
Maria Santos
Maria High School
Information Technology (ICT / TVL Track)
```

#### File: `src/sections/about.js`
```javascript
// BEFORE:
[YOUR NAME]
[YOUR SCHOOL NAME]
[YOUR INTEREST]

// AFTER:
Maria Santos
Maria High School
building web applications
```

#### File: `src/sections/skills.js`
```javascript
// BEFORE:
[Skill 1: e.g., HTML & CSS]
[Skill 2: e.g., JavaScript]

// AFTER:
HTML & CSS
JavaScript
```

#### File: `src/sections/projects.js`
Add your real project links:
```javascript
// BEFORE:
<a href="[GITHUB/DEMO LINK]" ...>

// AFTER:
<a href="https://github.com/yourusername/project-name" ...>
```

#### File: `src/sections/contact.js`
```javascript
// BEFORE:
github.com/[yourusername]
linkedin.com/in/[yourusername]

// AFTER:
github.com/mariacodes
linkedin.com/in/maria-santos-123
```

### Step 4: Save and Reload

- Save file: `Ctrl + S` (Windows) or `Cmd + S` (Mac)
- Your browser auto-updates! (Hot Module Reload)
- You'll see changes immediately

---

## 📸 Add Your Photo

### 1. Prepare Your Photo

- Size: 300×300 pixels (square preferred)
- Format: JPG or PNG
- File size: Under 200KB

### 2. Place in Public Folder

1. Open `public/images/` folder
2. Add your photo file (e.g., `my-photo.jpg`)

### 3. Use in About Section

Edit `src/sections/about.js`:

```javascript
// Find this line:
<div class="about-photo">
  📸 [YOUR PHOTO HERE]
</div>

// Replace with:
<div class="about-photo">
  <img src="/images/my-photo.jpg" alt="Maria Santos">
</div>
```

---

## 🎨 Optional: Change Colors

Edit `style.css` at the top:

```css
:root {
  --bg-dark: #0a0a0a;           /* Keep dark background */
  --primary-accent: #2779a7;    /* Change this BLUE */
  --secondary-accent: #49c5b6;  /* Change this TEAL */
  --text-light: #f0f0f0;        /* Light text color */
  --panel-bg: rgba(10, 10, 10, 0.95);
  --glow: #7df9ff;              /* Change this CYAN glow */
}
```

Example color palettes:
- **Purple theme:** `#7c3aed`, `#c084fc`
- **Green theme:** `#059669`, `#10b981`
- **Orange theme:** `#ea580c`, `#fb923c`

Save file → Browser updates automatically

---

## 🧪 Test Your Portfolio

### Desktop Testing

1. ✅ Click and drag to rotate — **Works?**
2. ✅ Scroll to zoom — **Works?**
3. ✅ Right-click drag to pan — **Works?**
4. ✅ Click monitor → Desktop icons show — **Works?**
5. ✅ Click desktop icon → Panel opens — **Works?**
6. ✅ Click close button → Panel closes — **Works?**
7. ✅ All text customized — **Done?**

### Mobile Testing (Optional)

1. Find your computer's IP:
   - **Windows:** Terminal: `ipconfig` (look for `IPv4 Address`)
   - **Mac:** Terminal: `ifconfig` (look for `inet`)

2. On phone, visit: `http://YOUR-IP:3000`
   - Example: `http://192.168.1.100:3000`

3. Test touch controls:
   - ✅ One finger drag to rotate
   - ✅ Two finger pinch to zoom
   - ✅ Click icons on desktop

---

## 🐛 Troubleshooting

### Issue: "npm command not found"
**Solution:**
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart terminal/PowerShell
- Try again: `npm install`

### Issue: "Cannot find module 'three'"
**Solution:**
```bash
# Delete and reinstall
rm -r node_modules package-lock.json
npm install
```

### Issue: "Page shows blank/white"
**Solution:**
- Press `F12` to open Developer Console
- Look for red error messages
- Try different browser (Chrome/Firefox)
- Clear browser cache: `Ctrl + Shift + Del`

### Issue: "Changes not showing"
**Solution:**
- Hard refresh: `Ctrl + Shift + R` (Windows)
- Or: `Cmd + Shift + R` (Mac)
- Wait 3 seconds (Vite rebuilds)

### Issue: "Can't click objects"
**Solution:**
- Make sure you clicked on the canvas area
- Check browser console for errors
- Refresh page

---

## ✅ Pre-Deployment Checklist

Before deploying to the internet:

- [ ] Name changed from `[YOUR NAME]`
- [ ] School name added
- [ ] All section text customized
- [ ] Projects with real links added
- [ ] Contact links updated (GitHub, LinkedIn)
- [ ] No [BRACKET] placeholders remain
- [ ] Photo added (optional but recommended)
- [ ] Tested all interactive elements
- [ ] Verified on mobile (swipe works)
- [ ] No errors in console (`F12`)

---

## 📦 Build for Production

When ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder with optimized files.

Files are minified and ready for the web!

---

## 🚀 Deploy to Web

Choose one platform:

### Option A: GitHub Pages (Free, Recommended)
See: **DEPLOYMENT.md** → Option 1

### Option B: Vercel (Free, Fast)
See: **DEPLOYMENT.md** → Option 2

### Option C: Netlify (Free, Easy)
See: **DEPLOYMENT.md** → Option 3

---

## 📚 Documentation Files

Read these for more help:

- **QUICKSTART.md** — Fast 5-minute start
- **DEPLOYMENT.md** — Detailed deployment guide
- **README.md** — Full documentation
- **STRUCTURE.md** — Project architecture

---

## 🎓 Learning Resources

As you work on your portfolio, learn more about:

- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Docs](https://gsap.com/)
- [Vite Guide](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 💡 Pro Tips

1. **Use VS Code** — Best editor for web development
   - Install "ES7+ React/Redux/React-Native snippets"
   - Install "Prettier" for code formatting

2. **Git Version Control**
   - Track changes: `git add .`
   - Save version: `git commit -m "message"`
   - Push to GitHub: `git push`

3. **Keep Backup**
   - Before deploying, backup your `src/` folder
   - Save locally or in cloud storage

4. **Test Often**
   - Test after each change
   - Use `npm run dev` during development
   - Use `npm run build && npm run preview` to test production

---

## 🎉 You're Ready!

Your portfolio is set up and ready to customize!

**Next Steps:**
1. ✅ Customize all your content
2. ✅ Test thoroughly
3. ✅ Build: `npm run build`
4. ✅ Deploy (see DEPLOYMENT.md)
5. ✅ Share with everyone! 🚀

---

## ❓ Need More Help?

If you get stuck:

1. Check the **README.md** — Comprehensive guide
2. Check **STRUCTURE.md** — Technical architecture
3. Look at browser console (`F12`) for error messages
4. Google the error message
5. Try a different browser

---

**Good luck with your portfolio! You've got this! 💪**

---

Questions? See the other documentation files or check the commented code in each file.

Setup Date: April 2025
