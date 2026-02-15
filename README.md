# Our Universe - For Himani 💫

A romantic interactive web experience with stars, roses, timeline, heartfelt messages, and amazing new features!

## ✨ NEW FEATURES ADDED!

### 🌠 **Shooting Stars**
- Random shooting stars cross the screen every few seconds
- Beautiful trailing sparkle effects
- Adds magical atmosphere throughout the experience

### 🏺 **Love Notes Jar**
- Click the jar to pull out random love notes
- 50+ unique romantic messages
- Never repeats until you've seen them all
- Beautifully animated jar with floating hearts

### 🔊 **Sound Effects**
- Gentle chime when stars appear
- Soft bloom sound when rose opens  
- Paper rustle when envelope opens
- Whoosh sound for shooting stars
- All sounds are subtle and optional

## 🎵 Adding Background Music

For the best experience, add your own romantic piano music file:

### Option 1: Local MP3 File (Recommended)
1. Download a romantic piano MP3 (e.g., "River Flows in You" by Yiruma, "Clair de Lune" by Debussy)
2. Save it in the same folder as `index.html`
3. Rename it to `romantic-piano.mp3` OR
4. Update line 13 in `index.html` to match your filename:
   ```html
   <source src="your-music-file.mp3" type="audio/mpeg">
   ```

### Option 2: Use Royalty-Free Music
Download free romantic piano music from:
- **FreePD**: https://freepd.com (search "romantic piano")
- **Incompetech**: https://incompetech.com/music/royalty-free/music.html
- **Bensound**: https://www.bensound.com (requires attribution)
- **YouTube Audio Library**: https://studio.youtube.com (need YouTube account)

### Recommended Tracks:
- "River Flows in You" - Yiruma
- "Kiss the Rain" - Yiruma
- "Comptine d'un autre été" - Yann Tiersen
- "Clair de Lune" - Claude Debussy
- "Gymnopédie No.1" - Erik Satie
- Any romantic piano covers from YouTube (download with permission)

### Option 3: Synthesized Music (Automatic Fallback)
If no music file is provided, the system will automatically generate soft, romantic piano chords using the Web Audio API.

## 🚀 How to Use

1. **Simple Setup**: 
   - Place `index.html`, `styles.css`, and `script.js` in the same folder
   - Add your music file (optional but recommended)
   - Double-click `index.html` to open in browser

2. **Web Server** (for best performance):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Then open: http://localhost:8000
   ```

3. **Experience Flow**:
   - Click "Enter" to begin (starts music)
   - Watch "HIMANI" appear in constellation stars
   - **Shooting stars** appear randomly throughout
   - Click the rose to make it bloom (stays bloomed)
   - Scroll through the timeline of your story
   - **Click the Love Notes Jar** for random messages 🏺
   - Click the envelope to read the letter
   - Enjoy the fireflies at the end with final message
   - Use the 🔊 button (bottom-right) to control music
   - **Scroll buttons** guide you through each section

## 🎨 Features

### Core Experience
- ✨ **200 Twinkling Stars** - Interactive starfield background
- 💫 **HIMANI Constellation** - Her name written in stars
- 📝 **Typing Animation** - Romantic opening message
- 🌹 **Blooming Rose** - Click to animate (stays bloomed)
- 📜 **Timeline** - Your story together with 4 moments
- 💌 **Secret Letter** - Click envelope to reveal message
- 🔥 **Fireflies** - Magical ending scene with glowing fireflies
- 💖 **Pulsing Heart** - Animated heart at the end

### New Interactive Features  
- 🌠 **Shooting Stars** - Random meteors with sparkle trails
- 🏺 **Love Notes Jar** - 50+ random romantic messages
- 🔊 **Sound Effects** - Subtle audio feedback throughout
- 🔽 **Scroll Buttons** - Navigation buttons after every section

### Technical Features
- 🎵 **Background Music** - Romantic piano (with toggle control)
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **Performance Optimized** - Automatically adjusts for device
- ♿ **Accessible** - Keyboard navigation, reduced motion support
- 🎨 **Beautiful Design** - Deep space theme with cosmic colors

## 🎵 Music Controls

- **Toggle Button**: Click the 🔊/🔇 button in bottom-right corner
- **Auto-start**: Music begins when you click "Enter"
- **Volume**: Set to 30% for gentle background ambiance
- **Fade effects**: Smooth fade in/out when toggling

## ⚙️ Customization

Edit `script.js` to customize:
- Line 21-27: Music behavior
- Line 7-18: Animation speeds
- Line 35-38: Constellation name (currently "HIMANI")
- Line 42-45: Typing text

Edit `index.html` to customize:
- Lines 70-125: Timeline content
- Lines 130-141: Letter content
- Line 149: Final message

## 🎯 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## 💡 Tips

1. **Best experience**: Use headphones as suggested in the intro
2. **Music autoplay**: Modern browsers require user interaction (clicking "Enter") before playing audio
3. **Performance**: Automatically optimizes for mobile/low-end devices
4. **Accessibility**: Includes reduced motion support and keyboard navigation

## 📝 License

Feel free to customize this for your own romantic purposes! ❤️

---

Made with 💖 for Himani
