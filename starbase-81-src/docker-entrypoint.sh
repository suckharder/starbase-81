#!/bin/sh

# PID tracking for proper signal handling
nginx_pid=""

# Signal handler for fast shutdown
cleanup() {
    echo "Received shutdown signal, stopping nginx..."
    if [ -n "$nginx_pid" ]; then
        kill -QUIT "$nginx_pid" 2>/dev/null
        wait "$nginx_pid" 2>/dev/null
    fi
    exit 0
}

# Set up signal traps
trap cleanup TERM INT QUIT

# Escape slashes
LOGO=$(echo "${LOGO}" | sed 's/\//\\\//g')

# HTML replacement
sed -i -e 's/My Website/'"${TITLE}"'/g' /app/index.html
sed -i -e 's/\/logo\.png/'"${LOGO}"'/g' /app/index.html

# TypeScript replacement
sed -i -e 's/PAGETITLE = "My Website"/PAGETITLE = "'"${TITLE}"'"/g' /app/src/variables.ts
sed -i -e 's/PAGEICON = "\/logo\.png"/PAGEICON = "'"${LOGO}"'"/g' /app/src/variables.ts
sed -i -e 's/SHOWHEADER = true/SHOWHEADER = '"${HEADER}"'/g' /app/src/variables.ts
sed -i -e 's/SHOWHEADERLINE = true/SHOWHEADERLINE = '"${HEADERLINE}"'/g' /app/src/variables.ts
sed -i -e 's/SHOWHEADERTOP = false/SHOWHEADERTOP = '"${HEADERTOP}"'/g' /app/src/variables.ts
sed -i -e 's/CATEGORIES = "normal"/CATEGORIES = "'"${CATEGORIES}"'"/g' /app/src/variables.ts
sed -i -e 's/NEWWINDOW = true/NEWWINDOW = '"${NEWWINDOW}"'/g' /app/src/variables.ts
sed -i -e 's/SHOWAUTHWIDGET = false/SHOWAUTHWIDGET = '"${SHOWAUTHWIDGET}"'/g' /app/src/variables.ts
sed -i -e 's/AUTHENTIKURL = "auth.example.com"/PAGETITLE = "'"${AUTHENTIKURL}"'"/g' /app/src/variables.ts

# CSS replacement
sed -i -e 's/background-color: rgba(248, 250, 252, 0\.9)/background-color: '"${BGCOLOR}"'/g' /app/src/tailwind.css
sed -i -e 's|background-image: url()|background-image: '"${BGIMAGE}"'|g' /app/src/tailwind.css
sed -i -e 's/background-color: rgba(3, 7, 18, 0\.9)/background-color: '"${BGCOLORDARK}"'/g' /app/src/tailwind.css
sed -i -e 's/background-color: rgba(255, 255, 255, 0\.9)\; \/\* category light \*\//background-color: '"${CATEGORYBUBBLECOLORLIGHT}"\;'/g' /app/src/tailwind.css
sed -i -e 's/background-color: rgba(0, 0, 0, 0\.9)\; \/\* category dark \*\//background-color: '"${CATEGORYBUBBLECOLORDARK}"\;'/g' /app/src/tailwind.css

# Light/dark theme
# if [ "$THEME" = "dark" ]; then sed -i -e 's/darkMode: "media"/darkMode: "selector"/g' /app/tailwind.config.js; fi
# if [ "$THEME" = "dark" ]; then sed -i -e 's/<html class="auto"/<html class="dark"/' /app/index.html; fi
# if [ "$THEME" = "light" ]; then sed -i -e 's/darkMode: "media"/darkMode: "selector"/g' /app/tailwind.config.js; fi
# if [ "$THEME" = "light" ]; then sed -i -e 's/<html class="auto"/<html class="light"/' /app/index.html; fi

# Hover effect
if [ "$HOVER" = "underline" ]; then sed -i -e 's/@apply no-underline;/@apply underline;/g' /app/src/tailwind.css; fi

# Build the application
echo "Building application..."
npm run build

# Start nginx and track its PID
echo "Starting nginx..."
"$@" &
nginx_pid=$!

# Wait for nginx to finish, but respond to signals
wait "$nginx_pid"