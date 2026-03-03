# Starbase-81

> ⚠️ Note: This project is **not thoroughly tested**, and there are **no guarantees of maintenance**.

A modified fork of [Starbase-80](https://github.com/notclickable-jordan/starbase-80) — a sleek, fast-loading homepage for Docker containers, services, and links.

Inspired by Ben Phelps' Homepage and Umbrel, and dedicated to *Star Trek: Lower Decks*.

Starbase-81 **does not integrate with Docker** directly — it simply provides a clean interface that loads instantly. Dark mode follows your OS preferences.

---

## ✨ Features

* ⚡ Fast-loading dashboard for services and links
* 🌙 Dark mode that follows your OS theme
* 🛠️ Configurable via a JSON file (restart container after changes)
* 🖼️ Background image support (local or online)
* 👤 Authentik login widget (optional)

---

# ⚡ Quickstart

```bash
# Clone the repo
git clone https://github.com/suckharder/starbase-81

# Modify docker-compose.yml to your liking

# Start the container
sudo docker compose up -d
```

---

# "📖 Quickdocs"

You can find the original project (and full documentation) here:
[Starbase-80 GitHub](https://github.com/notclickable-jordan/starbase-80)

This README mainly focuses on **changes and additions** made in Starbase-81.

You can find a reference for all the environmental variables as a comment in the compose file.
The new ones are explained below, the old ones you can read about in the original project's readme.

## 🖼️ Background Image Support

You can now now properly pimp out your dashboard with a background image!

### Supported Modes

1. **Local Image**
2. **Online Image**

### Local Image

Set the Docker environment variable:

```env
BGIMAGE=url(/background.jpg)
```

* You can simply replace `background.jpg` inside `./public`.
* Use a .jpg format, do NOT rename, url(/background.jpg) is ALWAYS expected!

> ⚠️ Must mount the image as a Docker volume:
> `./public/background.jpg:/app/public/background.jpg`

If you must use a different image name for some reason, leave `BGIMAGE=url(/background.jpg)` as is and, change the mount `./public/myimage.jpg:/app/public/background.jpg`. This might work, but I did not test it.

### Online Image

If you wish to use an image from the internet, simply change the url() property to include the link:

```env
BGIMAGE=url(https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg)
```

* Volume mount is **optional** in this mode.

### Notes

* Omitting `BGIMAGE` deploys the dashboard **without a background image**.
* The background is overlaid with the configured background color to improve readability.
* For a more prominent image, reduce the transparency of `BGCOLOR` and `BGCOLORDARK` (or set to 0 for no overlay).

---

## 👤 Authentik Widget

> Requires additional Authentik configuration. More info below.
> What is authentik? [https://goauthentik.io/](https://goauthentik.io/)

I implemented a small, very simple widget that displays your Authentik Log-In status

* Displays Authentik login status in the header.
* If **not logged in**, shows a button to open the login page in a new window.
* If **logged in**, shows your name and avatar.

The authentik widget is displayed in the header. Disabling the header will also disable the widget, even if SHOWAUTHWIDGET is set to true.

### Enable Authentik Widget

```env
SHOWAUTHWIDGET=true
```
Don't forget to specify the URL of your Authentik server by setting:

```env
AUTHENTIKURL=auth.example.com
```

> Note: `AUTHENTIKURL` is **without scheme, path, or trailing slash!**

### Authentik Config

You **must** set CORS headers for authentik, to allow your Starbase-81 instance URL.
This is not possible in Authentik directly, they need to be set via your **reverse proxy**.

Example for **Nginx Proxy Manager (NPM)**:

1. Open the proxy host for your Authentik server
2. In "Custom location", add custom location `/`, same "hostname" and "port" as the whole proxy host.
3. In "Advanced config" add these lines:

```nginx
add_header 'Access-Control-Allow-Origin' 'https://example.com' always;
add_header 'Access-Control-Allow-Credentials' 'true' always;
```

> Replace `https://example.com` with your Starbase-81 instance URL.

---

## Other Notable Changes

### Color Syntax

* All the colors that are changeable with environmental variables now follow now use **RGBA syntax**:

```env
BGCOLORDARK=rgba(3, 7, 18, 0.8)
```

---

## 💖 Credits

* Original Starbase-80 by [notclickable-jordan](https://github.com/notclickable-jordan)

---

> PS: I hope I didn’t forget anything important!
